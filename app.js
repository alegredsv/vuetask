/**
 * Created by joeramone on 10/08/2016.
 */
Vue.filter("doneLabel", function (value) {
    if (value == 0) {
        return 'Não paga';
    } else {
        return 'Paga';
    }
});
var menuComponent = Vue.extend({
        template: `
         <nav>
                    <ul>
                        <li><a href="#" @click.prevent="showView(0)">Listar contas</a></li>
                        <li><a href="#" @click.prevent="novaConta()">Nova conta</a></li>
                    </ul>
                </nav>
        `,
        data: function () {
            return{
                menus: [
                    {id: 0, name: "Listar contas"}, {id: 1, name: "Criar contas"}
                ],
            };
        },
        methods:{
            showView: function (number) {
                this.$dispatch('change-activedview', number);
               // this.$parent.activedView = number;
                if(number == 1){
                   this.$dispatch('change-formtype','insert');
                   // this.$root.$children[0].formType = 'insert';
                }
            },
            novaConta:function () {
                this.$root.$children[0].bill = {
                    date_due: '',
                    name: '',
                    value: 0,
                    done: 0
                };
                //this.$root.$children[0].formType = 'insert';
                this.$dispatch('change-formtype','insert');
                //this.$root.$children[0].activedView = 1;
                this.$dispatch('change-activedview', 1);
            }
        }


});

var billListComponent = Vue.extend({
    template:` <table class="table">
                        <thead>
                        <tr>
                            <td>#</td>
                            <td>Vencimento</td>
                            <td>Nome</td>
                            <td>Valor</td>
                            <td>Paga?</td>
                            <td>Ações</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(index, o) in bills">
                            <td>{{ index +1 }}</td>
                            <td>{{ o.date_due }}</td>
                            <td>{{ o.name }}</td>
                            <td>{{ o.value | currency 'R$ '}}</td>
                            <td>{{ o.done | doneLabel }}</td>
                            <td><span style="margin: 5px;cursor: pointer;" @click.prevent="editaConta(o)"   title="Editar" aria-hidden="true" class="glyphicon glyphicon-pencil"></span>
                                <span @click.prevent="excluiConta(index);" title="Exluir" aria-hidden="true" class="glyphicon glyphicon-remove"></span>
                                <span @click.prevent="baixaConta(o, 1, index);" title="Marcar como paga" aria-hidden="true" class="glyphicon glyphicon-thumbs-up"></span>
                                <span @click.prevent="baixaConta(o, 0, index);" title="Marcar como não paga" aria-hidden="true" class="glyphicon glyphicon-thumbs-down"></span>
                             </td>
                        </tr>
                        </tbody>
                    </table>
                `,
    data:function () {
        return{
            bills:[{date_due:'20/08/2016', name: 'Conta de luz', value:127.99,done:1},
                {date_due:'21/08/2016', name: 'Conta de água', value:40.99,done:0},
                {date_due:'22/08/2016', name: 'Conta de telefone', value:55.99,done:0},
                {date_due:'23/08/2016', name: 'Supermercado', value:625.99,done:0},
                {date_due:'24/08/2016', name: 'Cartão de crédito', value:1200.99,done:0},
                {date_due:'25/08/2016', name: 'Empréstimo', value:25.99,done:1},
                {date_due:'26/08/2016', name: 'Gasolina', value:155.99,done:0}]
        };
    },
    methods:{
        editaConta: function (bill) {
            //this.$parent.bill = bill;
            this.$dispatch('change-bill',bill);
            this.$dispatch('change-formtype','updated');
            this.$dispatch('change-activedview', 1);
        },
        excluiConta: function (index) {
            var confimra = confirm("Deseja excluir a conta?");
            if (index > -1 && confimra) {
                this.$parent.$children[1].bills.splice(index, 1);
            }
            this.$dispatch('change-activedview', 0);
        },
        baixaConta: function (bill, status, index) {
            bill.done = status;
            this.$parent.bills[index] = bill;
        }
    },
    events:{
        'new-bill':function (bill) {
            this.bills.push(bill);
        }
        
    }
});

