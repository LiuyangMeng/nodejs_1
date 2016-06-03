/**
 * Created by DLHT on 2016-05-18.
 */
var fs=require('fs');
var data='';

//创建可读流
var readerStream=fs.createReadStream('../../public/files/input1.txt');

//设置编码格式
readerStream.setEncoding('utf8');

//处理流事件
readerStream.on('data',function(func){
    data+=func;
});
readerStream.on('end',function(){
    console.log(data);
});
readerStream.on('error',function(err){
    console.error(err.stack);
});
console.log('数据读取处理完毕\n');

//测试写入流
var indata='测试写入数据问题';

//创建一个写入流，将数据写入output1.txt中
var writerStream=fs.createWriteStream('../../public/files/output1.txt');
//使用utf8写入数据
writerStream.write(indata,'utf8');
//标记文件末尾
writerStream.end();

//处理流事件
writerStream.on('finish',function(){
   console.log('所有数据已经写入完毕');
});
writerStream.on('error',function(err){
    console.error(err.stack);
});
console.log('所有数据已经写入');

//管道流测试
var readerStream1=fs.createReadStream('../../public/files/input1.txt');
var writerStream1=fs.createWriteStream('../../public/files/output1.txt');
readerStream1.pipe(writerStream1);

console.log('管道完毕');

//链式是通过连接输出流到另外一个流并创建多个对个流操作链的机制。链式流一般用于管道操作。用管道和链式来压缩和解压文件。
var zlib=require('zlib');
/*//压缩input1.txt到input.tar.gz
fs.createReadStream('../test/input1.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('../test/input1.txt.gz'));
console.log('文件压缩完毕');*/
//解压input1.txt.gz到inputgz.txt
fs.createReadStream('../../public/files/input1.txt.gz').pipe(zlib.createGunzip()).pipe(fs.createWriteStream('../../public/files/inputgz.txt'));
console.log('文件解压缩完毕');




