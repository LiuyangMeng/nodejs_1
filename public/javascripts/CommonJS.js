/**
 * Created by DLHT on 2016-06-16.
 * 常用js存储
 */
/*
    js 版本的trim
 */
String.prototype.trim=function() {
    return this.replace(/(^\s*)|(\s*$)/g,'');
};

/*
    只能输入数字,其他不允许输入.
    min:最小输入数字个数,0:不限制 keyup暂时无法控制，只能在onblur控制
    max:最大输入数字个数,0:不限制
    iszero：首位可否为0，true：可以，false：不可以
 */
String.prototype.onlyNum=function(min,max,zero){
    //也可根据键盘值判断
    //if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105)))
    var num=this.replace(/\D/g,'');
    if(!zero){
        if(num.length>0&&num.indexOf(0)==0){
            num=num.substr(1,num.length);
        }
    }
    if(max>0){
        if(num.length>max){
            num=num.substr(0,max);
        }
    }
    return num;
}

