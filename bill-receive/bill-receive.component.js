
/**
 * Created by awichmann on 23/08/2016.
 */
window.billReceiveComponent = Vue.extend({
    components:{
       'menu-component': billReceiveMenuComponent
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
              <h1 >{{ total | currency 'R$ ' }}</h1>
            <h3  :class="{'statusGray':  bills.length == 0 ,'statusRed':(billCount > 0 && bills.length > 0), 'statusGreen' : billCount <= 0 &&  bills.length > 0}">{{ status | totalLabel }}</h3>
            <menu-component></menu-component>
            <router-view></router-view>
  
                `,
    data: function() {
        return{
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
            BillReceived.query().then(function(response){
                self.caculateStatus(response.data);
            });
        },
        updateTotal:function () {
            self = this;
            BillReceived.total().then(function(response){
                self.total = response.data.total;
            });
        }

    },
    events:{
        'change-info-receive':function () {
            this.updateStatus();
            this.updateTotal();
        }
    }
});