/**
 * Created by DLHT on 2016-05-20.
 */
/*
get post 请求
 */
//获取get请求内容
var http=require('http');
var url=require('url');
var util=require('util');

http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end(util.inspect(url.parse(req.url,true)));
}).listen(3000);

/*
 http://localhost:3000/admin.jsp?name=mly&age=22

 Url {
 protocol: null,
 slashes: null,
 auth: null,
 host: null,
 port: null,
 hostname: null,
 hash: null,
 search: '?name=mly&age=22',
 query: { name: 'mly', age: '22' },
 pathname: '/admin.jsp',
 path: '/admin.jsp?name=mly&age=22',
 href: '/admin.jsp?name=mly&age=22' }
 */

//获取post请求内容
var querystring=require('querystring');

http.createServer(function(req,res){
    //用于暂存请求体
    var post='';
    //通过req的data事件监听函数，每当接收到请求体就累加到post
    req.on('data',function(chunk){
       post+=chunk;
    });
    //req的end时间监听触发，将post解析为真正的post请求格式返回
    req.on('end',function(){
        post=querystring.parse(post);
        console.log(post);
        res.end(util.inspect(post));
    });
}).listen(3001);


