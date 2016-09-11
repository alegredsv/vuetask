'use strict';

/**
 * Created by awichmann on 23/08/2016.
 */

window.billPayCreateComponent = Vue.extend({
    template: '\n               <form name="form-control" @submit.prevent="submit">\n                        <div class="form-group">\n                            <label for="vencimento">Vencimento</label>\n                            <input type="text" style="width: 200px;" class="form-control" v-model="bill.date_due" id="vencimento" placeholder="00/00/0000">\n                        </div>\n                        <div class="form-group ">\n                            <label for="nome">Nome</label>\n                            <select v-model="bill.name" style="width: 200px;" id="nome" placeholder="Nome" class="form-control">\n                                <option v-for="o in names" value="{{ o }}">{{o}}</option>\n                            </select>\n                        </div>\n\n                        <div class="form-group ">\n                            <label for="valor">Valor</label>\n                            <input type="text" style="width: 200px;" class="form-control"v-model="bill.value" id="valor" placeholder="Valor">\n                        </div>\n                        <input type="submit" value="Enviar">\n                    </form>\n    ',

    props: ['bill'],
    data: function data() {
        return {
            formType: 'insert',
            names: ['Conta de luz', 'Conta de água', 'Conta de telefone', 'Supermercado', 'Cartão de crédito', 'Empréstimo', 'Gasolina']
        };
    },
    created: function created() {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
            return;
        }
        // this.formType = 'insert';
    },
    methods: {
        submit: function submit() {
            var _this = this;

            // var resource = this.$resource('bills{/id}');
            var self = this;
            if (this.formType == 'insert') {
                // this.$parent.$refs.billListComponent.bills.push(this.bill);
                //  this.$root.$children[0].billsPay.push(this.bill);
                // this.$dispatch('new-bill', this.bill);

                Bill.save({}, this.bill).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({ name: 'bill-pay.list' });
                });
            } else {
                (function () {
                    var self = _this;
                    Bill.update({ id: _this.bill.id }, _this.bill).then(function (response) {
                        self.$dispatch('change-info');
                        self.$router.go({ name: 'bill-pay.list' });
                    });
                })();
            }
        },
        getBill: function getBill(id) {
            // var resource = this.$resource('bills{/id}');
            var self = this;
            Bill.get({ id: id }).then(function (response) {
                self.bill = response.data;
            });

            /*     var bills = this.$root.$children[0].billsPay;
                 this.bill = bills[index];*/
        }
    }
});