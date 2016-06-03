/**
 * Created by DLHT on 2016-05-20.
 */
/*
 Web服务器一般指网站服务器，是指驻留于因特网上某种类型计算机的程序，Web服务器的基本功能就是提供Web信息浏览服务。
 它只需支持HTTP协议、HTML文档格式及URL，与客户端的网络浏览器配合。
 */
var http=require('http');
var url=require('url');
var fs=require('fs');

http.createServer(function(req,res){
    var pathname=url.parse(req.url).pathname;
    //输出请求路径
    console.log('Request for :'+pathname);
    //从文件系统读取请求文件内容
    fs.readFile(pathname.substr(1),function(err,data){
       if(err){
           console.error(err);
           //http状态码设置为404
           res.writeHead(404,{'Content-Type':'text/html'});
       }else{
           //http状态码设置为200
           res.writeHead(200,{'Content-Type':'text/html'});
           res.write(data.toString());
       }
        res.end();
    });

}).listen(3002);

