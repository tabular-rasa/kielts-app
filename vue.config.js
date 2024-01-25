const { defineConfig } = require('@vue/cli-service')
// 定义webpack变量
const webpack = require("webpack")
module.exports = defineConfig({
  transpileDependencies: true,
  // 就是下面的配置搞上就行了
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery",
        "windows.$": "jquery",
        Popper: ["popper.js", "default"]
      })
    ]
  },
  devServer: {
    proxy: {
      '/api': {             // /api表示拦截以/api开头的请求
        target: 'http://127.0.0.1:8080',    //跨域的域名
        changeOrigin: true, //是否开启跨域
        pathRewrite: {      //重写路径
          '^/api': ''       //把/api变为空字符
        }
      }
    },
    port: 8060
  }
})
