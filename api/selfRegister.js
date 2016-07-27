var consul = require("consul")({port: 6500});

var service = {
  name: "helloworld",
  id: "helloworld",
  tags: ["http://localhost:3000/helloworld",
    "localhost",
    "3000",
    "/helloworld"],
  port: 3007,
  check: {
    http: "http://localhost:3000/helloworld/health",
    interval: "10s"
  }
}

module.exports =  consul.agent.service.register(service, function(err) {
    if (err) throw err;
  });
