'use strict';
// 开发环境
const path = require('path');
const webpack = require('webpack')

// 单入口
// module.exports = {
//     // 打包文件入口 可以是多入口（对象形式）也可以是单入口（字符串形式）
//     entry: './src/index.js',
//     // 打包文件输出  多入口 名字可以用占位符[name]代替
//     output: {
//         path: path.join(__dirname, 'dist'),
//         filename: 'bundle.js'
//     },
//     mode: 'production',
// };

// 多入口
module.exports = {
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    mode: 'development',
    module: {
        rules: [
            // 解析js
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            // 解析css
            {
                test: /.css$/,
                use: [
                    // 注意先后顺序
                    'style-loader',
                    'css-loader'
                ]
            },
            // 解析less (sass类似)
            {
                test: /.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            // 使用file-loader
            // // 解析图片
            // {
            //     test:/.(png|jpg|git|jpeg)$/,
            //     use:'file-loader'
            // },
            // 使用url-loader
            // 解析图片
            {
                test: /.(png|jpg|git|jpeg)$/,
                use: [
                    {
                        loader:'url-loader',
                        options:{
                            limit:10240
                        }
                    }
                ]
            },
            // 解析字体
            {
                test:/.(woff|woff2|eot|ttf|otf)$/,
                use:'file-loader'
            },
        ]
    },
    // 热更新
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        contentBase:'./dist',
        hot:true
    }
}

