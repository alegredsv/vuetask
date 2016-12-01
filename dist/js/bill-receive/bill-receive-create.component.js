'use strict';

/**
 * Created by awichmann on 23/08/2016.
 */

window.billReceiveCreateComponent = Vue.extend({
    template: '\n               <form name="form-control" @submit.prevent="submit">\n                       <div class="form-group">\n                            <label for="cliente">Cliente</label>\n                            <input type="text" style="width: 200px;" class="form-control" v-model="bill.name" id="cliente" placeholder="Cliente">\n                        </div>\n                        <div class="form-group">\n                            <label for="vencimento">Vencimento</label>\n                            <input type="text" style="width: 200px;" class="form-control" v-model="bill.date_due" id="vencimento" placeholder="00/00/0000">\n                        </div>\n                        <div class="form-group ">\n                            <label for="nome">Servi\xE7o</label>\n                            <select v-model="bill.service" style="width: 200px;" id="service" placeholder="Servi\xE7o" class="form-control">\n                                <option v-for="o in service" value="{{ o }}">{{o}}</option>\n                            </select>\n                        </div>\n\n                        <div class="form-group ">\n                            <label for="valor">Valor</label>\n                            <input type="text" style="width: 200px;" class="form-control"v-model="bill.value" id="valor" placeholder="Valor">\n                        </div>\n                        <input type="submit" value="Enviar">\n                    </form>\n    ',
    props: ['bill'],
    data: function data() {
        return {
            formType: 'insert',
            service: ['Suporte técnico', 'Recuperação de HD', 'Instalação de software', 'Visita técnica', 'Criação de site', 'Customização', 'Configuração de servidor']
        };
    },
    created: function created() {
        if (this.$route.name == 'bill-receive.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
            return;
        }
        // this.formType = 'insert';
    },

    methods: {
        submit: function submit() {
            var _this = this;

            if (this.formType == 'insert') {
                // this.$parent.$refs.billListComponent.bills.push(this.bill);
                // this.$root.$children[0].billsReceive.push(this.bill);
                // this.$dispatch('new-bill', this.bill);
                BillReceived.save({}, this.bill).then(function (response) {
                    _this.$dispatch('change-info-receive');
                    _this.$router.go({ name: 'bill-receive.list' });
                });
            } else {

                BillReceived.update({ id: this.bill.id }, this.bill).then(function (response) {
                    _this.$dispatch('change-info-receive');
                    _this.$router.go({ name: 'bill-receive.list' });
                });
            }
        },
        getBill: function getBill(id) {
            var _this2 = this;

            BillReceived.get({ id: id }).then(function (response) {
                _this2.bill = response.data;
            });
            // var bills = this.$root.$children[0].billsReceive;
            // this.bill = bills[index];
        }
    }
});