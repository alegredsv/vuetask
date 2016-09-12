/**
 * Created by awichmann on 23/08/2016.
 */
window.billComponent = Vue.extend({
    template: `
         <nav>
                    <ul>
                    <li v-for="o in menus">
                    
                    <a v-link="{name: o.routeName}">{{o.name}}</a>
                    </li>
                     <!--   <li><a href="#" @click.prevent="showView(0)">Listar contas</a></li>
                        <li><a href="#" @click.prevent="novaConta()">Nova conta</a></li>
      -->              </ul>
                </nav>
                
                <router-view></router-view>
        `,
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