const webpack = require('webpack')
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const config = require('./webpack.config')

const { BRANCH, NODE_ENV } = process.env

module.exports = merge(
  config,
  {
    mode: 'development',

    entry: ['@babel/polyfill', path.resolve(__dirname, '../index.js')],

    output: {
      filename: '[name].[chunkhash:8].js',
      path: path.resolve(__dirname, '../dist'),
      publicPath: BRANCH ? `/${BRANCH}/` : '/',
    },

    devtool: 'eval-source-map',

    plugins: [
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, '../index.test.html'),
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: `"${NODE_ENV}"`,
          BASE_API: '"/api"',
        },
      }),
    ],

    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },

    devServer: {
      contentBase: [path.resolve(__dirname, '../static')],
      compress: false,
      port: 8868,
      inline: true,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:7000/',
          changeOrigin: true,
        },
      },
    },
  },
)
