var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './blog'),
    publicPath: '/blog/',
    // filename: 'build.js',
    filename: 'build.js'
    // chunkFilename:"js/[name].js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              loader: 'css-loader!postcss-loader',
              fallbackLoader: 'vue-style-loader'
            }),
            less: ExtractTextPlugin.extract({
              loader: 'css-loader!postcss-loader!less-loader',
              fallbackLoader: 'vue-style-loader'
            })
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(mp3)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: 'assets/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        loader: 'url-loader',
        query: {
          limit: 1000,
          name: 'images/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        loader: 'url-loader',
        query: {
          limit: 1000,
          name: 'fonts/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
        /*ExtractTextPlugin.extract({
                 fallbackLoader: "style-loader",
                 loader: "css-loader!postcss-loader"
                 })*/
      }
    ]
  },
  plugins: [
    // new ExtractTextPlugin("css/style.css"),

    new ExtractTextPlugin('css/style.css'),
    new HtmlWebpackPlugin({
      hash: true,
      template: 'index-build.html',
      title: 'Hello丶Jinx'
    })
    // new webpack.optimize.CommonsChunkPlugin({name:'index2',filename:'js/index2.js'})
  ],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.common.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    host: '192.168.3.10',
    port: 8077
    // historyApiFallback: true,
    // hot: true ,
    // host:'192.168.0.137',
    // inline: true,
    // progress: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      // sourceMap: true,
      compress: {
        warnings: false,
        drop_console: true,
        pure_funcs: ['console.log']
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
