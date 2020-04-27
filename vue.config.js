module.exports = {
    publicPath: './m',
    devServer: {
        proxy: {
            '/vapi': {
                target: '/api.php/home',
                changeOrigin: true,
                pathRewrite: {
                    '/vapi': ''
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