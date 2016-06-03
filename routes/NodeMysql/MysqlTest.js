/**
 * Created by DLHT on 2016-06-01.
 * 此文件仅用作测试使用
 */

var sqlconn=require('./MysqlConn');

var isql='insert into user(uname,uage,upass) values (?,?,?)';
var isqlparam=['m2',21,'m2pp'];

//sqlconn.insertSql(isql,isqlparam,null);

var sqlpool=require('./MysqPool');

//sqlpool.execSql_Pool(isql,isqlparam,null);


