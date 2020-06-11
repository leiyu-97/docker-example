const path = require('path')

module.exports = {
  extends: ['airbnb'],
  parser: 'babel-eslint',
  rules: {
    'no-param-reassign': [2, { props: false }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/destructuring-assignment': 0,
    semi: [1, 'never'],
    'react/prefer-stateless-function': 'off',
    'import/no-extraneous-dependencies': [
      1,
      {
        devDependencies: [path.resolve(__dirname, './build/*')],
      },
    ],
    'no-nested-ternary': 0,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['withControllable', path.resolve(__dirname, './src')]],
        extensions: ['.js'],
      },
    },
  },
  env: {
    browser: true,
  },
}
