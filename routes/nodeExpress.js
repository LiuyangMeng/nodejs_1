/**
 * Created by DLHT on 2016-05-20.
 */
/*
 Express 是一个简洁而灵活的 node.js Web应用框架, 提供了一系列强大特性帮助你创建各种 Web 应用，和丰富的 HTTP 工具。
 使用 Express 可以快速地搭建一个完整功能的网站。
 Express 框架核心特性：
 可以设置中间件来响应 HTTP 请求。
 定义了路由表用于执行不同的 HTTP 请求动作。
 可以通过向模板传递参数来动态渲染 HTML 页面。
 Request 对象 - request 对象表示 HTTP 请求，包含了请求查询字符串，参数，内容，HTTP 头部等属性。常见属性有：

 req.app：当callback为外部文件时，用req.app访问express的实例
 req.baseUrl：获取路由当前安装的URL路径
 req.body / req.cookies：获得「请求主体」/ Cookies
 req.fresh / req.stale：判断请求是否还「新鲜」
 req.hostname / req.ip：获取主机名和IP地址
 req.originalUrl：获取原始请求URL
 req.params：获取路由的parameters
 req.path：获取请求路径
 req.protocol：获取协议类型
 req.query：获取URL的查询参数串
 req.route：获取当前匹配的路由
 req.subdomains：获取子域名
 req.accpets（）：检查请求的Accept头的请求类型
 req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages
 req.get（）：获取指定的HTTP请求头
 req.is（）：判断请求头Content-Type的MIME类型

 Response 对象 - response 对象表示 HTTP 响应，即在接收到请求时向客户端发送的 HTTP 响应数据。常见属性有：

 res.app：同req.app一样
 res.append（）：追加指定HTTP头
 res.set（）在res.append（）后将重置之前设置的头
 res.cookie（name，value [，option]）：设置Cookie
 opition: domain / expires / httpOnly / maxAge / path / secure / signed
 res.clearCookie（）：清除Cookie
 res.download（）：传送指定路径的文件
 res.get（）：返回指定的HTTP头
 res.json（）：传送JSON响应
 res.jsonp（）：传送JSONP响应
 res.location（）：只设置响应的Location HTTP头，不设置状态码或者close response
 res.redirect（）：设置响应的Location HTTP头，并且设置状态码302
 res.send（）：传送HTTP响应
 res.sendFile（path [，options] [，fn]）：传送指定路径的文件 -会自动根据文件extension设定Content-Type
 res.set（）：设置HTTP头，传入object可以一次设置多个头
 res.status（）：设置HTTP状态码
 res.type（）：设置Content-Type的MIME类型

 */
var express=require('express');
var app=express();
//引入自定义模块
var CommonTools=require('./nodeCommonTools');
//使用静态文件    注意文件查询顺序，public在get之上，请求页面会现在public中查找，然后走以下get方法
// 如：/index.html   如果public中有index.html,则返回public中的index.html,如果没有，则查询下列app.get('/index.html',....)方法返回
app.use(express.static('../public'));

//主页get请求
app.get('/',function(req,res){
    console.log('主页get请求');
    console.log('hostname:'+req.hostname+',ip:'+req.ip+',fresh:'+req.fresh+',path:'+req.path);
    console.log(CommonTools.getIPAdress());
    res.send('hello world get');

});

//post请求
app.post('/',function(req,res){
    console.log('主页post请求');
    res.send('hello world post');
});

// /del_user请求
app.get('/del_user',function(req,res){
    console.log(11);
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
   res.sendFile(__dirname+'/'+'index.html');
});
// /index1.html请求
app.get('/index1.html',function(req,res){
    res.sendFile(__dirname+'/'+'index1.html');
});

// /process_get请求 get
app.get('/process_get',function(req,res){
    //输出json格式
   var  response={
        FirstName:req.query.FirstName,
       SecondName:req.query.SecondName,
       Method:'get'
    };
    console.log(response);
    res.header('Content-Type','text/plain;charset=UTF-8');
    res.end(JSON.stringify(response));
});

// /process_get请求 post
var bodyparser=require('body-parser');

//创建application/x-www-form-urlencoded 编码解析
var urlencodeparser=bodyparser.urlencoded({extended:false});

app.post('/process_get',urlencodeparser,function(req,res){
    //输出json格式
    var  response={
        FirstName:req.body.FirstName,
        SecondName:req.body.SecondName,
        Method:'post'
    };
    console.log(response);
    res.header('Content-Type','text/plain;charset=UTF-8');
    res.end(JSON.stringify(response));
});

//文件上传处理
var fs=require('fs');
//multer
var multer=require('multer');
app.use(urlencodeparser);

//app.use(multer({ dest:'../tmp/'}));

//缓存目录，注意文件的名字
var imfiles=multer({dest:'../tmp/'});

app.post('/file_upload',imfiles.array('file1',1),function(req,res){
    console.log(req.files[0]);
    var dest_file=__dirname+'/uploads/'+Date.now()+req.files[0].originalname;
    fs.readFile(req.files[0].path,function(err,data){
       fs.writeFile(dest_file,data,function(err){
           console.log(dest_file);
          if(err){
              console.log(err);
          }else{
              response={message:'file upload succ',
                  filename:req.files[0].originalname
              };

              fs.unlink(req.files[0].path,function(err){
                 if(err){
                     console.log('文件上传成功，删除缓存文件失败:'+err);
                 }
                  console.log('文件上传成功，删除缓存文件成功');
              });
          }
           console.log(response);
           res.header('Content-Type','text/plain;charset=UTF-8');
           res.end(JSON.stringify(response));
       });
    });
});

//cookie管理
app.post('/cookie',function (req,res) {
    console.log('Cookie:post:',req.cookies);
   // res.cookie('name','liuyang',{maxAge:2000});
    //http状态码设置为200
    res.writeHead(200,{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'});
    res.write(JSON.stringify(req.cookies));
    res.end();
});


//其他访问转到404页面 get post
app.get('*',function(req,res){
    res.sendFile(__dirname+'/'+'404.html');
});

app.post('*',function(req,res){
    res.sendFile(__dirname+'/'+'404.html');
});

//启动服务器，监听3003
var server=app.listen(3003,function (){
    var host=CommonTools.getIPAdress();
    var port=server.address().port;

    console.log('访问地址为 http://%s:%s',host,port);
});

//捕获错误，没有经过验证
process.on('error',function(err){
    console.error('未捕获的异常:'+err.stack);
});
