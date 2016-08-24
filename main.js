/**
 * Created by joeramone on 10/08/2016.
 */
// Vue.component("app-component", appComponent);
// var app = new Vue({
//     el: "#app"
// });
var mainComponent  = Vue.extend({
    components:{
        'bill-component' : billComponent
    },
    template:'<bill-component></bill-component>',
    data:function () {
        return{
            billsPay:[{date_due:'20/08/2016', name: 'Conta de luz', value:127.99,done:1},
                {date_due:'21/08/2016', name: 'Conta de água', value:40.99,done:0},
                {date_due:'22/08/2016', name: 'Conta de telefone', value:55.99,done:0},
                {date_due:'23/08/2016', name: 'Supermercado', value:625.99,done:0},
                {date_due:'24/08/2016', name: 'Cartão de crédito', value:1200.99,done:0},
                {date_due:'25/08/2016', name: 'Empréstimo', value:25.99,done:1},
                {date_due:'26/08/2016', name: 'Gasolina', value:155.99,done:0}]

        };

    }
});

var router = new VueRouter();

router.map({
    '/bill-pays':{
        component: billPayComponent,
        subRoutes:{
            '/':{
                name:'bill-pay.list',
                component:billPayListComponent
            },
            '/create':{
                name:'bill-pay.create',
                component: billPayCreateComponent
            },
             '/:index/update':{
                 name:'bill-pay.update',
                 component: billPayCreateComponent
             }
        }

    },
    '/bill-receives':{
        name: 'bill-receive',
        component: billReceiveComponent


    },


    '*':{
        component: billPayListComponent
    }
});
router.start({
    components:{
        'main-component': mainComponent
    }
}, "#app");

router.redirect({
   '*': '/bill-pays'
});
