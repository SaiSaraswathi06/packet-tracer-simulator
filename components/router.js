const routes = require("../config/routes.json");

// Convert IP to number (helper)
function ipToNumber(ip) {
  return ip.split(".").reduce((acc, octet) => {
    return (acc << 8) + parseInt(octet);
  }, 0);
}

// Check if IP belongs to CIDR block
function isIpInCidr(ip, cidr) {
  const [range, bits] = cidr.split("/");
  const mask = -1 << (32 - bits);
  return (
    ipToNumber(ip) & mask
  ) === (
    ipToNumber(range) & mask
  );
}

// Find best route (Longest Prefix Match)
function findRoute(destinationIP) {
  let matchedRoute = null;
  let maxPrefix = -1;

  for (let route of routes) {
    const prefix = parseInt(route.destination.split("/")[1]);
    if (isIpInCidr(destinationIP, route.destination)) {
      if (prefix > maxPrefix) {
        maxPrefix = prefix;
        matchedRoute = route;
      }
    }
  }

  if (!matchedRoute) {
    throw new Error("No route to host");
  }

  return matchedRoute;
}

module.exports = findRoute;
