
module.exports = {
  configureWebpack: {
    entry: './src/index.js'
  },
  devServer: {
    port: 8080,
    proxy: {
      // 配置跨域
      '': {
        target: 'http://127.0.0.1:3999',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
}