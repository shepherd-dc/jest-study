module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    browser: true,
    jest: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018
  },
  plugins: [
    'html'
  ],
  rules: {
  }
}
