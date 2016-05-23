/**
 * Created by DLHT on 2016-05-17.
 */
var http=require('http');
http.createServer(function (request,response) {
    response.writeHead(200,{'Content-Type':'text/plain'});
    response.end('hello world!');
}).listen(8000);
console.log('connection to http://localhost:8000');
