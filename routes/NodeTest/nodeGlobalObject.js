/**
 * Created by DLHT on 2016-05-19.
 */
/*
 JavaScript 中有一个特殊的对象，称为全局对象（Global Object），它及其所有属性都可以在程序的任何地方访问，即全局变量。
 在浏览器 JavaScript 中，通常 window 是全局对象， 而 Node.js 中的全局对象是 global，所有全局变量（除了 global 本身以外）都是 global 对象的属性。
 在 Node.js 我们可以直接访问到 global 的属性，而不需要在应用中包含它。
 */

//__filename 表示当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。 如果在模块中，返回的值是模块文件的路径。
console.log(__filename);

//__dirname 表示当前执行脚本所在的目录。
console.log(__dirname);

// setTimeout(cb, ms) 全局函数在指定的毫秒(ms)数后执行指定函数(cb)。：setTimeout() 只执行一次指定函数。返回一个代表定时器的句柄值。
function printHel(){
    console.log('Hello Sister');
}
var sid=setTimeout(printHel,2000);
console.log(sid);

//clearTimeout( t ) 全局函数用于停止一个之前通过 setTimeout() 创建的定时器。 参数 t 是通过 setTimeout() 函数创建的计算器。
clearTimeout(sid);

// setInterval(cb, ms) 全局函数在指定的毫秒(ms)数后执行指定函数(cb)。返回一个代表定时器的句柄值。可以使用 clearInterval(t) 函数来清除定时器。
//setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。
var sid1=setInterval(printHel,2000);
setTimeout(function (){clearInterval(sid1)},10001);

//计时器计时
console.time('starttime');
console.timeEnd('starttime');

//带参数的log日志
console.log('hello %d ,nihao%d',12,24);

//全局变量process
process.on('exit',function(code){
   //以下代码不会执行
    setTimeout(function(){
        console.log('不会执行的代码！');
    });
    console.log('退出码为:'+code);
});
console.log('process结束!');

//输出到终端
process.stdout.write('Hello World !'+'\n');

//通过参数读取
process.argv.forEach(function(val,index,array){
    console.log(index+':'+val);
});

//获取执行路径
console.log('执行路径：'+process.execPath);

//平台信息
console.log('平台信息：'+process.platform);

//当前目录
console.log('当前目录：'+process.cwd());