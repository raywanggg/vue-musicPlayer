var webpack = require("webpack");
var path = require('path');
var publicPath = "/build/";
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var cssLoader = ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!postcss-loader");
// var cssLoader = ExtractTextPlugin.extract({
//     fallbackLoader: 'style-loader',
//     loader: [
//         {loader: 'css-loader', query: {sourceMap: true}},
//         {loader: 'postcss-loader'}
//     ]
// });
// var cssLoader = ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss-loader');


// 路由映射
var proxy = {
    "/songs": { target: "http://localhost:8087/api/v1"},
    "/lyrics": { target: "http://localhost:8087/api/v1"}
    // "/session*": { target: "http://python-china.org", host: "python-china.org", secure: false, changeOrigin: true }
};


module.exports = {
    entry: {
        app: "./src/index.js"
    },

    output: {
        path: path.join(__dirname, './build/'),
        // path: __dirname + '/build/',
        filename: 'app.js',
        publicPath: publicPath,
        devtoolModuleFilenameTemplate: function(info) {
            return info.resource;
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                postcss: [
                    require('postcss-import'),
                    require('postcss-url'),
                    require('postcss-mixins'),
                    require('postcss-nested'),
                    require('postcss-css-variables'),
                    require('autoprefixer')
                ]
            }
        }, {
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader',
                options: {
                    plugins: function() {
                        return [
                            require('postcss-import'),
                            require('postcss-url'),
                            require('postcss-mixins'),
                            require('postcss-nested'),
                            require('postcss-css-variables'),
                            require('autoprefixer')
                        ]
                    }
                }
            }]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015'],
                plugins: ['transform-runtime']
            }
        }, {
            test: /\.(jpg|png|gif)$/,
            loader: 'url-loader?limit=8192'
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'url-loader?limit=10000'
        }]

    },
    devServer: {
        historyApiFallback: true,
        host: '0.0.0.0',
        proxy: proxy,
        port: 8088
    },

    devtool: "source-map",
    // plugins: [
    //     new ExtractTextPlugin('app.css'),
    //     new webpack.LoaderOptionsPlugin({
    //         vue: {
    //             postcss: [require('postcss-cssnext')()]
    //         }
    //     })
    // ],
    resolve: {
        extensions: ['.js', '.vue', '.css'],
        alias: {
            vue: 'vue/dist/vue.js',
            style: path.resolve(__dirname, './css'),
            images: path.resolve(__dirname, './css/images'),
            fonts: path.resolve(__dirname, './css/fonts')
        }
    }
}
