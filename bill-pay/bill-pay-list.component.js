/**
 * Created by awichmann on 23/08/2016.
 */
window.billPayListComponent = Vue.extend({
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
                            <td>
                               <!-- <span style="margin: 5px;cursor: pointer;" @click.prevent="editaConta(o)"   title="Editar" aria-hidden="true" class="glyphicon glyphicon-pencil"></span>-->
                               <span style="margin: 5px;cursor: pointer;" v-link="{name: 'bill-pay.update', params:{id:o.id}}"  title="Editar" aria-hidden="true" class="glyphicon glyphicon-pencil"></span>
                               <span @click.prevent="excluiConta(o);" title="Exluir" aria-hidden="true" class="glyphicon glyphicon-remove"></span>
                                <span @click.prevent="baixaConta(o, true, o.id);" title="Marcar como paga" aria-hidden="true" class="glyphicon glyphicon-thumbs-up"></span>
                                <span @click.prevent="baixaConta(o, false, o.id);" title="Marcar como não paga" aria-hidden="true" class="glyphicon glyphicon-thumbs-down"></span>
                             </td>
                        </tr>
                        </tbody>
                    </table>
                `,

    data:function () {
        return{
          bills: []
        };
    },
    created:function() {
       // var resource = this.$resource('bills{/id}');
        var self = this;
        Bill.query().then(function(response){
            self.bills = response.data;
        })
    },
    methods:{
         excluiConta: function (bill) {
             //var resource = this.$resource('bills{/id}');
             var self = this;
            var confimra = confirm("Deseja excluir a conta?");
            if (bill.id > -1 && confimra) {
              //  this.$root.$children[0].billsPay.splice(index, 1);
                Bill.delete({'id':bill.id}).then(function(response){
                    self.bills.$remove(bill);
                    self.$router.go({name:'bill-pay.list'});
                });
                self.$dispatch('change-info');
            }

        },
        baixaConta: function (bill, status, index) {
            bill.done = status;
           // this.$root.$children[0].billsPay[index] = bill;
            var self = this;
            Bill.put('bills/'+bill.id,bill).then(function(response){
                self.$dispatch('change-info');
                self.$router.go({name:'bill-pay.list'});
            });


        }
    }
});