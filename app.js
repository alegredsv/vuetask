/**
 * Created by joeramone on 10/08/2016.
 */
var app = new Vue({
    el:"#app",
    data:{
        teste:'',
        title:"Contas a pagar",
        menus:[
            {id:0, name:"Listar contas"}, {id:1, name:"Criar contas"}
        ],
        activedView: 1,
        bill:{
            date_due:'',
            name :'',
            value: 0,
            done: 0
        },
        names:[
            'Conta de luz',
            'Conta de água',
            'Conta de telefone',
            'Supermercado',
            'Cartão de crédito',
            'Empréstimo',
            'Gasolina'
        ],
        bills:[{date_due:'20/08/2016', name: 'Conta de energia', value:127.99,done:1},
       {date_due:'21/08/2016', name: 'Conta de águra', value:40.99,done:0},
       {date_due:'22/08/2016', name: 'Conta de telefone', value:55.99,done:0},
       {date_due:'23/08/2016', name: 'Supermenrcado', value:625.99,done:0},
       {date_due:'24/08/2016', name: 'Cartão de crédito', value:1200.99,done:0},
       {date_due:'25/08/2016', name: 'Alimentação', value:25.99,done:1},
       {date_due:'26/08/2016', name: 'Conta de condomínio', value:155.99,done:0}]
    },
    computed:{
        status: function () {
            var count = 0;
            for(var i in this.bills){
                if(!this.bills[i].done){
                    count++;
                }
            }

            return !count?'Nenhuma conta a pagar':'Existem '+count+ ' linhas a pagar';
        }
    },
    methods:{

        showView: function ($event, $number) {
           this.activedView = $number;
        }
        ,
        submit:function () {
            this.bills.push(this.bill);
            this.activedView =0;
        }
    }
});

app.$watch('teste',function (novoValor, velhoValor) {
    console.log(velhoValor+" : "+novoValor);
});