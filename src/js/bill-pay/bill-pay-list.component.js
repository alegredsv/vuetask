/**
 * Created by awichmann on 23/08/2016.
 */
window.billPayListComponent = Vue.extend({
    template:` <div class="container">
                  <div class="row">
                  <button class="btn btn-large waves-effect">Meu botão</button>
                  <h4>Minhas contas à pagar</h4>
                    <table class="bordered highlight centered responsive-table z-depth-5">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Vencimento</th>
                            <th>Nome</th>
                            <th>Valor</th>
                            <th>Paga?</th>
                            <th>Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(index, o) in bills">
                            <td>{{ index +1 }}</td>
                            <td>{{ o.date_due | dateFormat }}</td>
                            <td>{{ o.name }}</td>
                            <td>{{ o.value | numberFormat}}</td>
                            <td class="white-text" :class="{'green lighten-2': o.done , 'red lighten-2':!o.done}">{{ o.done | doneLabel }}</td>
                            <td>
                               <!-- <span style="margin: 5px;cursor: pointer;" @click.prevent="editaConta(o)"   title="Editar" aria-hidden="true" class="glyphicon glyphicon-pencil"></span>-->
                               <span style="margin: 5px;cursor: pointer;" v-link="{name: 'bill-pay.update', params:{id:o.id}}"  title="Editar" aria-hidden="true"><i class="material-icons">edit</i></span>
                               <span @click.prevent=" openModalDelete();" title="Exluir" aria-hidden="true" "><i class="material-icons">delete</i></span>
                                <span @click.prevent="baixaConta(o, true, o.id);" title="Marcar como paga" aria-hidden="true" class="glyphicon glyphicon-thumbs-up"></span>
                                <span @click.prevent="baixaConta(o, false, o.id);" title="Marcar como não paga" aria-hidden="true" class="glyphicon glyphicon-thumbs-down"></span>
                             </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                     
                </div> 
                <modal :modal="modal">
                    <div slot="content">
                        <h4>Mensagem de confirmacao</h4>
                        <p><strong>Deseja excluir essa conta?</strong>
                       </p></div>
                    <div slot="footer">
                       <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action">OK</button>
                         <button class="btn btn-flat waves-effect waves-red  modal-close modal-action">Cancelar</button>
                    </div>
                </modal>
               
                `,

    data() {
        return{
          bills: [],
          modal:{
              id:"modal-delete"
          }
        };
    },
    created() {
       // var resource = this.$resource('bills{/id}');

        Bill.query().then((response) => {
            this.bills = response.data;
        });
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


        },
        openModalDelete(){
            $('#modal-delete').openModal();
        }
    }
});
