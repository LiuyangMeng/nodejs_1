/**
 * Created by DLHT on 2016-05-25.
 */
/*
 Node.js 是以单线程的模式运行的，但它使用的是事件驱动来处理并发，这样有助于我们在多核 cpu 的系统上创建多个子进程，从而提高性能。
 每个子进程总是带有三个流对象：child.stdin, child.stdout 和child.stderr。他们可能会共享父进程的 stdio 流，或者也可以是独立的被导流的流对象。
 Node 提供了 child_process 模块来创建子进程，方法有：
 exec - child_process.exec 使用子进程执行命令，缓存子进程的输出，并将子进程的输出以回调函数参数的形式返回。
 spawn - child_process.spawn 使用指定的命令行参数创建新线程。
 fork - child_process.fork 是 spawn()的特殊形式，用于在子进程中运行的模块，如 fork('./son.js') 相当于 spawn('node', ['./son.js']) 。
    与spawn方法不同的是，fork会在父进程与子进程之间，建立一个通信管道，用于进程之间的通信。
 */
const fs=require('fs');
const child_process=require('child_process');

/*//使用exec建立多线程
for(var i=0;i<3;i++){
    var workerProcess=child_process.exec('node ./nodeMultiprocess/support.js '+i,function(error,stdout,stderr){
        if(error){
            console.log(error.stack);
            console.log('Error code:'+error.statusCode);
            console.log('Error signal:'+error.signal);
        }
        console.log('stdout:'+stdout);
        console.log('stderr:'+stderr);
    });
    workerProcess.on('exit',function(code){
        console.log('exec子进程退出了，退出码为:'+code);
    })
}*/

//使用spawn建立多线程
for(var i=0;i<3;i++){
    var workerProcess=child_process.spawn('node',['./nodeMultiprocess/support.js',i]);
    workerProcess.stdout.on('data',function (data) {
        console.log('stdout:'+data);
    });
    workerProcess.stderr.on('data',function (data) {
        console.log('stderr:'+data);
    });
    workerProcess.on('close',function (code) {
        console.log('spawn子进程退出了，退出码为:'+code);
    });
}

//使用fork建立多线程
for(var i=0;i<3;i++){
    var workerProcess=child_process.fork('./nodeMultiprocess/support.js',[i]);
    workerProcess.on('close',function (code) {
        console.log('fork子进程退出了，退出码为:'+code);
    });
}
