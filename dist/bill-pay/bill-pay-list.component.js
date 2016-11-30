"use strict";

/**
 * Created by awichmann on 23/08/2016.
 */
window.billPayListComponent = Vue.extend({
    template: " <div class=\"container\">\n                  <div class=\"row\">\n                  <button class=\"btn btn-large waves-effect\">Meu botão</button>\n                  <h4>Minhas contas à pagar</h4>\n                    <table class=\"bordered highlight centered responsive-table z-depth-5\">\n                        <thead>\n                        <tr>\n                            <th>#</th>\n                            <th>Vencimento</th>\n                            <th>Nome</th>\n                            <th>Valor</th>\n                            <th>Paga?</th>\n                            <th>Ações</th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr v-for=\"(index, o) in bills\">\n                            <td>{{ index +1 }}</td>\n                            <td>{{ o.date_due | dateFormat }}</td>\n                            <td>{{ o.name }}</td>\n                            <td>{{ o.value | numberFormat}}</td>\n                            <td class=\"white-text\" :class=\"{'green lighten-2': o.done , 'red lighten-2':!o.done}\">{{ o.done | doneLabel }}</td>\n                            <td>\n                               <!-- <span style=\"margin: 5px;cursor: pointer;\" @click.prevent=\"editaConta(o)\"   title=\"Editar\" aria-hidden=\"true\" class=\"glyphicon glyphicon-pencil\"></span>-->\n                               <span style=\"margin: 5px;cursor: pointer;\" v-link=\"{name: 'bill-pay.update', params:{id:o.id}}\"  title=\"Editar\" aria-hidden=\"true\"><i class=\"material-icons\">edit</i></span>\n                               <span @click.prevent=\"excluiConta(o);\" title=\"Exluir\" aria-hidden=\"true\" \"><i class=\"material-icons\">delete</i></span>\n                                <span @click.prevent=\"baixaConta(o, true, o.id);\" title=\"Marcar como paga\" aria-hidden=\"true\" class=\"glyphicon glyphicon-thumbs-up\"></span>\n                                <span @click.prevent=\"baixaConta(o, false, o.id);\" title=\"Marcar como não paga\" aria-hidden=\"true\" class=\"glyphicon glyphicon-thumbs-down\"></span>\n                             </td>\n                        </tr>\n                        </tbody>\n                    </table>\n                    </div>\n                     <a id=\"btnmodal\" class=\"btn waves-effect\" href=\"#modalOk\" >Modsssssssssssal show</a>\n                   <div id=\"modalOk\" class=\"modal\">\n                        <div class=\"modal-content\">\n                            <h2>Meu primeiro modal</h2>\n                            <p>Laravel com vue js</p>\n                        </div>\n                        <div class=\"modal-footer\">\n                        <button class=\"btn btn-flat green\">OK</button>\n                        </div>\n                 </div>\n                </div> \n               \n                ",

    data: function data() {
        return {
            bills: []
        };
    },
    created: function created() {
        var _this = this;

        // var resource = this.$resource('bills{/id}');

        Bill.query().then(function (response) {
            _this.bills = response.data;
        });
        $(document).ready(function () {
            $("#btnmodal").leanModal();
        });
    },

    methods: {
        excluiConta: function excluiConta(bill) {
            var _this2 = this;

            //var resource = this.$resource('bills{/id}');
            var self = this;
            var confimra = confirm("Deseja excluir a conta?");
            if (bill.id > -1 && confimra) {
                //  this.$root.$children[0].billsPay.splice(index, 1);
                Bill.delete({ 'id': bill.id }).then(function (response) {
                    _this2.bills.$remove(bill);
                    _this2.$router.go({ name: 'bill-pay.list' });
                });
                self.$dispatch('change-info');
            }
        },
        baixaConta: function baixaConta(bill, status, index) {
            var _this3 = this;

            bill.done = status;
            // this.$root.$children[0].billsPay[index] = bill;
            var self = this;
            Bill.update({ id: bill.id }, bill).then(function (response) {
                _this3.$dispatch('change-info');
                _this3.$router.go({ name: 'bill-pay.list' });
            });
        }
    }
});