var billCreateComponent = Vue.extend({
    template: `
               <form name="form-control" @submit.prevent="submit">
                        <div class="form-group">
                            <label for="vencimento">Vencimento</label>
                            <input type="text" style="width: 200px;" class="form-control" v-model="bill.date_due" id="vencimento" placeholder="00/00/0000">
                        </div>
                        <div class="form-group ">
                            <label for="nome">Nome</label>
                            <select v-model="bill.name" style="width: 200px;" id="nome" placeholder="Nome" class="form-control">
                                <option v-for="o in names" value="{{ o }}">{{o}}</option>
                            </select>
                        </div>
                
                        <div class="form-group ">
                            <label for="valor">Valor</label>
                            <input type="text" style="width: 200px;" class="form-control"v-model="bill.value" id="valor" placeholder="Valor">
                        </div>
                        <input type="submit" value="Enviar">
                    </form>
    `,
    props:['bill'],
    data:function () {
        return{
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
        };
    },
    methods:{
        submit: function () {
            if(this.formType == 'insert') {
               // this.$parent.$refs.billListComponent.bills.push(this.bill);
                this.$dispatch('new-bill', this.bill);
            }
            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: 0
            };
            this.$dispatch('change-activedview', 0);
        }
    },
    events:{
       'change-formtype': function (formType) {
            this.formType = formType;
        },
        'change-bill': function (bill) {
            this.bill = bill;
        }

    }
});

var appComponent = Vue.extend({
    components:{
        'menu-component': menuComponent,
        'bill-list-component' : billListComponent,
        'bill-create-component': billCreateComponent
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
                <h3  :class="{'statusGray':  bills.length == 0 ,'statusRed':(billCount > 0 && bills.length > 0), 'statusGreen' : billCount <= 0 &&  bills.length > 0}">{{ status }}</h3>
                <menu-component></menu-component>
                <div v-show="activedView == 0" class="col-xs-12 col-md-8">
                        <bill-list-component v-ref:bill-list-component></bill-list-component>
                </div>
                <div v-show="activedView == 1" class="col-xs-12 col-md-8">
                <bill-create-component :bill.sync="bill" ></bill-create-component>
                </div>
                </div>`,
    data: function() {
        return{
        teste: '',
        title: "Contas a pagar",

        activedView: 0,
        bill: {
            date_due: '',
            name: '',
            value: 0,
            done: 0
        },
        billCount: 0,


        /*  bills:[{date_due:'20/08/2016', name: 'Conta de luz', value:127.99,done:1},
         {date_due:'21/08/2016', name: 'Conta de água', value:40.99,done:0},
         {date_due:'22/08/2016', name: 'Conta de telefone', value:55.99,done:0},
         {date_due:'23/08/2016', name: 'Supermercado', value:625.99,done:0},
         {date_due:'24/08/2016', name: 'Cartão de crédito', value:1200.99,done:0},
         {date_due:'25/08/2016', name: 'Empréstimo', value:25.99,done:1},
         {date_due:'26/08/2016', name: 'Gasolina', value:155.99,done:0}]*/

        bills: []
        };
    },
    computed: {
        status: function () {
            var count = 0;
            var billListComponent = this.$refs.billListComponent;
            console.log(billListComponent.bills);
            for (var i in billListComponent.bills) {
                if (!billListComponent.bills[i].done) {
                    count++;
                }
            }
            this.billCount = count;
            return !count ? 'Nenhuma conta a pagar' : 'Existem ' + count + ' contas a pagar';
        }
    },
    events:{
        'change-activedview': function (activedView) {
            this.activedView = activedView;
        },
        'change-formtype': function (formType) {
            //this.formType = formType;
            this.$broadcast('change-formtype',formType);
        },
        'change-bill': function (bill) {
            this.$broadcast('change-bill',bill);
        },
        'new-bill': function (bill) {
            this.$broadcast('new-bill',bill);
        }

    }
});
Vue.component("app-component", appComponent);
var app = new Vue({
    el: "#app"
});

