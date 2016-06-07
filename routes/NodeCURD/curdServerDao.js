/**
 * Created by DLHT on 2016-05-30.
 * 使用nodejs的mysql模块 连接池,普通链接同样可用，类似修改即可
 */
//调用nodejs的mysql模块
var mysql = require('mysql');

//调用配置文件
var config = require('../../public/config/config');

//定义变量
var pool;

//初始化链接池
function handlePool() {
    //创建一个连接池
         pool = mysql.createPool({
        host: config.db.host,
        user: config.db.user,
        password: config.db.password,
        port: config.db.port,
        database: config.db.database,
        waitForConnections: config.db.waitForConnections,
        connectionLimit: config.db.connectionLimit,
        queueLimit: config.db.queueLimit
    });

    //监听链接使用
    pool.on('connection', function (conn) {
        console.log('[mysql]-pool-conn get:', conn.threadId);
    });
    
}

if(pool==null){
    handlePool();
}

//连接池执行
var poolSql = 'select * from user where id<10';

var EXEC_POOL = function (poolSql, poolSql_Param,callBack) {
    if(pool==null){
        handlePool();
    }
    //获取连接池链接
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log('[mysql]-pool-getConnection error:' + err);
        }   
        console.log('[mysql]-pool-getConnection succeed:', conn.threadId);

        conn.query(poolSql, poolSql_Param, function (err, result) {
            if (err) {
                console.log('[mysql]-pool-sql error:' + err);
            }
            console.log('[mysql]-pool-sql succeed:', result.toString().length);

            /*//遍历查询内容信息
            for (var i in result) {
                console.log(JSON.stringify(result[i]));
                JSON.parse(JSON.stringify(result[i]), function (key, value) {
                    if (key != '')
                        console.log('key:' + key + ',value:' + value);
                });
            }*/

            //释放连接池链接
            conn.release();

            //回调成功信息
            //getReturnVal('pool-search',JSON.stringify(result));
        });
    });
};

