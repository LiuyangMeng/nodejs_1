/**
 * Created by DLHT on 2016-06-15.
 * mongodb nodejs 控制层
 */
var express = require('express');
var app = express();
//引入自定义模块
var CommonTools = require('../Tools/nodeCommonTools');
//引入db的dao层
var curdMongoDao = require('./curdMongoPool');

// 请求 post
var bodyparser = require('body-parser');
//创建application/x-www-form-urlencoded 编码解析
var urlencodeparser = bodyparser.urlencoded({extended: false});
app.use(urlencodeparser);

//使用静态文件    注意文件查询顺序，public在get之上，请求页面会现在public中查找，然后走以下get方法
// 如：/index.html   如果public中有index.html,则返回public中的index.html,如果没有，则查询下列app.get('/index.html',....)方法返回
app.use(express.static(global.APP_PATH));

//使查看源码具有结构化
app.locals.pretty = true;

//使用路由集中处理全部路径
var rount=express.Router();
rount.use(function(req,res,next){
    console.log('Router||hostname:' + req.hostname + ',ip:' + CommonTools.getIPAdress() + ',fresh:' + req.fresh + ',path:' + req.path+ ',baseurl:' + req.baseUrl);
    next();
});
app.use('*',rount);


//主页get请求
app.get('/', function (req, res) {
    console.log('/ 主页get请求');
    res.send('hello world get:nodejs+mongodb');

});

// /index请求
app.get('/index', function (req, res) {
    console.log('/index 被请求');
    res.render(global.APP_PATH+'/views/NodeMongoDB/index.jade');
});

// /showUsers请求
app.get('/showUsers', function (req, res) {
    console.log('/showUsers 被请求');
    curdMongoDao.execMongoDB_pool(req,res,null,curdMongoDao.searchUsers,null);
});

// /pre_addUser请求
app.get('/pre_addUser', function (req, res) {
    console.log('/pre_addUser 被请求');
    res.render(global.APP_PATH+'/views/NodeMongoDB/adduser.jade');
});

//  /addUser 请求 post
app.post('/addUser', urlencodeparser, function (req, res) {
    console.log('/addUser 被请求');
    //获取前台参数
    if(req.body.name==undefined||req.body.age==undefined||req.body.likes==undefined){
        res.render(global.APP_PATH+'/views/NodeMongoDB/adduser.jade');
        return;
    }
    var param = [req.body.name,req.body.age,req.body.likes.split(',')];
    curdMongoDao.execMongoDB_pool(req,res,param,curdMongoDao.insertUser,null);
});

// /pre_delUser请求
app.get('/pre_delUser', function (req, res) {
    console.log('/pre_delUser 被请求');
    curdMongoDao.execMongoDB_pool(req,res,null,curdMongoDao.presearchUsers,null);
});

// /delUser请求 post
app.post('/delUser',urlencodeparser,function (req, res) {
    console.log('/delUser 被请求');
    //获取链接后面带着的参数 req.body.id
    var param=[req.body.id];
    if(param==undefined||param==''){
        //参数错误，无法删除
        res.header('Content-Type', 'text/plain');
        res.end('fail');
    }
    curdMongoDao.execMongoDB_pool(req,res,param,curdMongoDao.deleteUsersById,null);
});

// /pre_upUser请求
app.get('/pre_upUser', function (req, res) {
    console.log('/pre_upUser 被请求');
    curdMongoDao.execMongoDB_pool(req,res,null,curdMongoDao.preupdateUsers,null);
});

// /upUser请求 post
app.post('/upUser',urlencodeparser,function (req, res) {
    console.log('/upUser 被请求');
    //获取链接后面带着的参数 req.body.id
    var id=req.body.id;
    var uname=req.body.name;
    var uage=req.body.age;
    var ulikes=req.body.likes;

    res.header('Content-Type', 'text/plain');
    if(id==undefined||id==''||uname==undefined||uname==''||uage==undefined||uage==''||ulikes==undefined||ulikes==''){
        //参数错误，无法删除
        res.end('fail');
    }
    curdMongoDao.execMongoDB_pool(req,res,[id,uname,uage,ulikes.split(',')],curdMongoDao.updateUsersById,null);
    res.end('getknow');
});

//其他访问转到404页面 get post
app.get('*', function (req, res) {
    res.sendFile(global.APP_PATH+'/views/404.html');
});

app.post('*', function (req, res) {
    res.sendFile(global.APP_PATH+'/views/404.html');
});

//启动服务器，监听3008
var server = app.listen(3008, function () {
    var host = CommonTools.getIPAdress();
    var port = server.address().port;

    console.log('访问地址为 http://%s:%s', host, port);
});

//捕获错误，没有经过验证
process.on('error', function (err) {
    console.error('未捕获的异常:' + err.stack);
});