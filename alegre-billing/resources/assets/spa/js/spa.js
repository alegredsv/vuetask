require('materialize-css');
window.Vue = require('vue');
require('vue-resource');
require('./router');

Vue.http.options.root="http://192.168.10.10:8000/api";