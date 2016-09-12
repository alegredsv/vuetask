'use strict';

/**
 * Created by awichmann on 23/08/2016.
 */
window.billReceiveListComponent = Vue.extend({
    template: ' <table class="table">\n                        <thead>\n                        <tr>\n                            <td>#</td>\n                            <td>Cliente</td>\n                            <td>Serviço</td>\n                            <td>Valor</td>\n                            <td>Recebido?</td>\n                            <td>Data recebimento</td>\n                            <td>Ações</td>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr v-for="(index, o) in bills">\n                            <td>{{ index +1 }}</td>\n                            <td>{{ o.name }}</td>\n                            <td>{{ o.service }}</td>                        \n                            <td>{{ o.value | numberFormat }}</td>\n                            <td>{{ o.done | receiveLabel }}</td>\n                              <td>{{ o.date_due }}</td>\n                            <td>\n                               <!-- <span style="margin: 5px;cursor: pointer;" @click.prevent="editaConta(o)"   title="Editar" aria-hidden="true" class="glyphicon glyphicon-pencil"></span>-->\n                               <span style="margin: 5px;cursor: pointer;" v-link="{name: \'bill-receive.update\', params:{id:o.id}}"  title="Editar" aria-hidden="true" class="glyphicon glyphicon-pencil"></span>\n                               <span @click.prevent="excluiConta(o);" title="Exluir" aria-hidden="true" class="glyphicon glyphicon-remove"></span>\n                                <span @click.prevent="baixaConta(o, true, index);" title="Marcar como paga" aria-hidden="true" class="glyphicon glyphicon-thumbs-up"></span>\n                                <span @click.prevent="baixaConta(o, false, index);" title="Marcar como não paga" aria-hidden="true" class="glyphicon glyphicon-thumbs-down"></span>\n                             </td>\n                        </tr>\n                        </tbody>\n                    </table>\n                ',
    data: function data() {
        return {
            bills: []
        };
    },
    created: function created() {
        var _this = this;

        // var resource = this.$resource('bills{/id}');

        BillReceived.query().then(function (response) {
            _this.bills = response.data;
        });
    },

    methods: {
        excluiConta: function excluiConta(bill) {
            var _this2 = this;

            var confimra = confirm("Deseja excluir a conta?");
            if (bill.id > -1 && confimra) {
                //  this.$root.$children[0].billsReceive.splice(index, 1);
                BillReceived.delete({ 'id': bill.id }).then(function (response) {
                    _this2.bills.$remove(bill);
                    _this2.$dispatch('change-info-receive');
                    _this2.$router.go({ name: 'bill-receive.list' });
                });
            }
        },
        baixaConta: function baixaConta(bill, status, index) {
            var _this3 = this;

            bill.done = status;
            // this.$root.$children[0].billsPay[index] = bill;

            BillReceived.update({ id: bill.id }, bill).then(function (response) {
                _this3.$dispatch('change-info-receive');
                _this3.$router.go({ name: 'bill-receive.list' });
            });
        }
    }
});