/**
 * Created by DLHT on 2016-06-01.
 */

var sqlmy=require('./MysqlConn');

var isql='insert into user(uname,uage,upass) values (?,?,?)';
var isqlparam=['m1',21,'m1pp'];

sqlmy.insertSql(isql,isqlparam,null);