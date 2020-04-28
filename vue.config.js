module.exports = {
    
    devServer: {
        proxy: {
            '/api': {
                target: 'http://zuobei.400539.com/api.php/home',
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                }
            },
        }
    },
    lintOnSave: false,   //语法检查
    productionSourceMap: true,//隐藏js,隐私
    chainWebpack: (config) => {
        config.plugins.delete('prefetch');
    }
}