//获取用户列表
var UserList_POOL = function (req,res,poolSql, poolSql_Param,callBack) {
    if(pool==null){
        handlePool();
    }
    //获取连接池链接
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log('[mysql]-pool-getConnection error:' + err);
        }
        console.log('[mysql]-pool-getConnection succeed:', conn.threadId);

        conn.query(poolSql, poolSql_Param, function (err, result) {
            if (err) {
                console.log('[mysql]-pool-sql error:' + err);
            }
            console.log('[mysql]-pool-sql succeed:', result.toString().length);

            /*//遍历查询内容信息
             for (var i in result) {
             console.log(JSON.stringify(result[i]));
             JSON.parse(JSON.stringify(result[i]), function (key, value) {
             if (key != '')
             console.log('key:' + key + ',value:' + value);
             });
             }*/

            //释放连接池链接
            conn.release();
            res.render(global.APP_PATH+'/views/NodeCURD/showusers.jade',{'results':JSON.stringify(result)});
        });
    });
};
//插入新用户
var AddUser_POOL = function (req,res,poolSql, poolSql_Param,callBack) {
    if(pool==null){
        handlePool();
    }
    //获取连接池链接
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log('[mysql]-pool-getConnection error:' + err);
        }
        console.log('[mysql]-pool-getConnection succeed:', conn.threadId);

        conn.query(poolSql, poolSql_Param, function (err, result) {
            if (err) {
                console.log('[mysql]-pool-sql error:' + err);
            }
            console.log('[mysql]-pool-sql succeed:', result.toString().length);

            //释放连接池链接
            conn.release();

            res.render(global.APP_PATH+'/views/NodeCURD/index.jade',{'info':'添加用户成功'});

            //res.header('Content-Type', 'text/javascript');
            //res.end('<button onclick=\"window.location.href=\"/index\"\">添加成功</button>');
            //res.end('<script src=\"text/javascript\">if(confirm(\"添加成功，是否返回首页\")){location.href=\"/index\"; }</script>');
        });
    });
};
//获取即将删除用户列表
var UserListDel_POOL = function (req,res,poolSql, poolSql_Param,callBack) {
    if(pool==null){
        handlePool();
    }
    //获取连接池链接
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log('[mysql]-pool-getConnection error:' + err);
        }
        console.log('[mysql]-pool-getConnection succeed:', conn.threadId);

        conn.query(poolSql, poolSql_Param, function (err, result) {
            if (err) {
                console.log('[mysql]-pool-sql error:' + err);
            }
            console.log('[mysql]-pool-sql succeed:', result.toString().length);

            /*//遍历查询内容信息
             for (var i in result) {
             console.log(JSON.stringify(result[i]));
             JSON.parse(JSON.stringify(result[i]), function (key, value) {
             if (key != '')
             console.log('key:' + key + ',value:' + value);
             });
             }*/

            //释放连接池链接
            conn.release();
            res.render(global.APP_PATH+'/views/NodeCURD/deluser.jade',{'results':JSON.stringify(result)});
        });
    });
};
//根据id删除值
var DelUser_POOL = function (req,res,poolSql, poolSql_Param,callBack) {
    if(pool==null){
        handlePool();
    }
    //获取连接池链接
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log('[mysql]-pool-getConnection error:' + err);
        }
        console.log('[mysql]-pool-getConnection succeed:', conn.threadId);

        conn.query(poolSql, poolSql_Param, function (err, result) {
            if (err) {
                console.log('[mysql]-pool-sql error:' + err);
            }
            console.log('[mysql]-pool-sql succeed:', result.toString().length);

            //释放连接池链接
            conn.release();
            res.header('Content-Type', 'text/plain');
            res.end('succ');
        });
    });
};
//获取即将删除用户列表
var UserListUp_POOL = function (req,res,poolSql, poolSql_Param,callBack) {
    if(pool==null){
        handlePool();
    }
    //获取连接池链接
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log('[mysql]-pool-getConnection error:' + err);
        }
        console.log('[mysql]-pool-getConnection succeed:', conn.threadId);

        conn.query(poolSql, poolSql_Param, function (err, result) {
            if (err) {
                console.log('[mysql]-pool-sql error:' + err);
            }
            console.log('[mysql]-pool-sql succeed:', result.toString().length);

            /*//遍历查询内容信息
             for (var i in result) {
             console.log(JSON.stringify(result[i]));
             JSON.parse(JSON.stringify(result[i]), function (key, value) {
             if (key != '')
             console.log('key:' + key + ',value:' + value);
             });
             }*/

            //释放连接池链接
            conn.release();
            res.render(global.APP_PATH+'/views/NodeCURD/upuser.jade',{'results':JSON.stringify(result)});
        });
    });
};
//更新数据，使用异步进行
var UpUser_POOL = function (req,res,poolSql, poolSql_Param,callBack) {
    if(pool==null){
        handlePool();
    }
    //获取连接池链接
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log('[mysql]-pool-getConnection error:' + err);
        }
        console.log('[mysql]-pool-getConnection succeed:', conn.threadId);

        conn.query(poolSql, poolSql_Param, function (err, result) {
            if (err) {
                console.log('[mysql]-pool-sql error:' + err);
            }
            console.log('[mysql]-pool-sql succeed:', result.toString().length);

            //释放连接池链接
            conn.release();
           /* res.header('Content-Type', 'text/plain');
            res.end('succ');*/
        });
    });
};

exports.execSql_Pool=EXEC_POOL;
exports.userListSql_Pool=UserList_POOL;
exports.addUserSql_Pool=AddUser_POOL;
exports.userListDelSql_Pool=UserListDel_POOL;
exports.delUserSql_Pool=DelUser_POOL;
exports.userListUpSql_Pool=UserListUp_POOL;
exports.upUserSql_Pool=UpUser_POOL;

