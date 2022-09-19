const { defineConfig } = require('@vue/cli-service')
const path = require('path')

const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  //方式一：直接通过CLI提供给我们的选项来配置：
  outputDir: './build',
  lintOnSave: false,

  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000', //映射
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  //方式二：通过configureWebpack修改webpack的配置：
  configureWebpack: {
    resolve: {
      alias: {
        views: '@/components'
      }
    }
  },
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     views: '@/views'
  //   }
  // },
  //方式三：通过chainWebpack修改webpack的配置：
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('views', '@/views')
  // },
  // eslint-disable-next-line no-dupe-keys
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },
  transpileDependencies: true
})
