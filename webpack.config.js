const webpack = require("webpack");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const ip = require('ip');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = (env) => {
    const isProduction = env==='production';
    return {

        entry: {
            index: './src/index.js',
        },
        target: "web",
        output: {
            path: path.resolve(__dirname + '/dist'),       //打包后的路径
            publicPath: '',
            filename: 'js/[name].js',
            chunkFilename: "chunk/[name].chunk.js",
        },
        mode: 'development',
        node: {
            __filename: true,
            __dirname: true
        },
        devtool: isProduction ? 'source-map':'inline-source-map',
        devServer:{
            inline: true, //设置为true，代码有变化，浏览器端刷新。
            open: true, //:在默认浏览器打开url(webpack-dev-server版本> 2.0)
            historyApiFallback: true, //回退:支持历史API。
            // host: ip.address(),//ip地址，同时也可以设置成是localhost,
            host: 'localhost',//ip地址，同时也可以设置成是localhost,
            progress: true, //让编译的输出内容带有进度和颜色
            contentBase: "./dist/", //本地服务器所加载的页面所在的目录
            port: 3430,
            historyApiFallback:true,
            publicPath:'/src/',
            proxy: {
                '*': {
                    target: 'http://127.0.0.1:3430', //跨域Ip地址
                    secure: false
                }
            },
        },
        resolve: {
            extensions: ['.js', '.less', '.css', '.vue', '.jsx'],//2.0的配置
        },
        externals: {
        },
        module: {
            rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
            }, {
                test: /\.js$/,
                include: path.join(__dirname,'/src'),
                exclude: path.resolve(__dirname, 'node_modules'),
                use:[
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ['react', 'es2015']
                        }
                    }
                ]
            }, {
                test: /\.xml$/,
                loader: "xml-loader"
            }, {
                test: /\.(css|less)$/,
                // loader: "style-loader!css-loader!less-loader"
                loader: "style-loader!css-loader"
            }, 
            {
                test: /\.(png|jpg|jpeg|gif|icon|webp)$/,
                // loader: 'url-loader?limit=8192&name=assets/img/[name].[hash:5].[ext]&context=${conf.paths.src}'
                loader: 'url-loader?limit=600000&name=assets/img/[name].[hash:5].[ext]&context=\"./\"'
            },
            {
                test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                loader: "file-loader?&name=assets/fonts/[name].[ext]"
            }, {
                test: /\.txt$/,
                loader: "text-loader"
            },{
                test: /\.jsx$/,
                exclude: /node_modules/,
                loaders: ['jsx-loader', 'babel-loader']
            }]
        },
        
    }
}




