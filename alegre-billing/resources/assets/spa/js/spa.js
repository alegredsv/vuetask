import LocalStorage from './services/localStorage';
require('materialize-css');
window.Vue = require('vue');
require('vue-resource');
Vue.http.options.root="http://192.168.10.10:8000/api";
require('./router');