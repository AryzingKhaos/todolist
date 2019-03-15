let util = {};

util.deepCopy = function(obj){
    return JSON.parse(JSON.stringify(obj));
}

export default util;