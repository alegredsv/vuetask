<template>
    <ul :id="o.id" class="dropdown-content" v-for="o in config.menusDropdown">
        <li v-for="item in o.items" :class="menuItemClass(item)"><a :href="item.url">{{item.name}}</a></li>

    </ul>
    <ul :id="dropdown-logout" class="dropdown-content" >
        <li>
            <a :href="config.urlLogout" @click.prevent="goToLogout()">Sair
                <form id="logout-form" :action="config.urlLogout" method="POST" style="display: none;">
                    <input type="hidden" name="_token" :value="config.csrfToken" />
                </form>
            </a>
        </li>
    </ul>
    <div class="navbar-fixed">
        <!-- <nav class="teal">-->
        <nav>
            <div class="nav-wrapper">
                <div class="col s12">
                    <a href="#" class="brand-logo left yellow-text text-lighten-3">Billing Admin</a>
                    <a href="#" data-activates="nav-mobile" class="button-collapse"><i class="material-icons">menu</i></a>
                    <ul class="right hide-on-med-and-down">
                        <li v-for="o in config.menus" :class="menuItemClass(o)">
                            <a  v-if="o.dropdownId" class="dropdown-button" href="!#" :data-activates="o.dropdownId">{{o.name}} <i class="material-icons right">arrow_drop_down</i> </a>
                            <a v-else :href="o.url">{{o.name}}</a>
                        </li>
                        <li>
                            <a  class="dropdown-button"  :data-activates="dropdown-logout">
                             {{config.name}} <i class="material-icons right">arrow_drop_down</i> </a>

                        </li>
                    </ul>
                </div>
                <ul id="nav-mobile" class="side-nav">
                    <li v-for="o in config.menus"><a :href="o.url">{{o.name}}</a></li>
                </ul>

            </div>

        </nav>
    </div>

</template>
<script>

    export default{
        props:{
          config:{
              type: Object,
              default(){
                  return {
                      name: '',
                      menus:[],
                      menusDropdown: [],
                      urlLogout:'/admin/logout',
                      csrfToken: ''
                  }
              }
          }
        },
        ready(){
            $('.button-collapse').sideNav();
            $('.dropdown-button').dropdown();
        },
        methods:{
            goToLogout(){
               $("#logout-form").submit();
             },
            menuItemClass(menu){
                let menuClass = ['active'];
                if(menu.active){
                    return menuClass;
                }
                if(menu.dropdownId !== undefined){
                    let dropDown = this.config.menusDropdown.find((elemento) => {
                                return elemento.id = menu.dropdownId;
                            });
                    if(dropDown){
                        for(let o of dropDown.items){
                            if(o.active){
                                return menuClass;
                            }
                        }
                    }

                }
            }
        },
        data(){
            return{
                menus: [
                    {id: 0, name: "Contas a pagar", routeName:"bill-pay.list", dropdownId:"bill-pay"},
                    {id: 1, name: "Contas a receber", routeName:"bill-receive",dropdownId:"bill-receive"},
                    {id: 2, name: "Dashboard", routeName:"dashboard"}
                ],
                menusDropdown:[
                    {id: 'bill-pay', items:[
                        {id: 0, name: "Listar contas", routeName:"bill-pay.list"},
                        {id: 1, name: "Criar contas", routeName:"bill-pay.create"}

                    ]},
                    {id: 'bill-receive', items:[
                        {id: 0, name: "Listar contas", routeName:"bill-receive.list"},
                        {id: 1, name: "Criar contas", routeName:"bill-receive.create"}

                    ]}

                ]
            };
        }
    }
</script>
