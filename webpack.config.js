const webpack=require("webpack");
const htmlWebpackPlugin=require("html-webpack-plugin");  //自动将js插入html文件
const path=require("path");
const resolveUrl=(url)=>path.join(process.cwd(),url)
const vueloaderlibplugin=require("vue-loader/lib/plugin") //加载 .vue 文件必须引入
module.exports={
     mode:"development",//模式  development 开发模式  production  生产模式
    entry:{
        path:__dirname+"/src/main.js" //入口
    },
    output:{
        path:__dirname+"/dist",   //出口
        filename:"[name].js"
    },
    resolve:{
        alias:{  //配置路径
            "vue$":"vue/dist/vue.esm.js",
            "com":resolveUrl("src/components"),
            "views":resolveUrl("src/containers"),
            "router":resolveUrl("src/router"),
            "common":resolveUrl("src/common")
        },
        extensions:[".js",".vue"]   //省略后缀
    },
    externals:{   //配置别名
        "jquery":"$"
    },
    module:{    //加载规则
       rules:[
        {
            test:/\.vue$/,   //加载vue   下载 vue-style-loader  vue  vue-template-compiler 
            loader:["vue-loader"]
        },
        {
           test:/\.css$/,   //加载css   下载 style-loader  css-loader 
           loader:["vue-style-loader","css-loader"]
       },
       {
        test:/\.scss$/,   //加载scss   下载 style-loader  css-loader sass-loader
        loader:["vue-style-loader","css-loader","sass-loader"]
    },
    {
        test:/\.(png|jpg|gif|)$/,  //加载图片   下载 url-loader
        loader:["url-loader"]
    },
    {
        test:/\.(ttf|woff|svg|eot)$/,//加载icon   下载 url-loader
        loader:["url-loader"]
    },
    {
        test:/\.js$/,//加载js   下载 babel-loader @babel/core  @babel/preset-env
        exclude: /(node_modules|bower_components)/,  //不加载的文件
        loader:["babel-loader"]
    },
   
]
    },
    devServer:{  //起服务  下载  webpack-dev-server
        open:true,  //自动打开浏览器
        port:8080,  //端口号
        hot:true, //热启动
        host:"localhost" //域名

    },
    plugins:[  //插件
        new webpack.HotModuleReplacementPlugin(), //热更新  不需下载  webpack自带
        new vueloaderlibplugin(),  //加载.vue文件  实例
        new htmlWebpackPlugin({
            inject:true,  //inject 默认注入body中  true  false  head  body
            filename:"index.html", //html文件名
            template:__dirname+"/public/index.html"   //文件  路径        
        })
    ]
}



//.babelrc  文件配置
//{
//   "presets":["@babel/preset-env"]
//}