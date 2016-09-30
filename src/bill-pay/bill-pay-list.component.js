/**
 * Created by awichmann on 23/08/2016.
 */
window.billPayListComponent = Vue.extend({
    template:` <div class="container">
                <div class="row">
                    <div class="col s2 m4 l6">Laravel com vue</div>
                    <div class="col s10 m8 l6">na code education</div>
                </div>
                <div class="row">
                    <table border="1" cellpadding="10">
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
                            <td>{{ o.date_due | dateFormat }}</td>
                            <td>{{ o.name }}</td>
                            <td>{{ o.value | numberFormat}}</td>
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
                    </div>
                </div>
                `,

    data() {
        return{
          bills: []
        };
    },
    created() {
       // var resource = this.$resource('bills{/id}');

        Bill.query().then((response) => {
            this.bills = response.data;
        })
    },
    methods:{
         excluiConta(bill) {
             //var resource = this.$resource('bills{/id}');
             let self = this;
            let confimra = confirm("Deseja excluir a conta?");
            if (bill.id > -1 && confimra) {
              //  this.$root.$children[0].billsPay.splice(index, 1);
                Bill.delete({'id':bill.id}).then((response) =>{
                    this.bills.$remove(bill);
                    this.$router.go({name:'bill-pay.list'});
                });
                self.$dispatch('change-info');
            }

        },
        baixaConta(bill, status, index) {
            bill.done = status;
           // this.$root.$children[0].billsPay[index] = bill;
            let self = this;
            Bill.update({id:bill.id},bill).then((response)=>{
                this.$dispatch('change-info');
                this.$router.go({name:'bill-pay.list'});
            });


        }
    }
});
