'use strict';
// 生产环境
const path = require('path');
// 把生成css单文件插件（默认是放在header里面）
const MiniCssExtracrPlugin = require('mini-css-extract-plugin');
// css压缩插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// html压缩
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
        filename: '[name]_[chunkhash:8].js'
    },
    mode: 'production',
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
                    // 'style-loader', // 把css样式放header里面
                    MiniCssExtracrPlugin.loader, // 把css样式生成单文件
                    'css-loader'
                ]
            },
            // 解析less (sass类似)
            {
                test: /.less$/,
                use: [
                    // 'style-loader', // 把css样式放header里面
                    MiniCssExtracrPlugin.loader, // 把css样式生成单文件 与‘style-loader’ 冲突
                    'css-loader',
                    'less-loader'
                ]
            },
            // 使用file-loader
            // 解析图片
            {
                test:/.(png|jpg|git|jpeg)$/,
                use:[{
                    loader:'file-loader',
                    options:{
                        name: '[name]_[hash:8].[ext]'
                    }
                }]
            },
            // 使用url-loader
            // 解析图片
            // {
            //     test: /.(png|jpg|git|jpeg)$/,
            //     use: [
            //         {
            //             loader:'url-loader',
            //             options:{
            //                 limit:10240
            //             }
            //         }
            //     ]
            // },
            // 解析字体
            {
                test:/.(woff|woff2|eot|ttf|otf)$/,
                use:[{
                    loader:'file-loader',
                    options:{
                        name: '[name]_[hash:8].[ext]'
                    }
                }]
            }
        ]
    },
    plugins:[
        // 将css生成单文件插件
        new MiniCssExtracrPlugin({
            filename:"[name]_[contenthash:8].css",
        }),
        // 压缩css文件
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor:require('cssnano')
        }),
        // index.html压缩
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'src/index.html'),
            filename: 'index.html',
            chunks: ['index'],
            inject: true,
            minify: {
                html5:true,
                collapseWhitespace:true,
                preserveLineBreaks:false,
                minifyCSS:true,
                minifyJS:true,
                removeComments:false
            }
        }),
        // index.html压缩
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'src/search.html'),
            filename: 'search.html',
            chunks: ['search'],
            inject: true,
            minify: {
                html5:true,
                collapseWhitespace:true,
                preserveLineBreaks:false,
                minifyCSS:true,
                minifyJS:true,
                removeComments:false
            }
        })
    ]
};

