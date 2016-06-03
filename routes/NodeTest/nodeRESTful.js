/**
 * Created by DLHT on 2016-05-25.
 */
/*
 表述性状态转移是一组架构约束条件和原则。满足这些约束条件和原则的应用程序或设计就是RESTful。需要注意的是，
 REST是设计风格而不是标准。REST通常基于使用HTTP，URI，和XML（标准通用标记语言下的一个子集）以及HTML（标准通用标记语言下的一个应用）
 这些现有的广泛流行的协议和标准。REST 通常使用 JSON 数据格式。
 */
/*
 序号	URI	HTTP 方法	发送内容	结果
 1	listUsers	GET	空	显示所有用户列表
 2	addUser	POST	JSON 字符串	添加新用户
 3	deleteUser	DELETE	JSON 字符串	删除用户
 4	:id	GET	空	显示用户详细信息
 */
/*
参数问题
 Checks route params (req.params), ex: /user/:id
 Checks query string params (req.query), ex: ?id=12
 Checks urlencoded body params (req.body), ex: id=

 1、例如：127.0.0.1:3000/index，这种情况下，我们为了得到index，我们可以通过使用req.params得到，通过这种方法我们就可以很好的处理Node中的路由处理问题，
    同时利用这点可以非常方便的实现MVC模式；
 2、例如：127.0.0.1:3000/index?id=12，这种情况下，这种方式是获取客户端get方式传递过来的值，通过使用req.query.id就可以获得，类似于PHP的get方法；
 3、例如：127.0.0.1：300/index，然后post了一个id=2的值，这种方式是获取客户端post过来的数据，可以通过req.body.id获取，类似于PHP的post方法；
 */
var express=require('express');
var app=express();
var fs=require('fs');
//引入自定义模块
var CommonTools=require('./../Tools/nodeCommonTools');

//get 显示所有用户列表
app.get('/listUsers',function(req,res){
   fs.readFile(__dirname+'/nodeRESTful/users.json','utf8',function(err,data){
      console.log(data);
       res.end(data);
   });
});

//添加用户
//添加新用户的数据
var user={
    'user4':{
        'name':'Liuyang',
        'password':'password4',
        'profession':'engineer',
        'id':4
    }
};
app.get('/addUser',function(req,res){
   //读取已经存在的数据
    fs.readFile(__dirname+'/nodeRESTful/users.json','utf8',function(err,data){
        data=JSON.parse(data);
        data['user4']=user['user4'];
        console.log(data);
        res.end(JSON.stringify(data));
    });
});

//删除用户 1    http://localhost:3004/deleteUser?id=1
app.get('/deleteUser',function(req,res){
    //读取已经存在的数据
    fs.readFile(__dirname+'/nodeRESTful/users.json','utf8',function(err,data){
        data=JSON.parse(data);
        delete data['user'+req.query.id];
        console.log('使用?id=X删除:\n',data);
        res.end(JSON.stringify(data));
    });
});

//删除用户 2    http://localhost:3004/deleteUser/2
app.get('/deleteUser/:id',function(req,res){
    //读取已经存在的数据
    fs.readFile(__dirname+'/nodeRESTful/users.json','utf8',function(err,data){
        data=JSON.parse(data);
        delete data['user'+req.params.id];
        console.log('使用/X删除:\n',data);
        res.end(JSON.stringify(data));
    });
});

//根据用户id显示用户详情
app.get('/more',function(req,res){
    //读取已经存在的数据
    fs.readFile(__dirname+'/nodeRESTful/users.json','utf8',function(err,data){
        data=JSON.parse(data);
        var user=data['user'+req.query.id];
        console.log(user);
        res.end(JSON.stringify(user));
    });
});

//其他访问转到404页面 get post
app.get('*',function(req,res){
    res.sendFile(global.APP_PATH+'/views/404.html');
});

app.post('*',function(req,res){
    res.sendFile(global.APP_PATH+'/views/404.html');
});

//启动服务器，监听3004
var server=app.listen(3004,function (){
    var host=CommonTools.getIPAdress();
    var port=server.address().port;

    console.log('访问地址为 http://%s:%s',host,port);
});