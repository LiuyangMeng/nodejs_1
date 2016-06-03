/**
 * Created by DLHT on 2016-05-18.
 */
/*
 在JavaScript中，一个函数可以作为另一个函数接收一个参数。我们可以先定义一个函数，然后传递，也可以在传递参数的地方直接定义函数。
 */
function say(word){
    console.log(word);
}
function execute(someFunction,value){
    someFunction(value);
}

execute(say,'nihao');

//匿名函数
execute(function(word){
    console.log(word);
},'zaijian');

