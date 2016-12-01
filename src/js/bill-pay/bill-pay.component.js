/**
 * Created by awichmann on 23/08/2016.
 */
window.billPayComponent = Vue.extend({

    template:`
<!--            <style>
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
    </style>-->
             <div class="section">
          
               <div class="container">
                <h4 >{{ title }}</h4>
                <div class="row">
                    <div class="col s7">
                        <div class="card z-depth-2" :class="{'grey':  status ===false, 'green': status === 0, 'red':status >0 }">
                            <div class="card-content white-text">
                                 <p class="card-title">
                                     <i class="material-icons">account_balance</i>
                                    </p>
                                 <h5>{{ status | totalLabel }}</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col s5">
                         <div class="card z-depth-2" >
                            <div class="card-content">
                                 <p class="card-title">
                                     <i class="material-icons">payment</i>
                                    </p>
                                 <h5>{{ total | numberFormat }}</h5>
                            </div>
                        </div>
                    </div>
                
             
                        </div>
                    </div> 
                </div>
             </div>
               <div class="divider"></div>
                <router-view></router-view>
               <!-- <div v-show="activedView == 0" class="col-xs-12 col-md-8">
                        <bill-list-component v-ref:bill-list-component></bill-list-component>
                </div>
                <div v-show="activedView == 1" class="col-xs-12 col-md-8">
                <bill-create-component :bill.sync="bill" ></bill-create-component>
                </div>
                </div>-->
                `,

    data() {
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
    created() {
        this.updateStatus();
        this.updateTotal();
    },
    methods:{
        
        caculateStatus(bills) {

            if(!bills.length){
                this.status = false
            }

            let count = 0;
            var billListComponent =  this.$root.$children[0];

            for (let i in bills) {

                if (!bills[i].done) {

                    count++;
                }
            }
            this.status = count;


        },
        updateStatus() {

            Bill.query().then((response)=>{
                this.caculateStatus(response.data);
            });
        },
        updateTotal() {
           
            Bill.total().then((response)=>{
                this.total = response.data.total;
            });
        }
        
    },
    events:{
        'change-info'() {
            this.updateStatus();
            this.updateTotal();
        }
    }
});