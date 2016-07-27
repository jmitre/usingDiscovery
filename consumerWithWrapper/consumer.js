var consul = require('consul')();
var http = require('http');

consul.catalog.service.nodes('helloworld', function(err, result) {
  if (err) throw err;
  var tags = result[0].ServiceTags;
  console.log(result);
  createEndPoint(tags);
});

function createEndPoint(tags){
  var helloworldEndpoint = {
    host: tags[1],
    port: tags[2],
    path: tags[3],
    method: 'GET'
  };

  callDiscoveredAPI(helloworldEndpoint);
}

var service;
function callDiscoveredAPI(helloworldEndpoint){
  http.request( helloworldEndpoint, function(res) {
    res.on("data", function(chunk) {
      //console.log("BODY: " + chunk);
      service = "" + chunk;
      console.log('\n'+service);
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });

    console.log("service: ", service);
  }).end();
}
