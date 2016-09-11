'use strict';

/**
 * Created by awichmann on 23/08/2016.
 */
window.billPayComponent = Vue.extend({
    components: {
        'menu-component': billPayMenuComponent
    },
    template: '\n            <style>\n        .centralizado {\n            margin: 0 auto;\n            float: none;\n        }\n        .statusRed {\n            color: red;\n        }\n        .statusGreen {\n            color: green;\n        }\n        .statusGray {\n            color: gray;\n        }\n    </style>\n            <div  class="container centralizado">\n\n                <h1 >{{ title }}</h1>\n                <h3>{{ total | currency \'R$ \'}}</h3>\n                <h3  :class="{\'statusGray\':  bills.length == 0 ,\'statusRed\':(status > 0 && bills.length > 0), \'statusGreen\' : status <= 0 &&  bills.length > 0}">{{ status | totalLabel}}</h3>\n                <menu-component></menu-component>\n                <router-view></router-view>\n               <!-- <div v-show="activedView == 0" class="col-xs-12 col-md-8">\n                        <bill-list-component v-ref:bill-list-component></bill-list-component>\n                </div>\n                <div v-show="activedView == 1" class="col-xs-12 col-md-8">\n                <bill-create-component :bill.sync="bill" ></bill-create-component>\n                </div>\n                </div>-->\n                ',

    data: function data() {
        return {
            teste: '',
            title: "Contas a pagar",
            status: false,
            billCount: 0,

            total: 0

        };
    },
    /* computed: {
         status: function () {
    
             var count = 0;
             var billListComponent =  this.$root.$children[0];
               for (var i in billListComponent.billsPay) {
                 if (!billListComponent.billsPay[i].done) {
                     count++;
                 }
             }
             this.billCount = count;
             return !count ? 'Nenhuma conta a pagar' : 'Existem ' + count + ' contas a pagar';
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
            var self = this;
            Bill.query().then(function (response) {
                self.caculateStatus(response.data);
            });
        },
        updateTotal: function updateTotal() {
            var self = this;
            Bill.total().then(function (response) {
                self.total = response.data.total;
            });
        }

    },
    events: {
        'change-info': function changeInfo() {
            this.updateStatus();
            this.updateTotal();
        }
    }
});