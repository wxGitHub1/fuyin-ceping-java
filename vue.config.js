'use strict'
module.exports = {
    publicPath: './',
    outputDir: 'dist', // 打包的目录
    lintOnSave: true, // 在保存时校验格式
    productionSourceMap: false, // 生产环境是否生成 SourceMap
    devServer:{
      open: false, // 启动服务后是否打开浏览器
      host: '0.0.0.0',
      port: 8089, // 服务端口
    },
}