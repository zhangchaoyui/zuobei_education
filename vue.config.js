module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://mall-pre.springboot.cn',
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                }
            },
            //多个接口代理
            // '/api2': {
            //     target: 'http://www.baidu.com',
            // },

            // '/api3': {
            //     target: 'http://www.taobao.com',
            // }
        }
    },
    lintOnSave: true,   //语法检查
    productionSourceMap: false,//隐藏js,隐私
    chainWebpack: (config) => {
        config.plugins.delete('prefetch');
    }

}