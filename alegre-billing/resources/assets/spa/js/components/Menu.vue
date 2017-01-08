<template>
    <ul :id="o.id" class="dropdown-content" v-for="o in menusDropdown">
        <li v-for="item in o.items"><a :href="item.url">{{item.name}}</a></li>

    </ul>
    <ul :id="dropdown-logout" class="dropdown-content" >
        <li>
            <a v-link="{name: 'auth.logout'}">Sair</a>
        </li>

    </ul>
    <div class="navbar-fixed">
        <!-- <nav class="teal">-->
        <nav>
            <div class="nav-wrapper">
                <div class="col s12">
                   <div class="col s5"> <a href="#" class="brand-logo left yellow-text text-lighten-3">BILLING ALEGRE</a></div>
                    <a href="#" data-activates="nav-mobile" class="button-collapse"><i class="material-icons">menu</i></a>
                    <ul class="right hide-on-med-and-down">
                        <li v-for="o in menus">
                            <a  v-if="o.dropdownId" class="dropdown-button" href="!#" :data-activates="o.dropdownId">{{o.name}} <i class="material-icons right">arrow_drop_down</i> </a>
                            <a v-else :href="o.url">{{o.name}}</a>
                        </li>
                        <li>
                            <a  class="dropdown-button"  :data-activates="dropdown-logout">
                             {{name}} <i class="material-icons right">arrow_drop_down</i> </a>

                        </li>
                    </ul>
                </div>
                <ul id="nav-mobile" class="side-nav">
                    <li v-for="o in menus"><a :href="o.url">{{o.name}}</a></li>
                </ul>

            </div>

        </nav>
    </div>

</template>
<script>
import Auth from '../services/auth';
    export default{
        computed:{
            name(){
                return this.user.data ? this.user.data.name:'';
            }
        },
        ready(){
            $('.button-collapse').sideNav();
            $('.dropdown-button').dropdown();
        },
        data(){
            return{
                menus: [
                    { name: "Conta bancária", routeName:"bank-account.list"}
                ],
                menusDropdown:[],
                user : Auth.user
            };
        }
    }
</script>
