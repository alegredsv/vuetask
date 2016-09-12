'use strict';

/**
 * Created by awichmann on 23/08/2016.
 */
window.billReceiveComponent = Vue.extend({
    components: {
        'menu-component': billReceiveMenuComponent
    },
    template: '\n           <style>\n        .centralizado {\n            margin: 0 auto;\n            float: none;\n        }\n        .statusRed {\n            color: red;\n        }\n        .statusGreen {\n            color: green;\n        }\n        .statusGray {\n            color: gray;\n        }\n    </style>\n            <div  class="container centralizado">\n\n            <h1 >{{ title }}</h1>\n              <h1 >{{ total | currency \'R$ \' }}</h1>\n            <h3  :class="{\'statusGray\':  bills.length == 0 ,\'statusRed\':(billCount > 0 && bills.length > 0), \'statusGreen\' : billCount <= 0 &&  bills.length > 0}">{{ status | totalLabel }}</h3>\n            <menu-component></menu-component>\n            <router-view></router-view>\n  \n                ',
    data: function data() {
        return {
            teste: '',
            title: "Contas a receber",
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: 0,
                receive: ''
            },
            billCount: 0,
            billTotalReceive: 0,
            total: 0,
            status: false

        };
    },

    /*    computed: {
            status: function () {
    
    
                var count = 0;
                var billListComponent =  this.$root.$children[0];
    
                for (var i in billListComponent.billsReceive) {
                    if (!billListComponent.billsReceive[i].done) {
                        count++;
                    }else{
                        this.billTotalReceive+=billListComponent.billsReceive[i].value;
                    }
                }
                this.billCount = count;
                return !count ? 'Nenhuma conta a pagar' : 'Existem ' + count + ' contas não recebidas';
            }
        }*/
    created: function created() {
        this.updateStatus();
        this.updateTotal();
    },

    methods: {
        caculateStatus: function caculateStatus(bills) {

            if (!bills.length) {
                this.status = false;
            }

            var count = 0;
            var billListComponent = this.$root.$children[0];

            for (var i in bills) {

                if (!bills[i].done) {

                    count++;
                }
            }
            this.status = count;
        },
        updateStatus: function updateStatus() {
            var _this = this;

            BillReceived.query().then(function (response) {
                _this.caculateStatus(response.data);
            });
        },
        updateTotal: function updateTotal() {
            var _this2 = this;

            BillReceived.total().then(function (response) {
                _this2.total = response.data.total;
            });
        }
    },
    events: {
        'change-info-receive': function changeInfoReceive() {
            this.updateStatus();
            this.updateTotal();
        }
    }
});