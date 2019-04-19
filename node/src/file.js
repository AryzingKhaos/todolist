var fs = require('fs');

let file = {};

file.getJsonObj = function(data){ // 如果可以转换成obj，那么返回obj；如果不能，返回string
    if(typeof data != 'string'){
        let dataStr = data.toString(); // 为了防止这段数据是二进制流
        try{
            let dataJson = JSON.parse(dataStr);
            return dataJson;
        }catch(e){
            return dataStr;
        }
    }else{
        try{
            let dataJson = JSON.parse(data);
            return dataJson;
        }catch(e){
            return data;
        }
    }
}

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
    if(typeof _data === 'object'){
        _data = JSON.stringify(_data);
    }else if(typeof data === 'string'){
        _data = _data.toString();
    }
    return new Promise(function(resolve, reject){
        fs.writeFile(fileSrc, _data, function(err, data){
            if(err){
                reject(err);
            }
            resolve(_data);
        })
    })
}



// 读取mock/todo文件
file.readMock = function(){
    return file.readFile('./src/mock/todo.json').then(function(data){
        return file.getJsonObj(data);
    });
}

// 备份mock文件到todo-backup
file.backupTodo = function(data){
    return file.writeFile('./src/mock/todo-backup.json', data);
}

// 写入todo文件
file.writeMockTodo = function(todoJsonStr, backupJsonStr){
    return file.readMock()
    .then(function(data){
        // console.log(data);
        // console.log(JSON.stringify(data));
        console.log(typeof data);
        if(typeof data === 'object'){
            return file.backupTodo(JSON.stringify(data));
        }else{
            return file.backupTodo(data);
        }
    }).then(function(data){
        console.log('————————————备份todo成功——————————————'); // 注意，这一步是不符合规范的
        if(typeof todoJsonStr === 'object'){
            return file.writeFile('./src/mock/todo.json', JSON.stringify(todoJsonStr));
        }else{
            return file.writeFile('./src/mock/todo.json', todoJsonStr.toString());            
        }
    }).then(function(data){
        return file.getJsonObj(data);
    })
    .catch(function(err){
        return console.error(err);
    })
    // return file.writeFile('./src/mock/todo.json', todoJsonStr);
}

// export default file;
module.exports = file;

