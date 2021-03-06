import axios from 'axios';
import qs from 'qs';

let domain = 'http://127.0.0.1:5000/';
let API = {};

//封装http get请求
API.httpGet = function (url, data) {
    // console.log(url);
    // get axios
    if (!data) data = {};
    data.t = Date.parse(new Date());
    return axios.get(url, { params: data }).then(json => {
        return json.data;
    });
};

// //封装http post请求
// API.httpPost = function (url, data) {
//     if (!data) data = {};
//     data.t = Date.parse(new Date());
//     // post axios
//     return axios({
//         method: 'post',
//         url: url,
//         headers: {
//             'Content-type': 'application/x-www-form-urlencoded'
//         },
//         // params: data,
//         data: qs.stringify(data),
//     }).then(json => {
//         return json.data;
//     });
// };

//封装http post请求
API.httpPost = function (url, data) {
    if (!data) data = {};
    data.t = Date.parse(new Date());
    // post axios
    return axios.post(url, data).then(json => {
        return json.data;
    });
};

API.loadTodo = function(id){
    return API.httpGet(domain + 'todo/read/', {
        id:id,
    });
}

API.saveTodo = function(id, todo){
    return API.httpPost(domain + 'todo/save/', {
        id: id,
        todo: todo,
    });
}

API.getHomeList = function(){
    return API.httpGet(domain + 'todo/list/', {
    });
}

API.addTodoList = function(title, desc){
    return API.httpPost(domain + 'todo/add/', {
        title: title,
        desc: desc,
    });
}

export default API;


