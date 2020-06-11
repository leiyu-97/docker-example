const webpack = require('webpack')
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const config = require('./webpack.config')

const {
  BASE_API, PUBLIC_PATH, BRANCH, NODE_ENV,
} = process.env

module.exports = merge(
  config,
  {
    mode: 'development',

    entry: ['@babel/polyfill', path.resolve(__dirname, '../index.js')],

    output: {
      filename: '[name].[chunkhash:8].js',
      path: path.resolve(__dirname, '../dist'),
      publicPath: PUBLIC_PATH,
    },

    devtool: 'eval-source-map',

    plugins: [
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, '../index.test.html'),
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: `"${NODE_ENV}"`,
          BASE_API: `"${BASE_API}"`,
          BRANCH: `"${BRANCH}"`,
        },
      }),
    ],

    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
)
