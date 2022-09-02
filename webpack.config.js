/* eslint-disable */

const path = require('path')

const DIR_DIST = path.resolve(__dirname, 'dist')
const DIR_SRC = path.resolve(__dirname, 'src')
const DIR_NODE_MODULES = path.resolve(__dirname, 'node_modules')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.resolve(DIR_SRC, 'index.js'),

    output: {
        clean: true,
        path: DIR_DIST,
        filename: '[name].bundle.js',
    },

    resolve: {
        modules: ['node_modules', './src'],
        extensions: ['.js', '.jsx'],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'Wait App',
        }),
    ],

    devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 8080,
      },

    module: {
        rules: [
            {
                test: /.(jsx|js)$/,
                include: DIR_SRC,
                exclude: DIR_NODE_MODULES,
                use: [
                    { loader: 'babel-loader' },
                ],
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' },
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
