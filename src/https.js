

import axios from 'axios';
import vueCookie from 'vue-cookie'
import { Toast, Indicator, MessageBox } from "mint-ui";
import util from './util/util'
//全局接口错误拦截
axios.interceptors.response.use(function (response) {
    let res = response.data;
    let path = location.hash;
    if (res.code == 1 || res.code == 2) {  //拦截业务错误码
        return res.data;
    } else if (res.code == 3) {
        if (path != "/#/index") {
            MessageBox.confirm('请先绑定手机号~', '友情提示').then(action => {
                if (action == 'confirm') {
                    let a = window.location.href.split("/#/")[1];
                    if (a.split("/")[0] == 'worksdetail') {
                        vueCookie.set("w_id", a.split("/")[1], { expires: "3D" });
                        window.location.replace("/#/register");
                    } else {
                        window.location.replace("/#/register");
                    }
                }
            }).catch(err => {
                if (err == 'cancel') {
                    window.location.replace("/#/");
                }
            })
        } else {
            // Toast(res.msg);
        }
        // return Promise.reject(res);
    } else if (res.code == 0) {
        if (res.msg == 'code已过期') {
            return;
        } else {
            Toast(res.msg);
            return;
        }
    }
}, (error) => { //这部分拦截服务器错误码
    let res = error.response;
    Toast(error);
    return Promise.reject(error);
});


function successfun(res) {//处理后台返回的非200错误
    // Toast(res.message);
    return res;
}
function errorfun(res) {
    Toast(res.message);
    return res;
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
    },

}

