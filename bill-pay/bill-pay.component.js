/**
 * Created by awichmann on 23/08/2016.
 */
window.billPayComponent = Vue.extend({
    components:{
        'menu-component': billPayMenuComponent
    },
    template:`
            <style>
        .centralizado {
            margin: 0 auto;
            float: none;
        }
        .statusRed {
            color: red;
        }
        .statusGreen {
            color: green;
        }
        .statusGray {
            color: gray;
        }
    </style>
            <div  class="container centralizado">

                <h1 >{{ title }}</h1>
                <h3>{{ total | currency 'R$ '}}</h3>
                <h3  :class="{'statusGray':  bills.length == 0 ,'statusRed':(status > 0 && bills.length > 0), 'statusGreen' : status <= 0 &&  bills.length > 0}">{{ status | totalLabel}}</h3>
                <menu-component></menu-component>
                <router-view></router-view>
               <!-- <div v-show="activedView == 0" class="col-xs-12 col-md-8">
                        <bill-list-component v-ref:bill-list-component></bill-list-component>
                </div>
                <div v-show="activedView == 1" class="col-xs-12 col-md-8">
                <bill-create-component :bill.sync="bill" ></bill-create-component>
                </div>
                </div>-->
                `,

    data: function() {
        return{
            teste: '',
            title: "Contas a pagar",
            status : false,
            billCount: 0,

            total: 0,

            /*  bills:[{date_due:'20/08/2016', name: 'Conta de luz', value:127.99,done:1},
             {date_due:'21/08/2016', name: 'Conta de água', value:40.99,done:0},
             {date_due:'22/08/2016', name: 'Conta de telefone', value:55.99,done:0},
             {date_due:'23/08/2016', name: 'Supermercado', value:625.99,done:0},
             {date_due:'24/08/2016', name: 'Cartão de crédito', value:1200.99,done:0},
             {date_due:'25/08/2016', name: 'Empréstimo', value:25.99,done:1},
             {date_due:'26/08/2016', name: 'Gasolina', value:155.99,done:0}]*/

           // bills: []
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
    created: function () {
     this.updateStatus();
        this.updateTotal();
    },
    methods:{
        
        caculateStatus: function (bills) {

            if(!bills.length){
                this.status = false
            }

            var count = 0;
            var billListComponent =  this.$root.$children[0];

            for (var i in bills) {

                if (!bills[i].done) {

                    count++;
                }
            }
            this.status = count;


        },
        updateStatus:function () {
            self = this;
            Bill.query().then(function(response){
                self.caculateStatus(response.data);
            });
        },
        updateTotal:function () {
            self = this;
            Bill.total().then(function(response){
                self.total = response.data.total;
            });
        }
        
    },
    events:{
        'change-info':function () {
            this.updateStatus();
            this.updateTotal();
        }
    }
});