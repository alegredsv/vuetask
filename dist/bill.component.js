"use strict";

/**
 * Created by awichmann on 23/08/2016.
 */
window.billComponent = Vue.extend({
    template: "\n         <nav>\n                    <ul>\n                    <li v-for=\"o in menus\">\n                    \n                    <a v-link=\"{name: o.routeName}\">{{o.name}}</a>\n                    </li>\n                     <!--   <li><a href=\"#\" @click.prevent=\"showView(0)\">Listar contas</a></li>\n                        <li><a href=\"#\" @click.prevent=\"novaConta()\">Nova conta</a></li>\n      -->              </ul>\n                </nav>\n                \n                <router-view></router-view>\n        ",
    data: function data() {
        return {
            menus: [
            // {id: 0, name: "Listar contas", url:"/bills"},
            // {id: 1, name: "Criar contas", url:"/bill/create"}
            { id: 0, name: "Contas a pagar", routeName: "bill-pay.list" }, { id: 1, name: "Contas a receber", routeName: "bill-receive" }, { id: 2, name: "Dashboard", routeName: "dashboard" }]
        };
    }

});