"use strict";

/**
 * Created by awichmann on 23/08/2016.
 */
window.dashboardComponent = Vue.extend({
    /* components:{
        'menu-component': billReceiveMenuComponent
     },*/
    template: "\n           <style>\n        .centralizado {\n            margin: 0 auto;\n            float: none;\n        }\n        .statusRed {\n            color: red;\n        }\n        .statusGreen {\n            color: green;\n        }\n        .statusGray {\n            color: gray;\n        }\n    </style>\n            <div  class=\"container centralizado\">\n\n                <h1 >{{ title }}</h1>\n                   <h3 style=\"color: red\" >Total de contas a pagar: {{ vlPay }}</h3>\n                   <h3 style=\"color: green\" >Total de contas a receber: {{ vlReceive }}</h3>\n                    <h2 style=\"color: blue\">SALDO : {{vlReceive - vlPay}}</h2>\n                ",
    data: function data() {
        return {
            title: "Dashboard",
            billCount: 0,
            billTotalReceive: 0,
            billTotalPay: 0
        };
    },
    computed: {
        vlPay: function vlPay() {
            var count = 0;
            var billListComponent = this.$root.$children[0];

            for (var i in billListComponent.billsPay) {
                if (!billListComponent.billsPay[i].done) {
                    this.billTotalPay += billListComponent.billsPay[i].value;
                    count++;
                }
            }
            this.billCount = count;
            self = this;
            Bill.total().then(function (response) {
                self.billTotalPay = response.data.total;
            });
            return self.billTotalPay;
            //return this.billTotalPay;
        },
        vlReceive: function vlReceive() {

            var count = 0;
            var billListComponent = this.$root.$children[0];

            for (var i in billListComponent.billsReceive) {
                if (!billListComponent.billsReceive[i].done) {
                    this.billTotalReceive += billListComponent.billsReceive[i].value;
                    count++;
                }
            }
            this.billCount = count;

            self = this;
            BillReceived.total().then(function (response) {
                self.billTotalReceive = response.data.total;
            });
            return self.billTotalReceive;
        }
    }
});