/**
 * Created by DLHT on 2016-05-30.
 * 使用nodejs的mysql模块
 */
//调用nodejs的mysql模块
var mysql = require('mysql');

//创建一个connection
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '20110725',
    port: '3306',
    database: 'nodedata'
});

//创建一个connection
connection.connect(function (err) {
    if (err) {
        console.log('[mysql]-connection error:' + err);
        return;
    }
    console.log('[mysql]-connection succeed!');
});

//插入一条记录
var userAdd = 'insert into user(uname,uage,upass) values(?,?,?)';
var userAdd_Param = ['Liuyang'+Math.round(Math.random()*10), Math.round(Math.random()*100), 'LiuyangPass'];

var INSERT = function (connection, userAdd, userAdd_Param) {
    connection.query(userAdd, userAdd_Param, function (err, result) {
        if (err) {
            console.log('[mysql]-insert error:' + err);
            return;
        }
        console.log('[mysql]-insert succeed:', result);
    })
};

//更新一条记录
var userUpdate='update user set uname=?,uage=?,upass=? where id=?';
var userUpdate_Param=['Yang'+Math.round(Math.random()*10),Math.round(Math.random()*10+20),'Yang1011','3'];

var UPDATE=function(connection,userUpdate,userUpdate_Param){
  connection.query(userUpdate,userUpdate_Param,function(err,result){
    if(err){
        console.log('[mysql]-update error:'+err);
        return;
    }
      console.log('[mysql]-update succeed:',result);
  });
};

//删除一条记录
var userDelete='delete from user where id=?';
var userDelete_Param=[Math.round(Math.random()*10)];

var DELETE=function(connection,userDelete,userDelete_Param){
    connection.query(userDelete,userDelete_Param,function(err,result){
       if(err){
           console.log('[mysql]-delete error:'+err);
       }
        console.log('[mysql]-delete succeed:',result);
    });
};

//查询记录
var userSearch='select * from user';
var userSearch_Param=[];

var SEARCH=function(connection,userSearch,userSearch_Param){
  connection.query(userSearch,userSearch_Param,function(err,result){
      if(err){
          console.log('[mysql]-search error:'+err);
      }
      console.log('[mysql]-search succeed:',result);
    /*  for(var rowid in result){
          console.log(result[rowid]);
      }*/
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

var userProc='call ADD_User(?,?,?,@ExtReturnVal);';
var userProc_Param=['Mneng'+Math.round(Math.random()*10),'MengPass',Math.round(Math.random()*100)];

var EXECPROC=function(connection,userProc,UserProc_Param){
  connection.query(userProc,userProc_Param,function(err,result){
    if(err){
        console.log('[mysql]-proc error:'+err);
    }
      console.log('[mysql]-proc succeed:',result);
      console.log('[mysql]-proc ExtReturnVal:',result[0][0].ExtReturnVal);
  });
};




//INSERT(connection,userAdd,userAdd_Param);
//UPDATE(connection,userUpdate,userUpdate_Param);
//DELETE(connection,userDelete,userDelete_Param);
//SEARCH(connection,userSearch,userSearch_Param);
//EXECPROC(connection,userProc,userProc_Param);

//关闭连接
connection.end(function (err) {
    if (err) {
        console.log('[mysql]-close error:' + err);
        return;
    }
    console.log('[mysql]-close succeed!');
});





//创建一个连接池
var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '20110725',
    port: '3306',
    database: 'nodedata',
    waitForConnections:'true',  //　当连接池没有连接或超出最大限制时，设置为true且会把连接放入队列，设置为false会返回error
    connectionLimit:'20',       //连接数限制，默认：10
    queueLimit:'0'              //最大连接请求队列限制，设置为0表示不限制，默认：0
});

//监听链接使用
pool.on('connection',function(conn){
    console.log('[mysql]-pool-conn get:',conn.threadId);
});

//连接池执行
var poolSql='select * from user';

var SEARCH_POOL=function(pool,poolSql,poolSql_Param){
    //获取连接池链接
    pool.getConnection(function (err,conn){
        if(err){
            console.log('[mysql]-pool-getConnection error:'+err);
        }
        console.log('[mysql]-pool-getConnection succeed:',conn.threadId);

        conn.query(poolSql,poolSql_Param,function (err,result){
           if(err){
               console.log('[mysql]-pool-sql error:'+err);
           }
            console.log('[mysql]-pool-sql succeed:',result.length);
            console.log('[mysql]-pool-sql succeed:',result[0]);
            //释放连接池链接
            conn.release();
        });
    });
}



//SEARCH_POOL(pool,poolSql,null);

