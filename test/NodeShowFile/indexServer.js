/**
 * Created by DLHT on 2016-05-27.
 * 使用该js创建一个完整的server程序
 */
//启动服务计时器
console.time('[ServerStart]');

//请求模块列表
var HTTP=require('http');//HTTP协议
var URL=require('url');//URL解析模块
var FS=require('fs');//文件解析模块
var PATH=require('path');//路径解析模块

//根据路径获取内容返回类型，用于http返回头
var getContentType=function(filepath){
    var contentType='';
    //使用路径解析获取文件拓展名
    var ext=PATH.extname(filepath);
    switch(ext){
        case '.html':
            contentType='text/html';
            break;
        case '.js':
            contentType='text/javascript';
            break;
        case '.css':
            contentType='text/css';
            break;
        case '.gif':
            contentType='image/gif';
            break;
        case '.jpg':
            contentType='image/jpeg';
            break;
        case '.png':
            contentType='image/png';
            break;
        case '.ico':
            contentType='image/ico';
            break;
        default:
            contentType='application/octet-stream';
    }
    return contentType;
};

//主函数，解析请求，返回内容
var webSer=function(req,res){
  //获取请求的url
    var reqUrl=req.url;
    console.log(reqUrl);//控制台输出
    //使用url解析获取url下的路径
    var pathName=URL.parse(reqUrl).pathname;
    if(PATH.extname(pathName)==''){
        //路径没有拓展名，访问目录
        pathName+='/';
    }
    if(pathName.charAt(pathName.length-1)=='/'){
        //如果访问目录，默认访问该目录下方的index.html
        pathName+='index.html';
    }
    //使用路径解析，添加实际文件
    var filePath=PATH.join('../../public',pathName);
    //返回解析后的路径
    console.log(filePath);
    //判断文件是否存在
    FS.exists(filePath,function (exists) {
        if(exists){
            //该文件存在
            res.writeHead(200,{'Content-Type':getContentType(filePath)});
            //创建只读流用于返回
            var stream=FS.createReadStream(filePath,{flags:'r',encoding:null});
            //如果流出现错误，返回404
            stream.on('error',function(){
                res.writeHead(404);
                res.end('<h2>404 Read File</h2>')
            });
            //链接文件流和http返回流通道
            stream.pipe(res);
        }else{
            //文件找不到，返回404
            res.writeHead(404,{'Content-Type':'text/html'});
            res.end('<h2>404 No File</h2>');
        }
    });
};

//创建一个服务器
var indexserver=HTTP.createServer(webSer);
//指定服务器错误响应
indexserver.on('error',function(err){
    //错误信息打印到控制台上
    console.error(err.stack);
});
//开始监听
indexserver.listen(3005,function(){
   //控制台输出启动信息
    console.log('[ServerStart] running at http://127.0.0.1:3005');
    //结束服务器启动并数据
    console.timeEnd('[ServerStart]');
});
