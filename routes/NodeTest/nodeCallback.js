/**
 * Created by DLHT on 2016-05-17.
 */
var fs=require('fs');

console.log('\n阻塞代码\n');
var data=fs.readFileSync('../../public/files/input1.txt');
console.log(data.toString());
console.log('程序运行结束');

console.log('\n非阻塞代码\n');
fs.readFile('../../public/files/input1.txt',function(err,data){
    if (err){
        console.log(err.stack);
        return;
    }
    console.log(data.toString());
});
console.log('程序运行结束');
