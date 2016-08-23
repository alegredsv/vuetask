/**
 * Created by joeramone on 10/08/2016.
 */
// Vue.component("app-component", appComponent);
// var app = new Vue({
//     el: "#app"
// });

var router = new VueRouter();

router.map({
    '/bills':{
        component:billListComponent
    },
    '/bill/create':{
        component: billCreateComponent
    }

});

router.start({
    components:{
        'app-component': appComponent
    }
}, "#app");