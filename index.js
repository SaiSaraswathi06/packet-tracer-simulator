const express = require("express");
const app = express();

const resolveDNS = require("./components/dnsResolver");
const findRoute = require("./components/router");
const checkFirewall = require("./components/firewall");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Packet Tracer Simulator API running");
});

app.post("/trace", (req, res) => {
  const packet = req.body;
  const trace = [];

  try {
    // Step 1: DNS Resolution
    if (packet.destinationHostname) {
      const resolvedIP = resolveDNS(packet.destinationHostname);
      trace.push({
        component: "DNS Resolver",
        action: `Resolved ${packet.destinationHostname} to ${resolvedIP}`
      });
      packet.destinationIP = resolvedIP;
    }

    // Step 2: TTL Check
    if (packet.ttl <= 0) {
      throw new Error("TTL expired");
    }

    packet.ttl -= 1;
    trace.push({
      component: "Router",
      action: "TTL decremented",
      ttl: packet.ttl
    });

    // Step 3: Routing Decision
    const route = findRoute(packet.destinationIP);
    trace.push({
      component: "Router",
      action: `Forwarded via ${route.gateway} (${route.interface})`
    });

    // Step 4: Firewall Check
    const firewallResult = checkFirewall(packet);
    if (firewallResult === "deny") {
      trace.push({
        component: "Firewall",
        action: "Packet blocked by firewall"
      });
      return res.json({ trace });
    }

    trace.push({
      component: "Firewall",
      action: "Packet allowed"
    });

    // Step 5: Delivered
    trace.push({
      component: "Destination",
      action: "Packet successfully delivered"
    });

    res.json({ trace });

  } catch (err) {
    trace.push({
      error: err.message
    });
    res.json({ trace });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
