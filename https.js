export default{
    // https://blog.csdn.net/weixin_41952198/article/details/86080577
    post(url,data){//post请求
        return axios({
            method:'post',
            baseURL:localhosts,
            url,
            data: data,
            withCredentials: true,
            timeout:5000,//响应时间
        }).then(res => {
            return successfun(res)
        },err => {
            return errorfun(err);
        })
    },
    get(url,params){//get请求
        return axios({
            method:'get',
            baseURL:localhosts,
            url,
            params,
            withCredentials: true,
            timeout:5000,
        }).then(res => {
            return successfun(res)
        },err => {
            return errorfun(err)
        })
    }

   
}
