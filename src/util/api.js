import axios from 'axios';


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

//封装http post请求
API.httpPost = function (url, data) {
    // console.log(data);
    if (!data) data = {};
    data.t = Date.parse(new Date());
    // post axios
    return axios({
        method: 'post',
        url: url,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: data
    }).then(json => {
        return json.data;
    });
};














export default API;