var fs = require('fs');

let file = {};

file.readFile = function(fileSrc){
    return new Promise(function(resolve, reject){
        fs.readFile(fileSrc, function(err, data){
            if(err){
                reject(err);
            }
            resolve(data);
        })
    })
}

file.writeFile = function(fileSrc, data){
    let _data = data;
    if(typeof data != 'string'){
        _data = _data.toString();
    }
    return new Promise(function(resolve, reject){
        fs.writeFile(fileSrc, _data, function(err, data){
            if(err){
                reject(err);
            }
            resolve(data);
        })
    })
}



// 读取mock/todo文件
file.readMock = function(){
    return file.readFile('./src/mock/todo.json');
}

// 备份mock文件到todo-backup
file.backupTodo = function(data){
    return file.writeFile('./src/mock/todo-backup.json', data);
}

// 写入todo文件
file.writeTodo = function(todoJsonStr){
    return file.writeFile('./src/mock/todo.json', todoJsonStr);
}

// export default file;
module.exports = file;

