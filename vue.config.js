module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://192.168.2.146/api.php/home/',
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                }
            },
        }
    },
    lintOnSave: true,   //语法检查
    productionSourceMap: false,//隐藏js,隐私
    chainWebpack: (config) => {
        config.plugins.delete('prefetch');
    }

}