/**
 * Created by joeramone on 10/08/2016.
 */
var app = new Vue({
    el: "#app",
    data: {
        teste: '',
        title: "Contas a pagar",
        menus: [
            {id: 0, name: "Listar contas"}, {id: 1, name: "Criar contas"}
        ],
        activedView: 1,
        bill: {
            date_due: '',
            name: '',
            value: 0,
            done: 0
        },
        billCount: 0,
        formType: 'insert',
        names: [
            'Conta de luz',
            'Conta de água',
            'Conta de telefone',
            'Supermercado',
            'Cartão de crédito',
            'Empréstimo',
            'Gasolina'
        ],
        /*  bills:[{date_due:'20/08/2016', name: 'Conta de luz', value:127.99,done:1},
         {date_due:'21/08/2016', name: 'Conta de água', value:40.99,done:0},
         {date_due:'22/08/2016', name: 'Conta de telefone', value:55.99,done:0},
         {date_due:'23/08/2016', name: 'Supermercado', value:625.99,done:0},
         {date_due:'24/08/2016', name: 'Cartão de crédito', value:1200.99,done:0},
         {date_due:'25/08/2016', name: 'Empréstimo', value:25.99,done:1},
         {date_due:'26/08/2016', name: 'Gasolina', value:155.99,done:0}]*/

        bills: []
    },
    computed: {
        status: function () {
            var count = 0;
            for (var i in this.bills) {
                if (!this.bills[i].done) {
                    count++;
                }
            }
            this.billCount = count;
            return !count ? 'Nenhuma conta a pagar' : 'Existem ' + count + ' contas a pagar';
        }
    },
    methods: {
        showView: function ($number) {
          this.activedView = $number;
        },
        novaConta:function () {
            this.bill = {
                date_due: '',
                    name: '',
                    value: 0,
                    done: 0
            };
            this.formType = 'insert';
            this.activedView = 1;
        },
        submit: function () {
            if(this.formType == 'insert') {
                this.bills.push(this.bill);
            }
            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: 0
            };
            this.activedView = 0;
        },
        editaConta: function (bill) {
            this.bill = bill;
            this.formType = 'updated';
            this.activedView = 1;
        },
        excluiConta: function (index) {
            var confimra = confirm("Deseja excluir a conta?");
            if (index > -1 && confimra) {
                this.bills.splice(index, 1);
            }
            this.activedView = 0;
        },
        baixaConta: function (bill, status, index) {
            bill.done = status;
            this.bills[index] = bill;
        }
    }
});

Vue.filter("doneLabel", function (value) {
    if (value == 0) {
        return 'Não paga';
    } else {
        return 'Paga';
    }
});
