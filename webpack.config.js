/* eslint-disable */

const path = require('path')

const DIR_DIST = path.resolve(__dirname, 'dist')
const DIR_SRC = path.resolve(__dirname, 'src')
const DIR_PUBLIC = path.resolve(__dirname, 'public')
const DIR_NODE_MODULES = path.resolve(__dirname, 'node_modules')

const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(DIR_SRC, 'index.tsx'),

  resolve: {
    modules: [DIR_NODE_MODULES, DIR_SRC],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
  },

  output: {
    clean: true,
    path: DIR_DIST,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Wait App',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '_redirects'),
          to: '.'
        },
      ],
    }),
  ],

  devServer: {
    compress: true,
    historyApiFallback: true,
    port: 8080,
    static: {
      directory: DIR_PUBLIC
    },
  },

  module: {
    rules: [
      {
        test: /.(jsx|js)$/,
        include: [DIR_SRC, path.resolve(DIR_NODE_MODULES, '@uncover')],
        exclude: DIR_NODE_MODULES,
        use: [
          { loader: 'babel-loader' },
        ],
      },
      {
        test: /\.tsx?$/,
        include: [DIR_SRC, path.resolve(DIR_NODE_MODULES, '@uncover')],
        exclude: DIR_NODE_MODULES,
        use: [
          { loader: 'ts-loader' },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: {
            url: {
              filter: (url, resourcePath) => {
                // Don't handle `images` urls
                if (url.includes('images/')) {
                  return false;
                }
                return true;
              },
            },
          } },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext][query]'
        },
      },
      {
        test: /\.(mp3|flac)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'sound/[name][ext][query]'
        }
      },
      {
        test: /\.(_redirects)$/i,
        type: 'asset/resource',
      },
    ],
  },
}
