'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by joeramone on 10/08/2016.
 */
// Vue.component("app-component", appComponent);
// var app = new Vue({
//     el: "#app"
// });
/*var mainComponent  = Vue.extend({
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
                {date_due:'26/08/2016', name: 'Gasolina', value:155.99,done:0}],
          billsReceive:[{date_due:'20/08/2016', name: 'Sicred', value:127.99,done:1, service:"Suporte técnico"},
                {date_due:'21/08/2016', name: 'HSBC', value:40.99,done:0, service:"Recuperação de HD"},
                {date_due:'22/08/2016', name: 'Banrisul', value:56.99,done:0, service:"Instalação de software"},
                {date_due:'23/08/2016', name: 'Bradesco', value:677.99,done:0, service:"Visita técnica"},
                {date_due:'24/08/2016', name: 'Cartão de crédito', value:1250.99,done:0, service:"Criação de site"},
                {date_due:'25/08/2016', name: 'Itaú', value:62.99,done:1, service:"Customização"},
                {date_due:'26/08/2016', name: 'Vivo', value:888.99,done:0, service:"Configuração de servidor"}]
        };
    }
});*/

var router = new VueRouter();

router.map({
    '/bill-pays': {
        component: billPayComponent,
        subRoutes: {
            '/': {
                name: 'bill-pay.list',
                component: billPayListComponent
            },
            '/create': {
                name: 'bill-pay.create',
                component: billPayCreateComponent
            },
            '/:id/update': {
                name: 'bill-pay.update',
                component: billPayCreateComponent
            }
        }

    },
    '/': {
        name: 'dashboard',
        component: dashboardComponent
    },
    '/bill-receives': {
        name: 'bill-receive',
        component: billReceiveComponent,
        subRoutes: {
            '/': {
                name: 'bill-receive.list',
                component: billReceiveListComponent
            },
            '/create': {
                name: 'bill-receive.create',
                component: billReceiveCreateComponent
            },
            '/:id/update': {
                name: 'bill-receive.update',
                component: billReceiveCreateComponent
            }
        }

    },

    '*': {
        component: billReceiveListComponent
    }
});
router.start({
    components: {
        'bill-component': billComponent
    }
}, "#app");

router.redirect({
    '*': '/bill-receive'
});

var BillPay = function () {
    function BillPay(id, name) {
        _classCallCheck(this, BillPay);

        this._id = id;
        this._name = name;
    }

    _createClass(BillPay, [{
        key: 'showVariables',
        value: function showVariables() {
            var texto = arguments.length <= 0 || arguments[0] === undefined ? "MENUNANAN" : arguments[0];

            console.log(this.id);
            console.log(this.name);
            console.log(texto);
        }
    }, {
        key: 'id',
        get: function get() {
            return this._id;
        },
        set: function set(id) {
            this._id = id;
        }
    }, {
        key: 'name',
        get: function get() {
            return this._name;
        },
        set: function set(name) {
            this._name = name;
        }
    }]);

    return BillPay;
}();

var Bill = new BillPay(1, 'Supermercado');
console.log(Bill);
Bill.id = 1000;
Bill.name = 'Fatura cartao';
console.log(Bill.id);
console.log(Bill.name);
//Bill.showVariables();