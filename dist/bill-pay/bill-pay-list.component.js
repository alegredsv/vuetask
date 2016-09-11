'use strict';

/**
 * Created by awichmann on 23/08/2016.
 */
window.billPayListComponent = Vue.extend({
    template: ' <table class="table">\n                        <thead>\n                        <tr>\n                            <td>#</td>\n                            <td>Vencimento</td>\n                            <td>Nome</td>\n                            <td>Valor</td>\n                            <td>Paga?</td>\n                            <td>Ações</td>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr v-for="(index, o) in bills">\n                            <td>{{ index +1 }}</td>\n                            <td>{{ o.date_due }}</td>\n                            <td>{{ o.name }}</td>\n                            <td>{{ o.value | currency \'R$ \'}}</td>\n                            <td>{{ o.done | doneLabel }}</td>\n                            <td>\n                               <!-- <span style="margin: 5px;cursor: pointer;" @click.prevent="editaConta(o)"   title="Editar" aria-hidden="true" class="glyphicon glyphicon-pencil"></span>-->\n                               <span style="margin: 5px;cursor: pointer;" v-link="{name: \'bill-pay.update\', params:{id:o.id}}"  title="Editar" aria-hidden="true" class="glyphicon glyphicon-pencil"></span>\n                               <span @click.prevent="excluiConta(o);" title="Exluir" aria-hidden="true" class="glyphicon glyphicon-remove"></span>\n                                <span @click.prevent="baixaConta(o, true, o.id);" title="Marcar como paga" aria-hidden="true" class="glyphicon glyphicon-thumbs-up"></span>\n                                <span @click.prevent="baixaConta(o, false, o.id);" title="Marcar como não paga" aria-hidden="true" class="glyphicon glyphicon-thumbs-down"></span>\n                             </td>\n                        </tr>\n                        </tbody>\n                    </table>\n                ',

    data: function data() {
        return {
            bills: []
        };
    },
    created: function created() {
        // var resource = this.$resource('bills{/id}');
        var self = this;
        Bill.query().then(function (response) {
            self.bills = response.data;
        });
    },
    methods: {
        excluiConta: function excluiConta(bill) {
            //var resource = this.$resource('bills{/id}');
            var self = this;
            var confimra = confirm("Deseja excluir a conta?");
            if (bill.id > -1 && confimra) {
                //  this.$root.$children[0].billsPay.splice(index, 1);
                Bill.delete({ 'id': bill.id }).then(function (response) {
                    self.bills.$remove(bill);
                    self.$router.go({ name: 'bill-pay.list' });
                });
                self.$dispatch('change-info');
            }
        },
        baixaConta: function baixaConta(bill, status, index) {
            bill.done = status;
            // this.$root.$children[0].billsPay[index] = bill;
            var self = this;
            Bill.update({ id: bill.id }, bill).then(function (response) {
                self.$dispatch('change-info');
                self.$router.go({ name: 'bill-pay.list' });
            });
        }
    }
});