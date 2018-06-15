const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/main.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: [
                { loader: "vue-loader" }
            ]
        },{
            test: /\.css$/,
            use: [
            'style-loader',
            'css-loader'
            ]
        },{
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader'
            ]
        },{
            test: /\.(csv|tsv)$/,
            use: [
                'csv-loader'
            ]
        },
        {
            test: /\.xml$/,
            use: [
                'xml-loader'
            ]
        }]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(['dist/*.bundle.js']),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            inject: true
        }),
        new CopyWebpackPlugin([
            {
                from: './asset',
                to: './'
            }
        ]),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    }
    
};