const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './js/index.js',
  output: {
    filename: 'bundle[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: 3000,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src/js'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/images'),
          to: path.resolve(__dirname, './dist/images')
        }
      ]
    })
  ]
}