
// import * as bodyParser from 'body-parser';
// import * as file from './file.mjs';

var bodyParser = require('body-parser');
var fs = require('fs');
var express = require('express');
var url = require('url');
var app = express();
var querystring = require("querystring");
// const router = express.Router();

var file = require('./file.js');
var util = require('./util/util.js');


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
        data: data,
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
    // console.log(reqOrigin);
    console.log(req.url);

    //获取返回的url对象的query属性值 
	var arg = url.parse(req.url).query;
	//将arg参数字符串反序列化为一个对象
    var params = querystring.parse(arg);
    var id = params.id;
    console.log(id);

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
        var dataStr = data.toString();//将二进制的数据转换为字符串
        // console.log(dataStr);
        var dataObj = JSON.parse(dataStr);
        // console.log(dataObj);
        let findTodo = util.findTodoById(dataObj, parseInt(id));
        // console.log(findTodo);
        // console.log(typeof findTodo.todo);
        if(findTodo){
            res.send(successJsonFunc(findTodo.todo));
        }else{
            res.send(failJsonFunc(1009, {}, '没有找到这个id的todo'));
        }
    })
})

app.post('/todo/save', function(req, res){

    file.readMock()
    .then(function(data){
        // 备份todo
        return file.backupTodo(data.toString()).then(function(data){
            console.log('----------备份todo成功-------------');
            return data;
        }).catch(function(err){
            return console.error(err);
        })
    })
    .then(function(dataStr){
        // 获取请求的内容
        let finalStr, todoJsonStr, todoId;
        let data = JSON.parse(dataStr);
        console.log(req.body);
        if(req.body){
           todoJsonStr = JSON.stringify(req.body.todo);
           todoId = req.body.id;
        }else{
            res.send(failJsonFunc(1005, null, '请求没有body'));
            return console.error('请求没有body');
        }
        if(!todoJsonStr){
            return console.error('todoJsonStr为空');
        }
        let changeTodo = util.findTodoById(data, todoId);
        changeTodo.updateTime = Date.parse(new Date());
        changeTodo.todo = todoJsonStr;
        console.log(data);
        finalStr = JSON.stringify(data);

        return finalStr;
    })
    .then(function(finalStr){
        // 写入todo.json文件
        return file.writeTodo(finalStr).then(function(data){
            console.log('----------保存todo成功-------------');
            res.send(successJsonFunc(null));
        }).catch(function(err){
            res.send(1005, null, '写入文件失败');
            return console.error(err);
        })
    })
    .catch(function(err){
        res.send(1005, null, '读取文件失败');
        return console.error(err);
    })


    fs.readFile('./src/mock/todo.json', function(err, data){
        if(err){
            res.send(1005, null, '读取文件失败');
            return console.error(err);
        }
        
    })
})


app.post('/todo/add', function(req, res){

    file.readMock()
    .then(function(data){
        // 备份todo
        return file.backupTodo(data.toString()).then(function(data){
            console.log('----------备份todo成功-------------');
            return data;
        }).catch(function(err){
            return console.error(err);
        })
    })
    .then(function(dataStr){
        // 获取请求的内容
        let finalStr, todoListTitle, todoListDesc;
        let data = JSON.parse(dataStr);
        console.log(req.body);
        if(req.body){
           todoListTitle = req.body.title;
           todoListDesc = req.body.desc;
        }else{
            res.send(failJsonFunc(1005, null, '请求没有body'));
            return console.error('请求没有body');
        }

        let id = parseInt(util.getMaxIdIteratorFromArr(data)) + 1;

        data.push({
            id: id,
            name: todoListTitle,
            desc: todoListDesc,
            updateTime: Date.parse(new Date()),
            todo: [],
        });

        console.log(data);
        finalStr = JSON.stringify(data);

        return finalStr;
    })
    .then(function(finalStr){
        // 写入todo.json文件
        return file.writeTodo(finalStr).then(function(data){
            console.log('----------保存todo成功-------------');
            res.send(successJsonFunc(null));
        }).catch(function(err){
            res.send(1005, null, '写入文件失败');
            return console.error(err);
        })
    })
    .catch(function(err){
        res.send(1005, null, '读取文件失败');
        return console.error(err);
    })


    fs.readFile('./src/mock/todo.json', function(err, data){
        if(err){
            res.send(1005, null, '读取文件失败');
            return console.error(err);
        }
        
    })
})


app.get('/todo/list', function(req, res){
    //设置允许跨域请求
    var reqOrigin = req.header("origin");
    // console.log(reqOrigin);
    console.log(req.url);

    //获取返回的url对象的query属性值 
	var arg = url.parse(req.url).query;
	//将arg参数字符串反序列化为一个对象
    var params = querystring.parse(arg);
    console.log(params);

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
        var dataStr = data.toString();//将二进制的数据转换为字符串
        var dataObj = JSON.parse(dataStr); // 这是个数组
        if(dataObj){
            res.send(successJsonFunc(dataObj));
        }else{
            res.send(failJsonFunc(1010, {}, '没有todo列表'));
        }
    })
})


var server = app.listen(5000, function () {
 
    var host = server.address().address
    var port = server.address().port
   
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})







