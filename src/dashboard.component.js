
/**
 * Created by awichmann on 23/08/2016.
 */
window.dashboardComponent = Vue.extend({
   /* components:{
       'menu-component': billReceiveMenuComponent
    },*/
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
                   <h3 style="color: red" >Total de contas a pagar: {{ vlPay }}</h3>
                   <h3 style="color: green" >Total de contas a receber: {{ vlReceive }}</h3>
                    <h2 style="color: blue">SALDO : {{vlReceive - vlPay}}</h2>
                `,
    data: function() {
        return{
           title: "Dashboard",
            billCount: 0,
            billTotalReceive: 0,
            billTotalPay:0
        };
    },
    computed: {
        vlPay: function () {
            var count = 0;
            var billListComponent =  this.$root.$children[0];

            for (var i in billListComponent.billsPay) {
                if (!billListComponent.billsPay[i].done) {
                    this.billTotalPay+=billListComponent.billsPay[i].value;
                    count++;
                }
            }
            this.billCount = count;
            self = this;
            Bill.total().then(function(response){
                self.billTotalPay = response.data.total;
            });
            return self.billTotalPay;
            //return this.billTotalPay;
        },
        vlReceive() {


            let count = 0;
            let billListComponent =  this.$root.$children[0];

            for (let i in billListComponent.billsReceive) {
                if (!billListComponent.billsReceive[i].done) {
                    this.billTotalReceive+=billListComponent.billsReceive[i].value;
                    count++;
                }
            }
            this.billCount = count;

            let self = this;
            BillReceived.total().then(function(response){
                self.billTotalReceive = response.data.total;
            });
            return self.billTotalReceive;
        }
    }
});