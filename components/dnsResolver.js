const dnsRecords = require("../config/dns.json");

function resolveDNS(hostname) {
  if (!dnsRecords[hostname]) {
    throw new Error("NXDOMAIN: Domain does not exist");
  }
  return dnsRecords[hostname];
}

module.exports = resolveDNS;
