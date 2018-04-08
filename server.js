var http = require('http');
var url = require('url');
var fs = require('fs');

var status = {"lux":0,"alarm":false};
var indexHTML = fs.readFileSync("./index.html");
var sensorHTML = fs.readFileSync("./sensor.html");

var server = http.createServer(
    function (request, response) {
        var path = url.parse(request.url).pathname;
        switch(path){
            case "/":
            case "/index.html":
                response.writeHead(200,{'content-Type': 'text/html'});
                response.write(indexHTML);
                break;
            case "/sensor.html":
                response.writeHead(200,{'content-Type': 'text/html'});
                response.write(sensorHTML);
                break;
            case "/status":
                if(request.method == "POST"){
                    var body = '';
                    request.on('data', function(chunk) {
                        body += chunk.toString();
                    });
                    request.on('end', function() {
                        status = JSON.parse(body);
                    });
                }else if(request.method == "GET"){
                    response.writeHead(200,{'content-Type': 'application/json'});
                    response.write (JSON.stringify(status));
                }
                break;
            default:
                break;
        }
        response.end("");
    }
).listen(80);
