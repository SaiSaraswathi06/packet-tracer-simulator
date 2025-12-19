const rules = require("../config/firewall.json");

function checkFirewall(packet) {
  for (let rule of rules) {
    if (
      rule.protocol === packet.protocol &&
      rule.port === packet.destinationPort
    ) {
      return rule.action;
    }
  }
  return "allow"; // default allow
}

module.exports = checkFirewall;
