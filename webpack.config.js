var path = require('path')
var webpack = require('webpack')

var HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = [
  {
    entry: './src/js/game.js',
    mode: 'development',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: "bundle.js"
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: 'src/index.html', to: 'index.html' },
        { from: 'src/assets', to: 'assets' },
        { from: 'src/css', to: 'css' },
        { from: 'node_modules/phaser/dist/phaser.js', to: 'lib/phaser.js'}
      ])
    ],
    devServer: {
      contentBase: './dist'
    }
  }
]
