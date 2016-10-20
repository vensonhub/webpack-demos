
function rewriteUrl(replacePath) {
    return function (req, opt) {
        var queryIndex = req.url.indexOf('?');
        var query = queryIndex >= 0 ? req.url.substr(queryIndex) : "";

        req.url = req.path.replace(opt.path, replacePath) + query;
        console.log("rewriting ", req.originalUrl, req.url);
    };
}


module.exports = {
    entry:'./src/index.js',
    //entry:{
    //    index:'./src/index.js',
    //    comp:"./src/component.js"
    //},
    output:{
        path:'./build',
        publicPath: "/static/",
        filename:'bundle.js'
        //filename:'[name].js'
    },
    module:{
        //noParse:[],
        loaders:[
            {
                test:/\.js$/,
                loader:'babel',
                //loaders:[],
                //include:'/node_modules',
                exclude:'/node_modules',
            }
        ]
    },
    resolve:{
        extension:['','.js','.jsx','.css'],
        alias:{}
    },
    devServer:{
        publicPath: "/static/",
        stats: { colors: true },
        port: 8080,
        contentBase: 'build',
        inline: true,
        proxy: [
            {
                path: /^\/api\/(.*)/,
                target: "http://localhost:8080/",
                rewrite: rewriteUrl('/$1\.json'),
                changeOrigin: true
            }
        ]
    }
}


