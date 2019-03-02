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

app.use(express.static('public', options))

app.get('/', function(req,res){
    res.send('hello world');
})

app.get('/todo/read', function(req, res){
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
        fs.writeFile('./mock/todo-backup.json',data.toString(),function(err){
            if(err){
                console.error(err);
            }
            console.log('----------备份todo成功-------------');
        })

        let todoJsonStr = req.body.todo;

        fs.writeFile('./mock/todo.json',todoJsonStr,function(err){
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







