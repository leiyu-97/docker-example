const ExtractTextPlugin = require('extract-text-webpack-plugin')
const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/env', { targets: '> 0.25%, not dead' }], '@babel/react'],
              plugins: [
                // Stage 0
                '@babel/plugin-proposal-function-bind',

                // Stage 1
                '@babel/plugin-proposal-export-default-from',
                '@babel/plugin-proposal-logical-assignment-operators',
                ['@babel/plugin-proposal-optional-chaining', { loose: false }],
                ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
                ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
                '@babel/plugin-proposal-do-expressions',

                // Stage 2
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                '@babel/plugin-proposal-function-sent',
                '@babel/plugin-proposal-export-namespace-from',
                '@babel/plugin-proposal-numeric-separator',
                '@babel/plugin-proposal-throw-expressions',

                // Stage 3
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-syntax-import-meta',
                ['@babel/plugin-proposal-class-properties', { loose: false }],
                '@babel/plugin-proposal-json-strings',
              ],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                localIdentName: '[name]-[local]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [postcssPresetEnv({ stage: 0, browsers: '> 1%' })],
              },
            },
            'less-loader',
          ],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[local]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [postcssPresetEnv({ stage: 0, browsers: '> 1%' })],
              },
            },
            'less-loader',
          ],
        }),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'main.css',
      allChunks: true,
    }),
  ],
}
