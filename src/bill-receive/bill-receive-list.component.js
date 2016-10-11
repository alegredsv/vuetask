/**
 * Created by awichmann on 23/08/2016.
 */
window.billReceiveListComponent = Vue.extend({
    template:`  <div class="row">
                    <table  class="bordered highlight centered responsive-table" >
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Cliente</th>
                            <th>Serviço</th>
                            <th>Valor</th>
                            <th>Recebido?</th>
                            <th>Data recebimento</th>
                            <th>Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(index, o) in bills">
                            <td>{{ index +1 }}</td>
                            <td>{{ o.name }}</td>
                            <td>{{ o.service }}</td>                        
                            <td>{{ o.value | numberFormat }}</td>
                            <td>{{ o.done | receiveLabel }}</td>
                              <td>{{ o.date_due | dateFormat}}</td>
                            <td>
                               <!-- <span style="margin: 5px;cursor: pointer;" @click.prevent="editaConta(o)"   title="Editar" aria-hidden="true" class="glyphicon glyphicon-pencil"></span>-->
                               <span style="margin: 5px;cursor: pointer;" v-link="{name: 'bill-receive.update', params:{id:o.id}}"  title="Editar" aria-hidden="true" class="glyphicon glyphicon-pencil"></span>
                               <span @click.prevent="excluiConta(o);" title="Exluir" aria-hidden="true" class="glyphicon glyphicon-remove"></span>
                                <span @click.prevent="baixaConta(o, true, index);" title="Marcar como paga" aria-hidden="true" class="glyphicon glyphicon-thumbs-up"></span>
                                <span @click.prevent="baixaConta(o, false, index);" title="Marcar como não paga" aria-hidden="true" class="glyphicon glyphicon-thumbs-down"></span>
                             </td>
                        </tr>
                        </tbody>
                    </table>
                     </div >
                `,
    data() {
        return{
          bills: []
        };
    },


    created() {
        // var resource = this.$resource('bills{/id}');
     
        BillReceived.query().then((response)=>{
            this.bills = response.data;
        })
    },
    methods:{
         excluiConta(bill) {

            let confimra = confirm("Deseja excluir a conta?");
            if (bill.id > -1 && confimra) {
              //  this.$root.$children[0].billsReceive.splice(index, 1);
                BillReceived.delete({'id':bill.id}).then((response)=>{
                    this.bills.$remove(bill);
                    this.$dispatch('change-info-receive');
                    this.$router.go({name:'bill-receive.list'});
                });
     
            }

        },
        baixaConta(bill, status, index) {
            bill.done = status;
            // this.$root.$children[0].billsPay[index] = bill;

            BillReceived.update({id:bill.id},bill).then((response) => {
                this.$dispatch('change-info-receive');
                this.$router.go({name:'bill-receive.list'});
            });
        }
    }
});
