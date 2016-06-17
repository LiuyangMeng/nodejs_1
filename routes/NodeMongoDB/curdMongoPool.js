/**
 * Created by DLHT on 2016-06-17.
 *  nodejs 链接mongodb使用链接池 pool
 */
//调用配置文件
var config = require('../../public/config/config');
//引用nodejs工具类
var util = require('util');

//定义全局变量，用以暂存db链接
var mondb=null;

