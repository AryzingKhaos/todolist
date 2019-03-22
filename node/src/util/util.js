
let util = {};

util.findTodoById = function(arr, id){
    if(typeof id === 'string') id = parseInt(id);
    if(!arr || !arr.length) return null;
    if(!id) return null;
    for(let i = 0; i < arr.length; i++){
        if(arr[i].id === id){
            return arr[i];
        }
    }
    return null;
}


util.getMaxIdIteratorFromArr = function(arr){
    let maxId = 0;
    if(!arr) return 0;
    for(let i = 0; i < arr.length; i++){
        if(arr[i].id > maxId) maxId = arr[i].id;
    }
    return maxId;
}

util.getObj = function(string){
    if(typeof string === 'object') return string;
    else{
        try{
            let object = JSON.parse(string);
            return object;
        }catch(e){
            console.error('util.getObj转换的时候发生错误');
        }
    }
}

util.getString = function(object){
    if(typeof object === 'string') return object;
    else{
        try{
            let string = JSON.stringify(object);
            return string;
        }catch(e){
            console.error('util.getString转换的时候发生错误');
        }
    }
}


module.exports = util;