/**
 * Created by DLHT on 2016-05-17.
 */
//引入 enents
var events = require('events');
//创建eventEmitter
var eventEmitter = new events.EventEmitter();
//创建时间处理程序
var connectHandler = function connected() {
    console.log('链接成功!');
    //触发data-recived事件
    eventEmitter.emit('data_received');
};
//绑定事件以及事件处理程序
eventEmitter.on('connection', connectHandler);
//使用匿名函数绑定data-received函数
eventEmitter.on('data_received', function () {
    console.log('数据已接收到');
});
//触发事件
eventEmitter.emit('connection');

console.log('程序执行结束\n');

//监听器1
var listen1 =function listen1(){
    console.log('监听器1开始运行');
}
//监听器2
var listen2=function listen2(){
    console.log('监听器2开始运行');
}

eventEmitter.on('error',function(){
    console.log('something error');
});

//绑定监听器1
eventEmitter.addListener('conn',listen1);
//绑定监听器2
eventEmitter.on('conn',listen2);

//检测监听器个数
var eventlisteners=require('events').EventEmitter.listenerCount(eventEmitter,'conn');
console.log('当前共有'+eventlisteners+'个监听器监听conn事件');
//触发conn事件
eventEmitter.emit('conn');
//移除监听器1
eventEmitter.removeListener('conn',listen1);
console.log('监听器1已被移除');
//触发conn事件
eventEmitter.emit('conn');
eventlisteners=require('events').EventEmitter.listenerCount(eventEmitter,'conn');
console.log('当前共有'+eventlisteners+'个监听器监听conn事件');

console.log('运行结束');

