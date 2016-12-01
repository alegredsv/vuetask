'use strict';

/**
 * Created by awichmann on 23/08/2016.
 */
var names = ['Conta de luz', 'Conta de água', 'Conta de telefone', 'Supermercado', 'Cartão de crédito', 'Empréstimo', 'Gasolina'];
window.billPayCreateComponent = Vue.extend({
    template: '\n            <div class="container">\n                <div class="row">\n                <h4>Nova conta</h4>\n               <form name="form-control" @submit.prevent="submit">\n                        <div class="row">\n                            <div class="input-field col s6">\n                                 <label class="active">Vencimento</label>\n                                 <input type="text" class="form-control" v-model="bill.date_due | dateFormat" id="vencimento" placeholder="00/00/0000">\n                            </div>\n                            <div class="input-field col s6">\n                                 <label class="active">Valor</label>\n                                 <input type="text" class="form-control"v-model="bill.value | numberFormat" id="valor" placeholder="Valor">\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="input-field col s6">\n                                <label class="active">Nome</label>\n                                <select v-model="bill.name"  id="nome" placeholder="Nome"  class="browser-default" >\n                                    <option value="" disabled selected> Escolha</option>\n                                    <option v-for="o in names" value="{{ o }}">{{o}}</option>\n                                </select>\n                            </div>\n                             <div class="input-field col s6">\n                               <input type="checkbox" v-model="bill.done" id="pago" class="filled-in">\n                               <label for="pago">Pago?</label>\n                            </div>\n                        </div>\n                         <div class="row">\n                          <div class="input-field  col s12">\n                             <input type="submit" value="Enviar" class="btn-large right">\n                             </div>\n                        </div>\n                    </form>\n                    </div>\n     </div>\n    ',

    props: ['bill'],
    data: function data() {
        return {
            formType: 'insert',
            names: names,
            bill: new BillManager()
        };
    },
    created: function created() {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
            return;
        }
        $(document).ready(function () {
            $('#nome').material_select();
        });
        // this.formType = 'insert';
    },

    methods: {
        submit: function submit() {
            var _this = this;

            // var resource = this.$resource('bills{/id}');
            var data = Vue.util.extend(this.bill, { date_due: this.getDateDuo(this.bill.date_due) });
            if (this.formType == 'insert') {
                // this.$parent.$refs.billListComponent.bills.push(this.bill);
                //  this.$root.$children[0].billsPay.push(this.bill);
                // this.$dispatch('new-bill', this.bill);

                Bill.save({}, data).then(function (response) {
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-pay.list' });
                });
            } else {

                Bill.update({ id: this.bill.id }, data).then(function (response) {
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-pay.list' });
                });
            }
        },
        getBill: function getBill(id) {
            var _this2 = this;

            // var resource = this.$resource('bills{/id}');

            Bill.get({ id: id }).then(function (response) {
                _this2.bill = response.data;
            });

            /*     var bills = this.$root.$children[0].billsPay;
                 this.bill = bills[index];*/
        },
        getDateDuo: function getDateDuo(date_due) {
            var dateDuoObject = date_due;
            if (!(date_due instanceof Date)) {
                dateDuoObject = new Date(date_due.split('/').reverse().join('-') + "T03:00:00");
            }
            return dateDuoObject.toISOString().split('T')[0];
        }
    }
});