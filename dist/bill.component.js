'use strict';

/**
 * Created by awichmann on 23/08/2016.
 */
window.billComponent = Vue.extend({
    template: '\n<ul v-bind:id="o.id" class="dropdown-content" v-for="o in menusDropdown">\n    <li v-for="item in o.items"><a v-link="{name: item.routeName}">{{item.name}}</a></li>\n\n</ul>\n<div class="navbar-fixed">\n         <nav class="teal">\n         <div class="nav-wrapper container">\n             \n                 <a href="#" class="brand-logo right yellow-text text-lighten-3">Code contas</a>\n                  <a href="#" data-activates="nav-mobile" class="button-collapse"><i class="material-icons">menu</i></a>\n                  <ul class="left hide-on-med-and-down">\n                        <li v-for="o in menus">\n                            <a  v-if="o.dropdownId" class="dropdown-button" href="!#" v-bind:data-activates="o.dropdownId">{{o.name}} <i class="material-icons right">arrow_drop_down</i> </a>\n                        <a v-else v-link="{name: o.routeName}">{{o.name}}</a>\n                        </li>\n                    </ul>\n                 \n                    <ul id="nav-mobile" class="side-nav">\n                        <li v-for="o in menus"><a v-link="{name: o.routeName}">{{o.name}}</a></li>\n                    </ul>\n                \n             </div>\n             \n                </nav>\n                </div>\n                <router-view></router-view>\n               \n        ',
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