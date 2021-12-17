const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  configureWebpack: {
    entry: './src/main.js',
    module: {},
  },
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src')).end()
      // 需要重启 IDE
      //.set('styles',resolve('src/assets/styles'))
      // 这里只写了两个个，你可以自己再加，按这种格式.set('', resolve(''))
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
