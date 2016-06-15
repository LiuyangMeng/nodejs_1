/**
 * Created by DLHT on 2016-06-12.
 * nodejs 链接mongodb进行简单操作
 */
//调用配置文件
var config = require('../../public/config/config');
//引用nodejs工具类
var util = require('util');

//mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
//引用mongodb在nodejs中的模块
var mongoClient = require('mongodb').MongoClient;

mongoClient.connect(util.format("mongodb://%s:%s@%s:%s/%s", config.mongodb.user, config.mongodb.password,
    config.mongodb.host, config.mongodb.port, config.mongodb.database), function (err, db) {
    if (err) {
        console.log('mongodb conn:error-' + err);
        return;
    }
    console.log('mongodb conn:succ!');

    //查询
    /*db.collection('col',function(err,collection) {
     collection.find({likes:{'$lt':150}}).toArray(function (error, oneval) {
     console.log(oneval);
     db.close();
     });
     });*/

    //插入数据
    /*db.collection('javacol',function (err,collection){
        //{safe:true}这个参数，使得insert和错误状态查询能够一起执行,一旦设置这个参数，一定要增加回调函数作为第三个参数
        collection.insert({_id:1,title:'nodejs',likes:12},{safe:true},function(error,log){
            if(error){
                console.log('mongodb conn:insert error-'+error);
                return;
            }
            console.log('mongodb conn:insert succ-'+log);
            db.close();
        });
    });*/

    //更新数据
    /*db.collection('javacol',function(err,collection){
       //第一个参数是条件,第二个参数是一个对象，其属性名是一个操作符，以$开头，值为一个对象。这些操作符除了这里的$push和$set，还有其它的$inc, $unset, $pushAll等等
       //upsert   : 这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
        //multi   : mongodb默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新
        collection.update({_id:{$ne:2}},{$set:{title:'nodejs mongodb2','likes':20}},{safe:true,upsert:true,multi:true},function(error,log){
           if(error){
               console.log('mongodb conn:update error-'+error);
               return;
           }
            console.log('mongodb conn:update succ-'+log);
            db.close();
        });
    });*/

    //删除文档
   /* db.collection('javacol',function(err,collection){
        collection.remove({_id:2},function(error,log){
            if(error){
                console.log('mongodb conn:remove error-'+error);
                return;
            }
            console.log('mongodb conn:remove succ-'+log);
            db.close();
        });
    });*/

    //其他操作
    db.collection('javacol',function(err,collection) {
        //sort 文档排序 1 asc    -1 desc
       // collection.find({likes:{'$lt':150}},{sort:{_id:-1,likes:1}}).toArray(function (error, oneval) {
            //limit 获取从第1条（第1条记录序号为0）记录开始的2条记录.类似与Mysql的limit 20, 10.
       // collection.find({likes:{'$lt':150}},{sort:{_id:-1,likes:1},limit:2,skip:1}).toArray(function (error, oneval) {
            //count
       // collection.count({_id:1},function(error,oneval){
            //aggregate  聚合(aggregate)主要用于处理数据(诸如统计平均值,求和等)，并返回计算后的数据结果。有点类似sql语句中的 count(*)
                //求和 sum
        //collection.aggregate([{$group:{_id:'$likes',likecount:{$sum:'$likes'}}}],function(error,oneval){
                //计数 sum
            //collection.aggregate([{$group:{_id:'$likes',likecount:{$sum:1}}}],function(error,oneval){
                //求平均 avg
        //collection.aggregate([{$group:{_id:'',likecount:{$avg:'$likes'}}}],function(error,oneval){
                //求最值 min，max
        // collection.aggregate([{$group:{_id:'',likecount:{$min:'$likes'}}}],function(error,oneval){
                //在结果文档中插入值到一个数组中 push  但不创建副本(addToSet)
        //collection.aggregate([{$group:{_id:'$title',likecount:{$push:'$likes'}}}],function(error,oneval){

       //管道概念
        //$project：修改输入文档的结构。可以用来重命名、增加或删除域，也可以用于创建计算结果以及嵌套文档。
            // collection.aggregate({$project:{title:1,_id:0,likes:2}},function(error,oneval){
        //$match：用于过滤数据，只输出符合条件的文档。$match使用MongoDB的标准查询操作
        // collection.aggregate([{$match:{title:{$ne:null}}},{$group:{_id:null,count:{$sum:1}}}],function(error,oneval){
        //$unwind：将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值
         collection.aggregate([{$match:{_id:{$ne:null}}},{$unwind:'$tags'}],function(error,oneval){



                 console.log(oneval);
            db.close();
        });
    });


});


