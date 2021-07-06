const path = require('path')
module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/common/style/mixin.less")]
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'service': '@/service',
        'views': '@/views',
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ?
    './' : '/',
    productionSourceMap: false,
}