<template>
    <ul v-bind:id="o.id" class="dropdown-content" v-for="o in menusDropdown">
        <li v-for="item in o.items"><a v-link="{name: item.routeName}">{{item.name}}</a></li>

    </ul>
    <div class="navbar-fixed">
        <!-- <nav class="teal">-->
        <nav>
            <div class="nav-wrapper container">

                <a href="#" class="brand-logo right yellow-text text-lighten-3">Code contas</a>
                <a href="#" data-activates="nav-mobile" class="button-collapse"><i class="material-icons">menu</i></a>
                <ul class="left hide-on-med-and-down">
                    <li v-for="o in menus">
                        <a  v-if="o.dropdownId" class="dropdown-button" href="!#" v-bind:data-activates="o.dropdownId">{{o.name}} <i class="material-icons right">arrow_drop_down</i> </a>
                        <a v-else v-link="{name: o.routeName}">{{o.name}}</a>
                    </li>
                </ul>

                <ul id="nav-mobile" class="side-nav">
                    <li v-for="o in menus"><a v-link="{name: o.routeName}">{{o.name}}</a></li>
                </ul>

            </div>

        </nav>
    </div>

    <router-view></router-view>
</template>
<script>
    import HeaderComponent from './components/header.vue'
    import OtherComponent from './components/other.vue'
    export default{
        props:{
          config:{
              type: Object,
              default(){
                  return {
                      name: '',
                      menus:[],
                      menusDropdown: [],
                      urlLogout:'/admin/logout'
                  }
              }
          }
        },
        ready(){
            $('.button-collapse').sideNav();
            $('.dropdown-button').dropdown();
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
