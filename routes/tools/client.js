/**
 * Created by DLHT on 2016-05-20.
 */

/*
var http=require('http');

//添加用于请求的选项
var options={
    host:'localhost',
    port:'3003',
    method:'get',
    path:'/cookie'
};

//处理相应的回调函数
var callback=function(response){
  //不断更新数据
    var body='';
    response.on('data',function(data){
       body+=data;
    });

    response.on('end',function(){
       //数据接收完毕
        console.log(body);
    });
};

var cookie='name=liu,age=12';

//向服务器请求数据
var req=http.request(options,callback);
req.end();
*/

    var data = {
        address: 'test@test.com',
        subject: "test"
    };

    data = require('querystring').stringify(data);
    console.log(data);
    var opt = {
        method: "POST",
        host: "localhost",
        port: 3003,
        path: "/cookie",
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded',
            "Content-Length": data.length,
            'Cookie':'name=meng'
        }
    };

    var req = require('http').request(opt, function (response) {
        if (response.statusCode == 200) {
            var body1 = "";
            response.on('data', function (data) {
                body1 += data;
                console.log(data.toString());
            });
            response .on('end', function () {
                   console.log(body1.toString());
                    // res.send(200, body);
                    });
        }
        else {
           // res.send(500, "error");
        }
    });
    req.write(data + "\n");
    req.end();

    req.on('error',function(error){
        console.log(error.stack);
    });