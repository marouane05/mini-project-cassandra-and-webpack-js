'use strict';

const Webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildDirectory = path.join(__dirname, 'build');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/app.js',

  },
  output: {
    filename: 'app.js',
    path: buildDirectory,
  
  },
  devtool: false,
  devServer: {
    static: buildDirectory,
    port: process.env.PORT || 3000,
    proxy: {
      '/api': {
         target: {
            host: "localhost",
            protocol: 'http:',
            port: 8000
         },
         pathRewrite: {
            '^/api': ''
         }
      }
   }
   
  },
  
  stats: {
    colors: true,
    reasons: true
  },

  plugins: [
    new HtmlWebpackPlugin({template: 'src/assets/studentpage.html'}),
    
  ],

  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|ico|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
};

