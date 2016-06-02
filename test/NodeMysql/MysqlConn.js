/**
 * Created by DLHT on 2016-05-30.
 * 使用nodejs的mysql模块 单一链接
 */
//调用nodejs的mysql模块
var mysql = require('mysql');

//调用配置文件
var config = require('../../config/config');

//创建一个connection
var connection;
function handleConnect() {
    connection = mysql.createConnection({
        host: config.db.host,
        user: config.db.user,
        password: config.db.password,
        port: config.db.port,
        database: config.db.database
    });

    //链接错误，2秒后重试
    connection.connect(function (err) {
        if (err) {
            console.log('[mysql]-connection error:' + err);
            setTimeout(handleConnect, 2000);
        }
        console.log('[mysql]-connection succeed!');
    });

    //异常处理
    connection.on('error', function (err) {
        console.log('[mysql]-connection on error:' + err);
        //链接断开，自动重连
        if (err.code == 'PROTOCOL_CONNECTION_LOST') {
            console.log('[mysql]-reconnection');
            handleConnect();
        } else {
            throw err;
        }
    });
}


//插入一条记录
//为了避免SQL注入攻击，需要转义用户提交的数据。可以使用connection.escape() 或者 pool.escape()
var userAdd = 'insert into user(uname,uage,upass) values(?,?,?)';
var userAdd_Param = ['Liuyangqq' + Math.round(Math.random() * 10), Math.round(Math.random() * 100), 'LiuyangPas'];

var INSERT = function (userAdd, userAdd_Param,callBack) {
    handleConnect();
    connection.query(userAdd, userAdd_Param, function (err, result) {
        if (err) {
            console.log('[mysql]-insert error:' + err);
            return;
        }
       console.log('[mysql]-insert succeed:', result.insertId);
        handleClose();
        //callBack;
    })
};

//更新一条记录
var userUpdate = 'update user set uname=?,uage=?,upass=? where id=?';
var userUpdate_Param = ['Yang' + Math.round(Math.random() * 10), Math.round(Math.random() * 10 + 20), 'Yang1011', '3'];

var UPDATE = function (userUpdate, userUpdate_Param,callBack) {
    handleConnect();
    connection.query(userUpdate, userUpdate_Param, function (err, result) {
        if (err) {
            console.log('[mysql]-update error:' + err);
            return;
        }
        console.log('[mysql]-update succeed:', result.affectedRows);
        handleClose();
        //callBack();
    });
};

//删除一条记录
var userDelete = 'delete from user where id=?';
var userDelete_Param = [3];

var DELETE = function (userDelete, userDelete_Param,callBack) {
    handleConnect();
    connection.query(userDelete, userDelete_Param, function (err, result) {
        if (err) {
            console.log('[mysql]-delete error:' + err);
        }
        console.log('[mysql]-delete succeed:', result.affectedRows);
        handleClose();
        //callBack;
    });
};

//查询记录
var userSearch = 'select * from user';
var userSearch_Param = [];

var SEARCH = function (userSearch, userSearch_Param,callBack) {
    handleConnect();
    connection.query(userSearch, userSearch_Param, function (err, result) {
        if (err) {
            console.log('[mysql]-search error:' + err);
        }
        console.log('[mysql]-search succeed:', result.length);
        /*  for(var rowid in result){
         console.log(result[rowid]);
         }*/
        handleClose();
        //callBack;
    });
};

//调用存储过程
//Nodejs 调用带out参数的存储过程，并得到out参数返回值

/*DROP PROCEDURE IF EXISTS `ADD_User`;
 CREATE PROCEDURE `ADD_User`(IN UserName VARCHAR(12),IN UserPass VARCHAR(12),IN UserAge INT(5),OUT ExtReturnVal INT)
 TOP: BEGIN
 DECLARE EXIT HANDLER FOR SQLEXCEPTION
 BEGIN
 ROLLBACK;
 SET ExtReturnVal =-1;  -- Failed
 END;
 START TRANSACTION;
 insert INTO user(uname,upass,uage) VALUES(UserName,UserPass,UserAge);
 set ExtReturnVal=0;
 select ExtReturnVal;
 END
 */

var userProc = 'call ADD_User(?,?,?,@ExtReturnVal);';
var userProc_Param = ['Mneng' + Math.round(Math.random() * 10), 'MengPass', Math.round(Math.random() * 100)];

var EXECPROC = function (userProc, userProc_Param,callback) {
    handleConnect();
    connection.query(userProc, userProc_Param, function (err, result) {
        if (err) {
            console.log('[mysql]-proc error:' + err);
        }
        //console.log('[mysql]-proc succeed:', result);
         console.log('[mysql]-proc ExtReturnVal:', result[0][0].ExtReturnVal);
        handleClose();
        //callback;
    });
};

//关闭连接
var handleClose= function () {
    connection.end(function (err) {
        if (err) {
            console.log('[mysql]-close error:' + err);
            return;
        }
       // console.log('[mysql]-close succeed!');
    });
};

//INSERT(userAdd,userAdd_Param,null);
//UPDATE(userUpdate,userUpdate_Param,null);
//DELETE(userDelete,userDelete_Param,null);
//SEARCH(userSearch, userSearch_Param,null);
//EXECPROC(userProc,userProc_Param,null);


function _SEARCH() {
    return SEARCH(userSearch, userSearch_Param);
}
/*
 更改mysql全局最大等待时间，使链接超时丢失。 自动重新链接
 show global variables like 'wait_timeout';     28800
 set global wait_timeout=9;                     9
 */
//setInterval(_SEARCH,10*1000);

exports.insertSql=INSERT;
exports.updateSql=UPDATE;
exports.deleteSql=DELETE;
exports.querySql=SEARCH;
exports.callProSql=EXECPROC;


