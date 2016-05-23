/**
 * Created by DLHT on 2016-05-19.
 */
/*
 util 是一个Node.js 核心模块，提供常用函数的集合，用于弥补核心JavaScript 的功能 过于精简的不足。
 */
var util=require('util');
function Base(){
    this.name='base';
    this.base=1991;
    this.sayHello=function(){
        console.log('hello '+this.name);
    };
}
Base.prototype.showName=function(){
  console.log(this.name);
};

function Sub(){
    this.name='sub';
};

//继承
util.inherits(Sub,Base);

var objBase=new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);

//Sub 仅仅继承了Base 在原型中定义的函数，而构造函数内部创造的 base 属 性和 sayHello 函数都没有被 Sub 继承。
var objSub=new Sub();
objSub.showName();
//objSub.sayHello();
console.log(objSub);

//util.inspect()将任意对象转换 为字符串的方法，通常用于调试和错误输出。它至少接受一个参数 object，即要转换的对象
function Person(){
    this.name='liming';
    this.toString=function(){
      return this.name;
    };
}
var person=new Person();
console.log(util.inspect(person));
console.log(util.inspect(person,true));

console.log(util.isArray({}));
console.log(util.isArray([]));
console.log(util.isArray(new Array()));