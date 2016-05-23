/**
 * Created by DLHT on 2016-05-17.
 */
/*
 JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。

 但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。
 在 Node.js 中，Buffer 类是随 Node 内核一起发布的核心库。Buffer 库为 Node.js 带来了一种存储原始数据的方法，可以让 Node.js 处理二进制数据，
 每当需要在 Node.js 中处理I/O操作中移动的数据时，就有可能使用 Buffer 库。原始数据存储在 Buffer 类的实例中。一个 Buffer 类似于一个整数数组，
 但它对应于 V8 堆内存之外的一块原始内存
 */


var buf1=new Buffer(10);
console.log(buf1.length);

var buf2=new Buffer([10,20,30]);
console.log(buf2.length);

var buf3=new Buffer('www.baidu.com','utf-8');
console.log(buf3.length);

var len=buf1.write('beijinghuanyingni');
console.log('写入字符个数:'+len);

console.log(buf1.toString('utf8'));
console.log(buf1.toJSON());

//缓冲区合并
console.log(Buffer.concat([buf1,buf3]).toString('utf8'));

//缓冲区比较 返回一个数字，表示 buf 在 otherBuffer 之前，之后或相同。
var res1=buf1.compare(buf3);
if(res1<0){
    console.log(buf1.toString()+' 在 '+buf3.toString()+' 之前');
}else if(res1==0){
    console.log(buf1.toString()+' 在 '+buf3.toString()+' 相同');
}else{
    console.log(buf1.toString()+' 在 '+buf3.toString()+' 之后');
}

//拷贝缓冲区
var buf4=new Buffer(5);
buf1.copy(buf4);
console.log(buf4.toString());

//缓冲区裁剪
console.log(buf1.slice(2,7).toString());