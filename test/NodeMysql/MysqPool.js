/**
 * Created by DLHT on 2016-05-30.
 * 使用nodejs的mysql模块 连接池
 */
//调用nodejs的mysql模块
var mysql = require('mysql');

//调用配置文件
var config = require('../../config/config');

//创建一个连接池
var pool = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    port: config.db.port,
    database: config.db.database,
    waitForConnections:config.db.waitForConnections,
    connectionLimit:config.db.connectionLimit,
    queueLimit:config.db.queueLimit
});

//监听链接使用
pool.on('connection',function(conn){
    console.log('[mysql]-pool-conn get:',conn.threadId);
});

//连接池执行
var poolSql='select * from user where id<10';

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

           for(var i in result){
                console.log(JSON.stringify(result[i]));
                JSON.parse(JSON.stringify(result[i]),function(key,value){
                    if(key!='')
                   console.log('key:'+key+',value:'+value);
                });
            }

            //释放连接池链接
            conn.release();

            //回调成功信息
            getReturnVal('pool-search',JSON.stringify(result));
        });
    });
}


SEARCH_POOL(pool,poolSql,null);

function getReturnVal(key,val){
    console.log(key+':'+val);
}

function _SEARCH_POOL(){
    return SEARCH_POOL(pool,poolSql,null);
}

//setInterval(_SEARCH_POOL,10*1000);
