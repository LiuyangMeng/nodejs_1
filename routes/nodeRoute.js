/**
 * Created by DLHT on 2016-05-18.
 */
/*
 我们要为路由提供请求的URL和其他需要的GET及POST参数，随后路由需要根据这些数据来执行相应的代码。

 因此，我们需要查看HTTP请求，从中提取出请求的URL以及GET/POST参数。
 这一功能应当属于路由还是服务器（甚至作为一个模块自身的功能）确实值得探讨，但这里暂定其为我们的HTTP服务器的功能。
 */

var server=require('./server');
var route=require('./route');
server.start(route.route);