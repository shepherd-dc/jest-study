const path = require('path')
const webpack = require('webpack')
const eslintFriendlyFormatter = require('eslint-friendly-formatter')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  // context: path.resolve(__dirname, '../'), // 默认当前工作目录 process.cwd()
  entry: {
    myLib: path.resolve(__dirname, './src/index.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    // publicPath: path.resolve(__dirname, './public'),
    filename: '[name].js', // '[name]'为 entry中的 key
    library: '[name]',
    libraryTarget: 'umd',
    libraryExport: 'default' // 打包后全局变量不需要.default才能拿到
  },
  mode: 'development',
  // target: 'web', // 默认 web
  devtool: 'cheap-module-eval-source-map', // source-map
  // watch: true,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.js', '.ts', '.json']
    // mainFields: ['browser', 'module', 'main'], // target=web对应的默认值 browser
  },
  module: {
    // noParse控制哪些文件不解析
    noParse: /lodash/, // 使用正则表达式

    // // 使用函数，从 Webpack 3.0.0 开始支持
    // noParse: (content) => {
    //     // content 代表一个模块的文件路径
    //     // 返回 true or false
    //     return /jquery|lodash/.test(content);
    // },
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(__dirname, 'src')], // 指定检查的目录
        options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
          formatter: eslintFriendlyFormatter // 指定错误报告的格式规范
        }
      },
      {
        test: /\.js$/, // 条件匹配
        use: [ // 应用规则
          {
            loader: 'babel-loader',
            options: { // 单独配置在.babelrc
              // presets: [
              //   [
              //     '@babel/preset-env'
              // {
              //   useBuiltIns: 'usage',
              //   corejs: 3
              // }
              // ]
              // ]
            }
          }
        ],
        // enforce:'post' 代表把该 loader 的执行顺序放到最后
        // enforce:'pre'，代表把该 loader 的执行顺序放到最前
        enforce: 'post',
        // parser语法层面限制解析的模块
        parser: {
          // amd: false, // 禁用 AMD
          // commonjs: false, // 禁用 CommonJS
          // system: false, // 禁用 SystemJS
          // harmony: false, // 禁用 ES6 import/export
          // requireInclude: false, // 禁用 require.include
          // requireEnsure: false, // 禁用 require.ensure
          // requireContext: false, // 禁用 require.context
          // browserify: false, // 禁用 browserify
          // requireJs: false // 禁用 requirejs
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, './public'),
    port: 9000,
    hot: true,
    inline: true,
    progress: true,
    open: true
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, './public', 'index.html'), // 模板路径
      inject: 'head', // 自动注入js位置, 默认true('body')
      favicon: path.join(__dirname, './public', 'favicon.ico') // favicon图标
    }),
    // 添加热替换 HMR plugin
    new webpack.HotModuleReplacementPlugin()
  ]
}
