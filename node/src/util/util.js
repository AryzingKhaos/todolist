
let util = {};

util.findTodoById = function(arr, id){
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


module.exports = util;