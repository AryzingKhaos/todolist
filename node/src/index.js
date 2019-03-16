
// import * as bodyParser from 'body-parser';
var bodyParser = require('body-parser');
var fs = require('fs');
var express = require('express');
var app = express();
// const router = express.Router();

var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now())
    }
}

app.all('*', function(req, res, next) {
    console.log(req.method);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-type');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
    res.header('Access-Control-Max-Age',1728000);//预请求缓存20天
    next();  
});

let successJsonFunc = function(data){
    return JSON.stringify({
        code: 0,
        data: JSON.parse(data),
        msg: ''
    });
}
let failJsonFunc = function(code, data, msg){
    return JSON.stringify({
        code: code,
        data: data,
        msg: msg
    });
}

app.use(express.static('public', options));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req,res){
    res.send('hello world');
})

app.get('/todo/read', function(req, res){
    //设置允许跨域请求
    var reqOrigin = req.header("origin");
    console.log(reqOrigin);

    if(reqOrigin !=undefined > -1){
        //设置允许 http://localhost:3000 这个域响应
        // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    }

    fs.readFile('./src/mock/todo.json', function(err, data){
        if(err){
            res.send(1005, null, '读取文件失败');
            return console.error(err);
        }
        var todo = data.toString();//将二进制的数据转换为字符串
        res.send(successJsonFunc(todo));
    })
})

app.post('/todo/save', function(req, res){
    fs.readFile('./src/mock/todo.json', function(err, data){
        if(err){
            res.send(1005, null, '读取文件失败');
            return console.error(err);
        }
        // 备份todo
        fs.writeFile('./src/mock/todo-backup.json',data.toString(),function(err){
            if(err){
                return console.error(err);
            }
            console.log('----------备份todo成功-------------');
        })

        // 获取请求的内容
        let todoJsonStr;
        console.log(req.body);
        if(req.body){
           todoJsonStr = JSON.stringify(req.body.todo);
        }else{
            res.send(failJsonFunc(1005, null, '请求没有body'));
            return console.error('请求没有body');
        }
        if(!todoJsonStr){
            return console.error('todoJsonStr为空');
        }

        // 写入todo.json文件
        fs.writeFile('./src/mock/todo.json',todoJsonStr,function(err){
            if(err){
                res.send(1005, null, '写入文件失败');
                return console.error(err);
            }
            console.log('----------保存todo成功-------------');
            res.send(successJsonFunc(null));
        })
    })
})


var server = app.listen(5000, function () {
 
    var host = server.address().address
    var port = server.address().port
   
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})







