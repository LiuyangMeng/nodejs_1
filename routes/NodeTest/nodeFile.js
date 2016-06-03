/**
 * Created by DLHT on 2016-05-19.
 */
/*
 Node.js 提供一组类似 UNIX（POSIX）标准的文件操作API。 Node 导入文件系统模块(fs)
 */

var fs=require('fs');
var bff=new Buffer(1024);

//异步打开文件
console.log('准备打开文件');
fs.open('../../public/files/input1.txt','r+',function(err,fd){
   if(err){
       return console.error(err);
   }
    console.log('文件打开结束');

    console.log('准备文件读取');
    fs.read(fd,bff,0,bff.length,0,function(err,bytes){
        if(err){
            console.error(err);
        }
        //仅输出读取的文件内容
        if(bytes>0){
            console.log('读取内容:'+bff.slice(0,bytes).toString());
        }
        //关闭文件
        fs.close(fd,function(err){
            if(err){
                console.log('关闭文件异常');
            }
            console.log('文件关闭成功');
        });
    });
});

//获取文件信息
fs.stat('../../public/files/input1.txt',function(err,status){
    console.log(status.isFile());
    console.log(status);
})

//写文件信息
console.log('准备写入文件');
fs.writeFile('../../public/files/input2.txt','I am written by nodejs',function(err){
   if(err){
       return console.error(err);
   }
    console.log('文件写入成功');
    console.log('..............................');
    console.log('开始文件读取');
    fs.readFile('../test/input2.txt',function(err,data){
        if(err){
            return console.error(err);
        }
        console.log('读取文件内容为:'+data.toString());
    });
});

//文件截取
fs.open('../../public/files/input3.txt','r+',function(err,fd){
   if(err){
       return console.log(err);
   }
    console.log('数据打开成功');
    console.log('开始截取4字节之后的内容');

    //截取文件
    fs.truncate(fd,4,function(err){
       if(err){
           return console.log(err);
       } ;
        console.log('文件截取成功');
        console.log('读取相同的文件');
        fs.read(fd,bff,0,bff.length,0,function(err,bytes){
           if(err){
               return console.log(err);
           }
            if(bytes>0){
                console.log('本次读取文件直接数:'+bytes);
                console.log(bff.slice(0,bytes).toString());
            }

            fs.close(fd,function(err){
               if(err){
                   console.log('关闭文件异常');
               }
                console.log('成功关闭文件');
            });

        });
    });
});

//删除文件
fs.unlink('../../public/files/input4.txt',function(err){
   if(err){
       return console.log(err);
   }
    console.log('删除成功');
});

//读取目录
console.log('读取test目录的文件');
fs.readdir('../../public/files',function(err,files){
    if(err){
        return console.error(err);
    }
    console.log('开始读取文件夹内容');
    files.forEach(function (file){
        console.log(file);
    });
});
console.log('读取文件夹内容结束');

