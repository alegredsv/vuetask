/**
 * Created by awichmann on 23/08/2016.
 */
window.billComponent = Vue.extend({
    template: `
<div class="navbar-fixed">
         <nav>
         <div class="nav-wrapper container">
             
                 <a href="#" class="brand-logo right">Code contas</a>
                  <a href="#" data-activates="nav-mobile" class="button-collapse"><i class="material-icons">menu</i></a>
                  <ul class="left hide-on-med-and-down">
                        <li v-for="o in menus"><a v-link="{name: o.routeName}">{{o.name}}</a></li>
                    </ul>
                 
                    <ul id="nav-mobile" class="side-nav">
                        <li v-for="o in menus"><a v-link="{name: o.routeName}">{{o.name}}</a></li>
                    </ul>
                
             </div>
             
                </nav>
                </div>
                <router-view></router-view>
               
        `,
    created(){
        $(document).ready(function() {
            $('.button-collapse').sideNav();
        });

    },
    data() {
        return{
            menus: [
                // {id: 0, name: "Listar contas", url:"/bills"},
                // {id: 1, name: "Criar contas", url:"/bill/create"}
                {id: 0, name: "Contas a pagar", routeName:"bill-pay.list"},
                {id: 1, name: "Contas a receber", routeName:"bill-receive"},
                {id: 2, name: "Dashboard", routeName:"dashboard"}
            ],
        };
    }


});