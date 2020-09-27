const path = require('path')
const resolve = dir => {
    return path.join(__dirname, dir)
}
const BASE_URL = '/'
module.exports={
    // publicPath: process.env.NODE_ENV === "production" ? "/bce" : BASE_URL,
    publicPath:"./",  // 可以设置成相对路径，这样所有的资源都会被链接为相对路径，打出来的包可以被部署在任意路径
    outputDir:"dist",  //打包时生成的生产环境构建文件的目录
    assetsDir: 'public', 
    lintOnSave: true,
    productionSourceMap: true,
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
            .set('_c', resolve('src/components'))
    },
    devServer: {
        // proxy: 'localhost:3000'
        port: 8085,
        open: true
    }
}