/* eslint-disable */

const path = require('path')

const { merge } = require('webpack-merge')
const common = require('./webpack.config.common.js')

module.exports = merge(common, {
  mode: 'development',

  devtool: 'source-map',

  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    disableHostCheck: true
  },

  resolve: {
    alias: {
      // Needed when library is linked via `npm link` to app
      react: path.resolve('./node_modules/react')
    },
  },
})
