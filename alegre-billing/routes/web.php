<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

use Illuminate\Support\Facades\Gate;

Route::get('/', function () {
//    if(Gate::allows('access-admin')){
//        return "Usuario com permissao de admin";
//    }else{
//        return "Usuario sem permissao de admin";
//    }
    return view('welcome');
})->middleware('can:access-admin');

Auth::routes();

Route::get('/home', 'HomeController@index');
