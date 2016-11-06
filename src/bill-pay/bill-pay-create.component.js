/**
 * Created by awichmann on 23/08/2016.
 */
const names =[
    'Conta de luz',
    'Conta de água',
    'Conta de telefone',
    'Supermercado',
    'Cartão de crédito',
    'Empréstimo',
    'Gasolina'
];
window.billPayCreateComponent = Vue.extend({
    template: `
            <div class="container">
                <div class="row">
                <h4>Nova conta</h4>
               <form name="form-control" @submit.prevent="submit">
                        <div class="row">
                            <div class="input-field col s6">
                                 <label class="active">Vencimento</label>
                                 <input type="text" class="form-control" v-model="bill.date_due | dateFormat" id="vencimento" placeholder="00/00/0000">
                            </div>
                            <div class="input-field col s6">
                                 <label class="active">Valor</label>
                                 <input type="text" class="form-control"v-model="bill.value | numberFormat" id="valor" placeholder="Valor">
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <label class="active">Nome</label>
                                <select v-model="bill.name"  id="nome" placeholder="Nome"  class="browser-default" >
                                    <option value="" disabled selected> Escolha</option>
                                    <option v-for="o in names" value="{{ o }}">{{o}}</option>
                                </select>
                            </div>
                             <div class="input-field col s6">
                               <input type="checkbox" v-model="bill.done" id="pago" class="filled-in">
                               <label for="pago">Pago?</label>
                            </div>
                        </div>
                         <div class="row">
                          <div class="input-field  col s12">
                             <input type="submit" value="Enviar" class="btn-large right">
                             </div>
                        </div>
                    </form>
                    </div>
     </div>
    `,

    props:['bill'],
    data() {
        return{
            formType: 'insert',
            names: names,
            bill: new BillManager()
        };
    },
    created() {
      if(this.$route.name == 'bill-pay.update'){
          this.formType = 'update';
          this.getBill(this.$route.params.id);
          return;
      }
        $(document).ready(function () {
            $('#nome').material_select();
        })
       // this.formType = 'insert';
    },
    methods:{
        submit() {
           // var resource = this.$resource('bills{/id}');
            let data = Vue.util.extend(this.bill, {date_due: this.getDateDuo(this.bill.date_due)});
            if(this.formType == 'insert') {
                // this.$parent.$refs.billListComponent.bills.push(this.bill);
              //  this.$root.$children[0].billsPay.push(this.bill);
               // this.$dispatch('new-bill', this.bill);

                    Bill.save({},data).then((response) =>{
                    this.$dispatch('change-info');
                    this.$router.go({name:'bill-pay.list'});

                });
            }else{

                Bill.update({id:this.bill.id},data).then((response) =>{
                    this.$dispatch('change-info');
                    this.$router.go({name:'bill-pay.list'});
                });
            }
        },
        getBill(id){
           // var resource = this.$resource('bills{/id}');

            Bill.get({id:id}).then((response) => {
                this.bill = response.data;
            })

       /*     var bills = this.$root.$children[0].billsPay;
            this.bill = bills[index];*/
        },
        getDateDuo(date_due){
            let dateDuoObject = date_due;
            if(!(date_due instanceof Date)){
                dateDuoObject = new Date(date_due.split('/').reverse().join('-')+"T03:00:00");
            }
            return dateDuoObject.toISOString().split('T')[0];
        }
    }
});