/**
 * Created by DLHT on 2016-06-12.
 * nodejs 链接mongodb进行简单操作
 */
//调用配置文件
var config = require('../../public/config/config');
//引用nodejs工具类
var util = require('util');

//定义全局变量，用以暂存db链接
var mondb;

//监听
var events = require('events');
var eventEmitter =new events.EventEmitter();

//获取mondb链接
var mongoHander=function(emitobj){
    //mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
//引用mongodb在nodejs中的模块
    var mongoClient = require('mongodb').MongoClient;

    mongoClient.connect(util.format("mongodb://%s:%s@%s:%s/%s", config.mongodb.user, config.mongodb.password,
        config.mongodb.host, config.mongodb.port, config.mongodb.database), function (err, db) {
        if (err) {
            console.log('mongodb conn:error-' + err);
            return;
        }
        mondb=db;
        eventEmitter.emit(emitobj);
        console.log('mongodb conn:succ!');
    });
};

//关闭mongo链接
var mongoClose=function(){
  mondb.close();
};

//绑定触发器
var bindAction=function (req,res,funame,callback){
    var nums=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var random=nums[Math.round(Math.random()*(nums.length-1))]+nums[Math.round(Math.random()*(nums.length-1))]+ Math.round(Math.random()*10000);
    eventEmitter.once(random,funame);
    mongoHander(random);
}

//插入一条javacol记录
function insertJavaCol(){
    mondb.collection('javacol',function (err,collection){
        //{safe:true}这个参数，使得insert和错误状态查询能够一起执行,一旦设置这个参数，一定要增加回调函数作为第三个参数
        collection.insert({title:'nodejs',likes:Math.round(Math.random()*100)},{safe:true},function(error,log){
            if(error){
                console.log('mongodb conn:insert error-'+error);
                return;
            }
            console.log('mongodb conn:insert succ-'+log);

            mongoClose();
        });
    });
}

/*
统一出口
 */
exports.execMongoDB_conn=bindAction;

//插入一条javacol记录
exports.insertJavacol=insertJavaCol;



