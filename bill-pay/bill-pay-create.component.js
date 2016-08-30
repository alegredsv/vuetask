/**
 * Created by awichmann on 23/08/2016.
 */

window.billPayCreateComponent = Vue.extend({
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
    created:function () {
      if(this.$route.name == 'bill-pay.update'){
          this.formType = 'update';
          this.getBill(this.$route.params.id);
          return;
      }
       // this.formType = 'insert';
    },
    methods:{
        submit: function () {
           // var resource = this.$resource('bills{/id}');
            var self = this;
            if(this.formType == 'insert') {
                // this.$parent.$refs.billListComponent.bills.push(this.bill);
              //  this.$root.$children[0].billsPay.push(this.bill);
               // this.$dispatch('new-bill', this.bill);

                    Bill.save({},this.bill).then(function(response){
                    self.$dispatch('change-info');
                    self.$router.go({name:'bill-pay.list'});

                });
            }else{
                var self = this;
                Bill.update({id:this.bill.id},this.bill).then(function(response){
                    self.$dispatch('change-info');
                    self.$router.go({name:'bill-pay.list'});
                });
            }
        },
        getBill:function(id){
           // var resource = this.$resource('bills{/id}');
            var self = this;
            Bill.get({id:id}).then(function(response){
                self.bill = response.data;
            })

       /*     var bills = this.$root.$children[0].billsPay;
            this.bill = bills[index];*/
        }
    }
});