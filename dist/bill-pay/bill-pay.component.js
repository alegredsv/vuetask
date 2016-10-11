'use strict';

/**
 * Created by awichmann on 23/08/2016.
 */
window.billPayComponent = Vue.extend({
    components: {
        'menu-component': billPayMenuComponent
    },
    template: '\n            <style>\n        .centralizado {\n            margin: 0 auto;\n            float: none;\n        }\n        .statusRed {\n            color: red;\n        }\n        .statusGreen {\n            color: green;\n        }\n        .statusGray {\n            color: gray;\n        }\n    </style>\n             <div class="section">\n          \n               <div class="container">\n                <h1 >{{ title }}</h1>\n                <h3  :class="{\'statusGray\':  bills.length == 0 ,\'statusRed\':(status > 0 && bills.length > 0), \'statusGreen\' : status <= 0 &&  bills.length > 0}">{{ status | totalLabel}}</h3>\n                <div class="row">\n                      <div class="col s5 offset-s7 offset-m4 z-depth-2 blue darken-4">\n                             <h3>{{ total | numberFormat }}</h3><i class="material-icons large blue-text text-darken-3">add_circle</i>\n                      </div>\n                      <button class="btn yellow waves-effect waves-dark purple-text">\n                      <i class="material-icons left ">add_circle</i>Meu botão</button>\n                      <a class="btn">Minha ancora</a>\n                      \n                      <button class="btn-floating btn-large waves-effect waves-dark purple-text"><i class="material-icons left">add</i></button>\n                </div>\n                   <div class="row">\n                   \n                    <div class="col s4">\n                            <div class="card blue z-depth-5">\n                                <div class="card-content">\n                                <p class="card-title">Meu titulo</p>\n                                <p >Conteudo do cartao</p>\n                                </div>\n                                  <div class="card-action">\n                                 <a href="#">aNCORA</a>\n                            </div>\n                        </div>\n                    </div> \n                          <div class="col s4">\n                            <div class="card-panel blue z-depth-5">\n                                \n                                <p >Conteudo do cartao</p>\n                                \n                        </div>\n                    </div> \n                    \n                    \n                             \n                    <div class="col s4">\n                            <div class="card yellow">\n                            <div class="card-image">\n                                    <img src="https://thenypost.files.wordpress.com/2016/04/85517981.jpg?quality=90&strip=all&w=978&h=652&crop=1">\n</div>  \n                                <div class="card-content">\n                                <p class="card-title">Meu titulo</p>\n                                <p >Conteudo do cartao</p>\n                                </div>\n                                  <div class="card-action">\n                                 <a href="#">aNCORA</a>\n                            </div>\n                        </div>\n                    </div> \n                </div>\n             </div>\n               \n                <router-view></router-view>\n               <!-- <div v-show="activedView == 0" class="col-xs-12 col-md-8">\n                        <bill-list-component v-ref:bill-list-component></bill-list-component>\n                </div>\n                <div v-show="activedView == 1" class="col-xs-12 col-md-8">\n                <bill-create-component :bill.sync="bill" ></bill-create-component>\n                </div>\n                </div>-->\n                ',

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