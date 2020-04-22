module.exports = {
    publicPath: './m',
    devServer: {
        proxy: {
            '/vueapi': {
                target: '/api.php/home',
                changeOrigin: false,
                pathRewrite: {
                    '/vueapi': ''
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