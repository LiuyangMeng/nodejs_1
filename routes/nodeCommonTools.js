/**
 * Created by DLHT on 2016-05-24.
 */

/*
获取当前访问的ipv4地址
 */
function IPAdress(){
    var interfaces = require('os').networkInterfaces();
    for(var devName in interfaces){
        var iface = interfaces[devName];
        for(var i=0;i<iface.length;i++){
            var alias = iface[i];
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                return alias.address;
            }
        }
    }
}
exports.getIPAdress=IPAdress;
