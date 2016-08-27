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
                               <span @click.prevent="excluiConta(index);" title="Exluir" aria-hidden="true" class="glyphicon glyphicon-remove"></span>
                                <span @click.prevent="baixaConta(o, 1, index);" title="Marcar como paga" aria-hidden="true" class="glyphicon glyphicon-thumbs-up"></span>
                                <span @click.prevent="baixaConta(o, 0, index);" title="Marcar como não paga" aria-hidden="true" class="glyphicon glyphicon-thumbs-down"></span>
                             </td>
                        </tr>
                        </tbody>
                    </table>
                `,
    http:{
        root :'http://192.168.10.10:8000/api'
    },
    data:function () {
        return{
          bills: []
        };
    },
    created:function() {
        this.$http.get('bills').then(function(response){
            this.bills = response.data;
        })
    },
    methods:{
         excluiConta: function (index) {
            var confimra = confirm("Deseja excluir a conta?");
            if (index > -1 && confimra) {
              //  this.$root.$children[0].billsPay.splice(index, 1);
                this.$http.delete('bills/'+this.bill.id).then(function(response){
                    this.$router.go({name:'bill-pay.list'});
                });
            }

        },
        baixaConta: function (bill, status, index) {
            bill.done = status;
            this.$root.$children[0].billsPay[index] = bill;
        }
    }
});
