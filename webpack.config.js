
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
    devServer:{
        progress:true,
        contentBase:'build',
        stats:{colors:true},
        inline:true,
        publicPath:'/static/',
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