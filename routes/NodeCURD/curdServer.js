/**
 * Created by DLHT on 2016-06-02.
 */
/*
 该文件实现node+mysql+jade结合对数据库文件进行增删改查，实现从页面到控制层再到数据库的双向操作
 */
var express = require('express');
var app = express();
//引入自定义模块
var CommonTools = require('../Tools/nodeCommonTools');
//引入db的dao层
var curdDao = require('./curdServerDao');

// 请求 post
var bodyparser = require('body-parser');
//创建application/x-www-form-urlencoded 编码解析
var urlencodeparser = bodyparser.urlencoded({extended: false});
app.use(urlencodeparser);

//使用静态文件    注意文件查询顺序，public在get之上，请求页面会现在public中查找，然后走以下get方法
// 如：/index.html   如果public中有index.html,则返回public中的index.html,如果没有，则查询下列app.get('/index.html',....)方法返回
app.use(express.static(global.APP_PATH));

//使用路由集中处理全部路径
var rount=express.Router();
rount.use(function(req,res,next){
    console.log('经过路由器:'+req.baseUrl);
    next();
});
app.use('*',rount);


//主页get请求
app.get('/', function (req, res) {
    console.log('主页get请求');
    console.log('hostname:' + req.hostname + ',ip:' + req.ip + ',fresh:' + req.fresh + ',path:' + req.path);
    console.log(CommonTools.getIPAdress());
    res.send('hello world get');

});

// /index请求
app.get('/index', function (req, res) {
    console.log('/index 被请求');
    res.render(global.APP_PATH+'/views/NodeCURD/index.jade');
});

// /index请求
app.get('/index.html', function (req, res) {
    console.log('/index.html 被请求');
    res.sendFile(global.APP_PATH+'/views/NodeCURD/index.html');
});

// /showUsers请求
app.get('/showUsers', function (req, res) {
    console.log('/showUsers 被请求');
    curdDao.userListSql_Pool(req, res, 'select uname,uage,upass from user where id>0', null, null);
});

// /pre_addUser请求
app.get('/pre_addUser', function (req, res) {
    console.log('/pre_addUser 被请求');
    res.render(global.APP_PATH+'/views/NodeCURD/adduser.jade');
});

//  /addUser 请求 post
app.post('/addUser', urlencodeparser, function (req, res) {
    console.log('/addUser 被请求');
    //获取前台参数
    var param = [req.body.uname,req.body.uage,req.body.upass];
   // res.render(global.APP_PATH+'/views/NodeCURD/adduser.jade',{ 'uname':req.body.uname,'uage':req.body.uage,'upass':req.body.upass });
    curdDao.addUserSql_Pool(req, res, 'insert into user(uname,uage,upass) value (?,?,?)', param, null);
});

// /pre_delUser请求
app.get('/pre_delUser', function (req, res) {
    console.log('/pre_delUser 被请求');
    curdDao.userListDelSql_Pool(req, res, 'select id,uname,uage,upass from user', null, null);
});

// /delUser请求 post
app.post('/delUser',urlencodeparser,function (req, res) {
    console.log('/delUser 被请求');
    //获取链接后面带着的参数 req.body.id
    var param=req.body.id;
    if(param==undefined||param==''){
        //参数错误，无法删除
        res.header('Content-Type', 'text/plain');
        res.end('fail');
    }
    curdDao.delUserSql_Pool(req,res,'delete from user where id=?',[param],null,null);
});

// /pre_upUser请求
app.get('/pre_upUser', function (req, res) {
    console.log('/pre_upUser 被请求');
    curdDao.userListUpSql_Pool(req, res, 'select id,uname,uage,upass from user', null, null);
});

// /upUser请求 post
app.post('/upUser',urlencodeparser,function (req, res) {
    console.log('/upUser 被请求');
    //获取链接后面带着的参数 req.body.id
    var id=req.body.id;
    var uname=req.body.name;
    var uage=req.body.age;
    var upass=req.body.pass;

    res.header('Content-Type', 'text/plain');
    if(id==undefined||id==''||uname==undefined||uname==''||uage==undefined||uage==''||upass==undefined||upass==''){
        //参数错误，无法删除
        res.end('fail');
    }
    curdDao.upUserSql_Pool(req,res,'update user set uname=?,uage=?,upass=? where id=?',[uname,uage,upass,id],null,null);
    res.end('getknow');
});

//其他访问转到404页面 get post
app.get('*', function (req, res) {
    res.sendFile(global.APP_PATH+'/views/404.html');
});

app.post('*', function (req, res) {
    res.sendFile(global.APP_PATH+'/views/404.html');
});

//启动服务器，监听3006
var server = app.listen(3006, function () {
    var host = CommonTools.getIPAdress();
    var port = server.address().port;

    console.log('访问地址为 http://%s:%s', host, port);
});

//捕获错误，没有经过验证
process.on('error', function (err) {
    console.error('未捕获的异常:' + err.stack);
});



//以下为测试

// /process_get请求 get
app.get('/process_get', function (req, res) {
    //输出json格式
    var response = {
        FirstName: req.query.FirstName,
        SecondName: req.query.SecondName,
        Method: 'get'
    };
    console.log(response);
    res.header('Content-Type', 'text/plain;charset=UTF-8');
    res.end(JSON.stringify(response));
});

//文件上传处理
var fs = require('fs');
//multer
var multer = require('multer');

//app.use(multer({ dest:'../tmp/'}));

//缓存目录，注意文件的名字
var imfiles=multer({dest:'../../public/tmp'});

app.post('/file_upload', imfiles.array('file1', 1), function (req, res) {
    console.log(req.files[0]);
    var dest_file = global.APP_PATH+'/public/uploads/'+ Date.now() + req.files[0].originalname;
    fs.readFile(req.files[0].path, function (err, data) {
        fs.writeFile(dest_file, data, function (err) {
            console.log(dest_file);
            if (err) {
                console.log(err);
            } else {
                response = {
                    message: 'file upload succ',
                    filename: req.files[0].originalname
                };

                fs.unlink(req.files[0].path, function (err) {
                    if (err) {
                        console.log('文件上传成功，删除缓存文件失败:' + err);
                    }
                    console.log('文件上传成功，删除缓存文件成功');
                });
            }
            console.log(response);
            res.header('Content-Type', 'text/plain;charset=UTF-8');
            res.end(JSON.stringify(response));
        });
    });
});

//cookie管理
app.post('/cookie', function (req, res) {
    console.log('Cookie:post:', req.cookies);
    // res.cookie('name','liuyang',{maxAge:2000});
    //http状态码设置为200
    res.writeHead(200, {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'});
    res.write(JSON.stringify(req.cookies));
    res.end();
});


