'use strict';

/**
 * Created by awichmann on 23/08/2016.
 */
window.billPayComponent = Vue.extend({

    template: '\n<!--            <style>\n        .centralizado {\n            margin: 0 auto;\n            float: none;\n        }\n        .statusRed {\n            color: red;\n        }\n        .statusGreen {\n            color: green;\n        }\n        .statusGray {\n            color: gray;\n        }\n    </style>-->\n             <div class="section">\n          \n               <div class="container">\n                <h4 >{{ title }}</h4>\n                <div class="row">\n                    <div class="col s7">\n                        <div class="card z-depth-2" :class="{\'grey\':  status ===false, \'green\': status === 0, \'red\':status >0 }">\n                            <div class="card-content white-text">\n                                 <p class="card-title">\n                                     <i class="material-icons">account_balance</i>\n                                    </p>\n                                 <h5>{{ status | totalLabel }}</h5>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="col s5">\n                         <div class="card z-depth-2" >\n                            <div class="card-content">\n                                 <p class="card-title">\n                                     <i class="material-icons">payment</i>\n                                    </p>\n                                 <h5>{{ total | numberFormat }}</h5>\n                            </div>\n                        </div>\n                    </div>\n                \n             \n                        </div>\n                    </div> \n                </div>\n             </div>\n               <div class="divider"></div>\n                <router-view></router-view>\n               <!-- <div v-show="activedView == 0" class="col-xs-12 col-md-8">\n                        <bill-list-component v-ref:bill-list-component></bill-list-component>\n                </div>\n                <div v-show="activedView == 1" class="col-xs-12 col-md-8">\n                <bill-create-component :bill.sync="bill" ></bill-create-component>\n                </div>\n                </div>-->\n                ',

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
            var _this = this;

            Bill.query().then(function (response) {
                _this.caculateStatus(response.data);
            });
        },
        updateTotal: function updateTotal() {
            var _this2 = this;

            Bill.total().then(function (response) {
                _this2.total = response.data.total;
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