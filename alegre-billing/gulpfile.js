const gulp = require('gulp');
const elixir = require('laravel-elixir');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');
const webpackDevConfig = require('./webpack.dev.config');
const mergeWebpack = require('webpack-merge');
const env = require('gulp-env');
env({
    file: './.env',
    type: 'ini'
});
console.log(process.env.QUEUE_DRIVER);
//require('laravel-elixir-vue');
//require('laravel-elixir-webpack-official');
// Elixir.webpack.config.module.loader = [];
//
// Elixir.webpack.mergeConfig(webpackConfig);
// Elixir.webpack.mergeConfig(webpackDevConfig);

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */
gulp.task('webpack-dev-server',() =>{
    let config = mergeWebpack(webpackConfig,webpackDevConfig);
    let inlineHot=[
       'webpack-dev-server/client?http://192.168.10.10:8080/',
       'webpack/hot/only-dev-server'
    ];
    config.entry.admin = [config.entry.admin].concat(inlineHot);
    config.entry.spa = [config.entry.spa].concat(inlineHot);
    new WebpackDevServer(webpack(config),{
        hot:true,
        proxy:{
            '*': 'http://192.168.10.10:8000'
        },
        watchOptions:{
            poll:true,
            aggregateTimeout:3000
        },
        publicPath: config.output.publicPath,
        noInfo:true,
        stats:{colors:true}
    }).listen(8080,"0.0.0.0",() => {
       console.log("BUNDLING PROJECT...")
    });
});
elixir(mix => {
    mix.sass('./resources/assets/admin/sass/admin.scss')
        .sass('./resources/assets/spa/sass/spa.scss')
        .copy('./node_modules/materialize-css/fonts/roboto','./public/fonts/roboto');
     //  .webpack('admin.js');
    gulp.start('webpack-dev-server');
    mix.browserSync({
        host: '0.0.0.0',
        proxy: 'http://192.168.10.10:8080'
    });
});