var http = require('http');

var consulAPI = {
  host: 'localhost',
  path: '/v1/catalog/service/hello',
  port: '8500',
  method: 'GET'
};

var service;

function getServiceObj (data) {
  service = data;
}

function callOtherUrl(url){
  var helloworldEndpoint = {
    host: 'localhost',
    port: '3000',
    path: '/helloworld',
    method: 'GET'
  };

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

var obj;
http.request( consulAPI, function(res) {
  res.on("data", function(chunk) {
      service = "" + chunk;
      obj = JSON.parse(service);
      callOtherUrl(obj[0].ServiceTags[0]);
    }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
}).end();
