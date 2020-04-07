

import axios from 'axios';
import { Toast, Indicator } from "mint-ui";
//全局接口错误拦截
axios.interceptors.response.use(function (response) {
    let res = response.data;
    let path = location.hash;
    if (res.code == 1 ) {   //拦截业务错误码
        return res.data;
    } else if (res.code == 0) {
        if (path != "#/index") {
            window.location.href = "/#/login"
        } else {
            Toast(res.msg);
        }
        return Promise.reject(res);
    } else {
        Toast(res.msg);
    }
}, (error) => { //这部分拦截服务器错误码
    let res = error.response;
    alert(res.data.message);
    return Promise.reject(error);
});


function successfun(res) {//处理后台返回的非200错误
    if (res.code === 1) {
        return res
    } else {
        // Toast(res.message);
        return res;
    }
}
function errorfun(res) {
    if (res.code != 1) {
        Toast(res.message);
        return res;
    }
}
export default {
    post(url, data) {//post请求
        return axios({
            method: 'post',
            url,
            data: data,
            withCredentials: true,
            timeout: 5000,//响应时间
        }).then(res => {
            Indicator.close();
            return successfun(res)
        }, err => {
            Indicator.close();
            return errorfun(err);
        })
    },
    get(url, params) {//get请求
        return axios({
            method: 'get',
            url,
            params,
            withCredentials: true,
            timeout: 5000,
        }).then(res => {
            Indicator.close();
            return successfun(res)
        }, err => {
            Indicator.close();
            return errorfun(err)
        })
    }
}

