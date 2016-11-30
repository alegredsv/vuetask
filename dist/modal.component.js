'use strict';

/**
 * Created by awichmann on 23/08/2016.
 */
window.modalComponent = Vue.extend({
    template: '\n               \n        ',
    created: function created() {
        $(document).ready(function () {
            $('.button-collapse').sideNav();
            $('.dropdown-button').dropdown();
        });
    },
    data: function data() {
        return {
            menus: [
            // {id: 0, name: "Listar contas", url:"/bills"},
            // {id: 1, name: "Criar contas", url:"/bill/create"}
            { id: 0, name: "Contas a pagar", routeName: "bill-pay.list", dropdownId: "bill-pay" }, { id: 1, name: "Contas a receber", routeName: "bill-receive", dropdownId: "bill-receive" }, { id: 2, name: "Dashboard", routeName: "dashboard" }],
            menusDropdown: [{ id: 'bill-pay', items: [{ id: 0, name: "Listar contas", routeName: "bill-pay.list" }, { id: 1, name: "Criar contas", routeName: "bill-pay.create" }] }, { id: 'bill-receive', items: [{ id: 0, name: "Listar contas", routeName: "bill-receive.list" }, { id: 1, name: "Criar contas", routeName: "bill-receive.create" }] }]
        };
    }
});