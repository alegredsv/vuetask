"use strict";

/**
 * Created by awichmann on 23/08/2016.
 */
window.billComponent = Vue.extend({
    template: "\n<div class=\"navbar-fixed\">\n         <nav>\n         <div class=\"nav-wrapper container\">\n             \n                 <a href=\"#\" class=\"brand-logo right\">Code contas</a>\n                  <a href=\"#\" data-activates=\"nav-mobile\" class=\"button-collapse\"><i class=\"material-icons\">menu</i></a>\n                  <ul class=\"left hide-on-med-and-down\">\n                        <li v-for=\"o in menus\"><a v-link=\"{name: o.routeName}\">{{o.name}}</a></li>\n                    </ul>\n                 \n                    <ul id=\"nav-mobile\" class=\"side-nav\">\n                        <li v-for=\"o in menus\"><a v-link=\"{name: o.routeName}\">{{o.name}}</a></li>\n                    </ul>\n                \n             </div>\n             \n                </nav>\n                </div>\n                <router-view></router-view>\n               \n        ",
    created: function created() {
        $(document).ready(function () {
            $('.button-collapse').sideNav();
        });
    },
    data: function data() {
        return {
            menus: [
            // {id: 0, name: "Listar contas", url:"/bills"},
            // {id: 1, name: "Criar contas", url:"/bill/create"}
            { id: 0, name: "Contas a pagar", routeName: "bill-pay.list" }, { id: 1, name: "Contas a receber", routeName: "bill-receive" }, { id: 2, name: "Dashboard", routeName: "dashboard" }]
        };
    }
});