/**
 * Created by DLHT on 2016-05-20.
 */


var express=require('express');
var app=express();

//var app=require('../../app');

var route=express.Router();

route.use(function(req,res,next){
    console.log('route 经过路由器过滤');
    next();
});

//路由所有链接
app.use('*',route);

//使用静态文件    注意文件查询顺序，public在get之上，请求页面会现在public中查找，然后走以下get方法
// 如：/index.html   如果public中有index.html,则返回public中的index.html,如果没有，则查询下列app.get('/index.html',....)方法返回
//app.use(express.static('../../public'));

//主页get请求
app.get('/',function(req,res){
    console.log('主页get请求');
    console.log('hostname:'+req.hostname+',ip:'+req.ip+',fresh:'+req.fresh+',path:'+req.path);
    console.log(IPAdress());
    res.send('hello world get');

});

/*
 获取当前访问的ipv4地址
 */
function IPAdress(){
    var interfaces = require('os').networkInterfaces();
    for(var devName in interfaces){
        var iface = interfaces[devName];
        for(var i=0;i<iface.length;i++){
            var alias = iface[i];
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                return alias.address;
            }
        }
    }
}

//post请求
app.post('/',function(req,res){
    console.log('主页post请求');
    res.send('hello world post');
});

// /del_user请求
app.get('/del_user',function(req,res){
   console.log('del_user 响应delete 请求');
    res.send('删除用户');
});

// /list_user请求
app.get('/list_user',function(req,res){
    console.log('list_user 响应list 请求');
    res.send('用户列表');
});

// 对页面 abcd abxncd ab123cd等相应请求
app.get('/ab*cd',function(req,res){
    console.log('ab*cd 相应请求');
    res.send(req.path+' 页面');
});

// /index.html请求
app.get('/index.html',function(req,res){
    console.log('/index.html 被访问');
   //res.sendFile(global.APP_PATH+'/views/NodeTest/index.html');
});


//其他访问转到404页面 get post
app.get('*',function(req,res){
    res.send('404 未找到指定页面');
});

//启动服务器，监听3000
var server=app.listen(3000,function (){
    var host=IPAdress();
    var port=server.address().port;

    console.log('访问地址为 http://%s:%s',host,port);
});

//捕获错误，没有经过验证
process.on('error',function(err){
    console.error('未捕获的异常:'+err.stack);
});
