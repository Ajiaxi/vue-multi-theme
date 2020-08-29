const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const resolve = dir => require('path').join(__dirname, dir)
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'vue-multi-theme': resolve('src'),
      }
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          context: path.resolve(__dirname, `examples/themes`),
          from: {
            glob: '**/res/*',
            dot: true
          },
          to: `themes`,
          ignore: ['.*']
        },
      ])
    ]
  },
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  }
}