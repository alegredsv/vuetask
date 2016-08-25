/**
 * Created by awichmann on 23/08/2016.
 */

window.billReceiveCreateComponent = Vue.extend({
    template: `
               <form name="form-control" @submit.prevent="submit">
                       <div class="form-group">
                            <label for="cliente">Cliente</label>
                            <input type="text" style="width: 200px;" class="form-control" v-model="bill.name" id="cliente" placeholder="Cliente">
                        </div>
                        <div class="form-group">
                            <label for="vencimento">Vencimento</label>
                            <input type="text" style="width: 200px;" class="form-control" v-model="bill.date_due" id="vencimento" placeholder="00/00/0000">
                        </div>
                        <div class="form-group ">
                            <label for="nome">Serviço</label>
                            <select v-model="bill.service" style="width: 200px;" id="service" placeholder="Serviço" class="form-control">
                                <option v-for="o in service" value="{{ o }}">{{o}}</option>
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
            service: [
                'Suporte técnico',
                'Recuperação de HD',
                'Instalação de software',
                'Visita técnica',
                'Criação de site',
                'Customização',
                'Configuração de servidor'
            ],
        };
    },
    created:function () {
      if(this.$route.name == 'bill-receive.update'){
          this.formType = 'update';
          this.getBill(this.$route.params.index);
          return;
      }
       // this.formType = 'insert';
    },
    methods:{
        submit: function () {
            if(this.formType == 'insert') {
                // this.$parent.$refs.billListComponent.bills.push(this.bill);
                this.$root.$children[0].billsReceive.push(this.bill);
               // this.$dispatch('new-bill', this.bill);
            }
            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: 0,
                service:''
            };
            this.$router.go({name:'bill-receive.list'});
        },
        getBill:function(index){
            var bills = this.$root.$children[0].billsReceive;
            this.bill = bills[index];
        }
    }
});