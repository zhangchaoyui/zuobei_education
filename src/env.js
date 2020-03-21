let baseURL;
//process.env.NODE_ENV获取当前进程环境变量,属于webpack
switch (process.env.NODE_ENV) {
    case "development":
        baseURL = "http://dev-mall-pre.springboot.cn/api"//开发网址
        break;
    case "production":
        baseURL = "http://dev-mall-pre.springboot.cn/api"//测试网址
        break;
    default:
        baseURL = "http://dev-mall-pre.springboot.cn/api"//线上网址
        break;
}
export default {
    baseURL
}