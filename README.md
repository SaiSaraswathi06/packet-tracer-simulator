# packet-tracer-simulator
# Virtual Network Packet Tracer Simulator

This project is a backend-based virtual network simulator that demonstrates how a network packet travels through different networking components such as DNS resolution, routing, TTL handling, and firewall filtering. The simulator provides a step-by-step trace of how a packet is processed inside a network.

---

## 🚀 Features

- DNS resolution using configuration files
- Routing using longest prefix match
- TTL decrement and expiry handling
- Firewall allow/deny rules
- Step-by-step packet trace output in JSON format
- Multiple scenario configurations for testing

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- JavaScript

---

## 📂 Project Structure

packet-tracer-simulator
│
├── config
│ ├── dns.json
│ ├── routes.json
│ ├── firewall.json
│ ├── scenario-basic.json
│ └── scenario-complex.json
│
├── components
│ ├── dnsResolver.js
│ ├── router.js
│ └── firewall.js
│
├── utils
│
├── index.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md


---

## ▶️ How to Run the Project

### 1. Clone the repository
```bash
git clone https://github.com/SaiSaraswathi06/packet-tracer-simulator
cd packet-tracer-simulator

2. Install dependencies
npm install

3. Start the server
node index.js


Server will run at:

http://localhost:3000

📡 API Endpoint
POST /trace

This endpoint simulates the journey of a network packet.

Sample Request
{
  "sourceIP": "192.168.1.10",
  "destinationHostname": "example.com",
  "protocol": "TCP",
  "destinationPort": 80,
  "ttl": 3
}

Sample Response
{
  "trace": [
    {
      "component": "DNS Resolver",
      "action": "Resolved example.com to 93.184.216.34"
    },
    {
      "component": "Router",
      "action": "TTL decremented",
      "ttl": 2
    },
    {
      "component": "Router",
      "action": "Forwarded via gateway"
    },
    {
      "component": "Firewall",
      "action": "Packet allowed"
    },
    {
      "component": "Destination",
      "action": "Packet successfully delivered"
    }
  ]
}

🧪 Scenarios

scenario-basic.json
Simulates a successful packet delivery.

scenario-complex.json
Simulates firewall blocking and TTL expiry scenarios.

❗ Error Handling

NXDOMAIN error for unknown domains

TTL expiry handling

Firewall block handling

No route to host error

👩‍💻 Author

Sai Saraswathi Ganja

✅ Conclusion

This project demonstrates core networking concepts such as DNS resolution, routing decisions, firewall filtering, and TTL handling through a simplified virtual packet tracing simulator.


---

