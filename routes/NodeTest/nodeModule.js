/**
 * Created by DLHT on 2016-05-18.
 */
/*
 为了让Node.js的文件可以相互调用，Node.js提供了一个简单的模块系统。

 模块是Node.js 应用程序的基本组成部分，文件和模块是一一对应的。换言之，一个 Node.js 文件就是一个模块，这个文件可能是JavaScript 代码、JSON 或者编译过的C/C++ 扩展。
 */

var Hello1=require('./NodeModule/hello');
/*
Hello1.world();
*/
var hello=new Hello1();
hello.setName('MengLiuyang');
hello.sayHello();