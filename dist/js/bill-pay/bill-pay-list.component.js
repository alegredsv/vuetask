"use strict";

/**
 * Created by awichmann on 23/08/2016.
 */
window.billPayListComponent = Vue.extend({
    template: " <div class=\"container\">\n                  <div class=\"row\">\n                  <button class=\"btn btn-large waves-effect\">Meu bot\xE3o</button>\n                  <h4>Minhas contas \xE0 pagar</h4>\n                    <table class=\"bordered highlight centered responsive-table z-depth-5\">\n                        <thead>\n                        <tr>\n                            <th>#</th>\n                            <th>Vencimento</th>\n                            <th>Nome</th>\n                            <th>Valor</th>\n                            <th>Paga?</th>\n                            <th>A\xE7\xF5es</th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr v-for=\"(index, o) in bills\">\n                            <td>{{ index +1 }}</td>\n                            <td>{{ o.date_due | dateFormat }}</td>\n                            <td>{{ o.name }}</td>\n                            <td>{{ o.value | numberFormat}}</td>\n                            <td class=\"white-text\" :class=\"{'green lighten-2': o.done , 'red lighten-2':!o.done}\">{{ o.done | doneLabel }}</td>\n                            <td>\n                               <!-- <span style=\"margin: 5px;cursor: pointer;\" @click.prevent=\"editaConta(o)\"   title=\"Editar\" aria-hidden=\"true\" class=\"glyphicon glyphicon-pencil\"></span>-->\n                               <span style=\"margin: 5px;cursor: pointer;\" v-link=\"{name: 'bill-pay.update', params:{id:o.id}}\"  title=\"Editar\" aria-hidden=\"true\"><i class=\"material-icons\">edit</i></span>\n                               <span @click.prevent=\" openModalDelete();\" title=\"Exluir\" aria-hidden=\"true\" \"><i class=\"material-icons\">delete</i></span>\n                                <span @click.prevent=\"baixaConta(o, true, o.id);\" title=\"Marcar como paga\" aria-hidden=\"true\" class=\"glyphicon glyphicon-thumbs-up\"></span>\n                                <span @click.prevent=\"baixaConta(o, false, o.id);\" title=\"Marcar como n\xE3o paga\" aria-hidden=\"true\" class=\"glyphicon glyphicon-thumbs-down\"></span>\n                             </td>\n                        </tr>\n                        </tbody>\n                    </table>\n                    </div>\n                     \n                </div> \n                <modal :modal=\"modal\">\n                    <div slot=\"content\">\n                        <h4>Mensagem de confirmacao</h4>\n                        <p><strong>Deseja excluir essa conta?</strong>\n                       </p></div>\n                    <div slot=\"footer\">\n                       <button class=\"btn btn-flat waves-effect green lighten-2 modal-close modal-action\">OK</button>\n                         <button class=\"btn btn-flat waves-effect waves-red  modal-close modal-action\">Cancelar</button>\n                    </div>\n                </modal>\n               \n                ",

    data: function data() {
        return {
            bills: [],
            modal: {
                id: "modal-delete"
            }
        };
    },
    created: function created() {
        var _this = this;

        // var resource = this.$resource('bills{/id}');

        Bill.query().then(function (response) {
            _this.bills = response.data;
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
        },
        openModalDelete: function openModalDelete() {
            $('#modal-delete').openModal();
        }
    }
});