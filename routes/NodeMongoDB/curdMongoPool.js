/**
 * Created by DLHT on 2016-06-12.
 * nodejs 链接mongodb 使用连接池 进行操作
 */
//调用配置文件
var config = require('../../public/config/config');
//引用nodejs工具类
var util = require('util');

//定义全局变量，用以暂存db链接
var mondb = null;

//监听
var events = require('events');
var eventEmitter = new events.EventEmitter();

//获取mondb链接
var mongoHander = function (emitobj) {
    //mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
    //引用mongodb在nodejs中的模块
    //不存在链接，新建
    if (mondb == null) {
        //其他认证方式
        //require('mongodb').MongoClient.authenticate(config.mongodb.user, config.mongodb.password.toCharArray());

        //给链接增加参数，可在url的?后面直接通过key=value&key1=value1...添加(有很多参数不支持)，或者通过参数添加.本次使用参数添加
        //参考网址 https://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html
        require('mongodb').MongoClient.connect(util.format("mongodb://%s:%s@%s:%s/%s", config.mongodb.user, config.mongodb.password,
            config.mongodb.host, config.mongodb.port, config.mongodb.database),
            {
                poolSize: 10,       //number of connections in the connection pool, set to 1 as default for legacy reasons
                bufferMaxEntries:-1,//每个链接的最大请求等待数，默认-1无限制
                wtimeout:10000,     //set the timeout for waiting for write concern to finish (combines with w option)
                connectTimeoutMS:9000,//连接超时时间
                auto_reconnect:true, //出现错误自动重连
                reconnectWait:9000,  //自动重连前等待的时间 time to wait in milliseconds before attempting reconnect.
                retryMiliSeconds:5000,//两次自动重连的间隔 number of milliseconds between retries.
                numberOfRetries:5,   //重连最大次数  number of retries off connection
                w:1,                  //w参数是write concern.safe：ture/false被淘汰,现在用w表示,w=0相当于saft=false的形式,当然w能够表达的存储方式已经超越了saft=true,w=1表示只有一个节点写入成功即返回,w=2表示两个节点写入成功才返回
                fsync:true            //同步返回前写操作等待

            }, function (err, db) {
                if (err) {
                    console.log('mongodb conn:error-' + err);
                    return;
                }
                //当前连接池连接个数
                //console.log(db.serverConfig.poolSize);
                mondb = db;
                eventEmitter.emit(emitobj);
                console.log('mongodb conn:new succ!');
            });
        //已存在链接，直接使用
    } else {
        //当前连接池连接个数
        //console.log(mondb.serverConfig.poolSize);
        eventEmitter.emit(emitobj);
        console.log('mongodb conn:succ!');
    }

};


//关闭mongo链接
var mongoClose = function () {
    if (mondb != null) {
        mondb.close();
    }
    mondb = null;
    console.log('mongodb close:succ!');
};

//绑定触发器
var bindAction = function (req, res, params, funame, callback) {
    var nums = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var random = nums[Math.round(Math.random() * (nums.length - 1))] + nums[Math.round(Math.random() * (nums.length - 1))] + Math.round(Math.random() * 10000);
    eventEmitter.once(random, function () {
        funame(req, res, params, callback)
    });
    mongoHander(random);
}

//查询所有的user记录
function searchUsers(req, res, params, callback) {

    mondb.collection('user', function (err, collection) {
        //{safe:true}这个参数，使得insert和错误状态查询能够一起执行,一旦设置这个参数，一定要增加回调函数作为第三个参数
        collection.find().toArray(function (error, result) {
            if (error) {
                console.log('mongodb conn:search error-' + error);
                return;
            }

            //暂时不关闭链接
            //mongoClose();

            res.render(global.APP_PATH + '/views/NodeMongoDB/showusers.jade', {'results': JSON.stringify(result)});
        });
    });
}

//插入一条user记录
function insertUser(req, res, params, callback) {
    mondb.collection('user', function (err, collection) {
        //{safe:true}这个参数，使得insert和错误状态查询能够一起执行,一旦设置这个参数，一定要增加回调函数作为第三个参数
        collection.insert({name: params[0], age: params[1], likes: params[2]}, {safe: true}, function (error, log) {
            if (error) {
                console.log('mongodb conn:insert error-' + error);
                return;
            }
            res.render(global.APP_PATH + '/views/NodeMongoDB/index.jade', {'info': '添加用户成功'});
            //暂时不关闭链接
            //mongoClose();
        });
    });
}

//预查询所有的user记录
function presearchUsers(req, res, params, callback) {
    mondb.collection('user', function (err, collection) {
        //{safe:true}这个参数，使得insert和错误状态查询能够一起执行,一旦设置这个参数，一定要增加回调函数作为第三个参数
        collection.find().toArray(function (error, result) {
            if (error) {
                console.log('mongodb conn:presearch error-' + error);
                return;
            }

            //暂时不关闭链接
            //mongoClose();

            res.render(global.APP_PATH + '/views/NodeMongoDB/deluser.jade', {'results': JSON.stringify(result)});
        });
    });
}
//根据id删除数据
function deleteUsersById(req, res, params, callback) {
    mondb.collection('user', function (err, collection) {
        //{safe:true}这个参数，使得insert和错误状态查询能够一起执行,一旦设置这个参数，一定要增加回调函数作为第三个参数
        collection.remove({_id: require('mongodb').ObjectID(params[0])}, function (error, result) {
            if (error) {
                console.log('mongodb conn:delbyid error-' + error);
                return;
            }
            res.header('Content-Type', 'text/plain');
            res.end('succ');
            //暂时不关闭链接
            //mongoClose();
        });
    });
}
//预查询将要更新所有的user记录
function preupdateUsers(req, res, params, callback) {
    mondb.collection('user', function (err, collection) {
        //{safe:true}这个参数，使得insert和错误状态查询能够一起执行,一旦设置这个参数，一定要增加回调函数作为第三个参数
        collection.find().toArray(function (error, result) {
            if (error) {
                console.log('mongodb conn:presearch error-' + error);
                return;
            }

            //暂时不关闭链接
            //mongoClose();

            res.render(global.APP_PATH + '/views/NodeMongoDB/upuser.jade', {'results': JSON.stringify(result)});
        });
    });
}
//根据id更新数据
function updateUsersById(req, res, params, callback) {
    mondb.collection('user', function (err, collection) {
        //{safe:true}这个参数，使得insert和错误状态查询能够一起执行,一旦设置这个参数，一定要增加回调函数作为第三个参数
        collection.update({_id: require('mongodb').ObjectID(params[0])}, {
            $set: {
                name: params[1],
                age: params[2],
                likes: params[3]
            }
        }, function (error, result) {
            if (error) {
                console.log('mongodb conn:upbyid error-' + error);
                return;
            }
            //暂时不关闭链接
            //mongoClose();
        });
    });
}

/*
 统一出口
 */
exports.execMongoDB_pool = bindAction;
/*
关闭数据库连接
 */
exports.closeMongoDB=mongoClose;

//插入一条javacol记录
exports.insertUser = insertUser;
//查询所有用户信息
exports.searchUsers = searchUsers;
//预删除查询数据
exports.presearchUsers = presearchUsers;
//根据id删除数据
exports.deleteUsersById = deleteUsersById;
//预更新查询数据
exports.preupdateUsers = preupdateUsers;
//根据id更新数据
exports.updateUsersById = updateUsersById;




