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
                               <span @click.prevent="excluiConta(o);" title="Exluir" aria-hidden="true" "><i class="material-icons">delete</i></span>
                                <span @click.prevent="baixaConta(o, true, o.id);" title="Marcar como paga" aria-hidden="true" class="glyphicon glyphicon-thumbs-up"></span>
                                <span @click.prevent="baixaConta(o, false, o.id);" title="Marcar como não paga" aria-hidden="true" class="glyphicon glyphicon-thumbs-down"></span>
                             </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                     <a id="btnmodal" class="btn waves-effect" href="#modalOk" >Modsssssssssssal show</a>
                   <div id="modalOk" class="modal">
                        <div class="modal-content">
                            <h2>Meu primeiro modal</h2>
                            <p>Laravel com vue js</p>
                        </div>
                        <div class="modal-footer">
                        <button class="btn btn-flat green">OK</button>
                        </div>
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
        });
        $(document).ready(function () {
            $("#btnmodal").leanModal();
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


        }
    }
});
