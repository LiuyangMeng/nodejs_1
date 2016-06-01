/**
 * Created by DLHT on 2016-05-31.
 * config 配置文件信息
 */
var config={
    //数据库配置文件信息
    db:{
        host: '127.0.0.1',          //访问主机名称
        user: 'root',               //mysql用户名
        password: '20110725',       //mysql密码
        port: '3306',               //mysql访问端口
        database: 'nodedata',       //数据库名称

        charset:'UTF8_GENERAL_CI',  //连接字符集（默认：‘UTF8_GENERAL_CI’，注意字符集的字母都要大写）
        connectTimeout:'10',        //连接超时（默认：不限制；单位：毫秒）

        waitForConnections:'true',  //　当连接池没有连接或超出最大限制时，设置为true且会把连接放入队列，设置为false会返回error
        connectionLimit:'20',       //连接数限制，默认：10
        queueLimit:'0'              //最大连接请求队列限制，设置为0表示不限制，默认：0
        //后续可加入更多的信息
    }
    //其他配置文件信息
};

module.exports=config;