<template>`
    <div class="container">
        <div class="row">
            <div class="row">
                <div class="col s6">
                    <page-title>
                        <h5>Nova conta bancária</h5>
                    </page-title>
                </div>
                <div class="col s6">
                    <page-title class="valign-wrapper">
                        <div class="valign">
                            <a class="waves-effect waves-light btn" v-link="{ name: 'bank-account.list'}">
                                <i class="material-icons">arrow_back</i>
                            </a>
                        </div>
                    </page-title>
                </div>

            </div>
            <div class="card-panel z-depth-5">
                 <form name="form" method="GET" @submit="submit()">
                     <div class="row">

                            <div class="input-field col s12">
                                <label class="active">Nome</label>
                                <input type="text" v-model="bankAccount.name" placeholder="Digite o nome" />
                            </div>
                     </div>

                     <div class="row">

                         <div class="input-field col s12">
                             <label class="active">Banco</label>
                             <select v-model="bankAccount.bank_id" id="bank_id" class="browser-default">
                                 <option value="" disabled selected>Escolha um banco</option>
                                 <option v-for="o in banks" :value="o.id">{{o.name}}</option>
                             </select>
                         </div>
                     </div>

                     <div class="row">

                         <div class="input-field col s6">
                             <label>Agência</label>
                             <input type="text" v-model="bankAccount.agency" placeholder="Digite a agência" />
                         </div>
                         <div class="input-field col s6">
                             <label>Conta corrente</label>
                             <input type="text" v-model="bankAccount.account" placeholder="Digite a conta" />
                         </div>
                     </div>


                     <div class="row">
                         <div class="input-field col s12">
                             <input type="checkbox" class="filled-in" v-model="bankAccount.default" id="account_default" />
                             <label for="account_default">Padrão?</label>

                         </div>
                     </div>



                 </form>

            </div>


            <div class="fixed-action-btn">
                <a class="btn-floating btn-large" href="#" @click.prevent="subimit()">
                    <i class="large material-icons">save</i>
                 </a>
            </div>
        </div>

    </div>
    </template>
    <modal :modal="modal">
        <div slot="content">
            <h4>Mensagem de confirmação</h4>
            <p><strong>Deseja excluir esta conta bancária?</strong></p>
            <div class="divider"></div>
            <p>Nome: <strong>{{ bankAccountToDelete.name }}</strong></p>
            <p>Agência: <strong>{{ bankAccountToDelete.agency }}</strong></p>
            <p>C/C: <strong>{{ bankAccountToDelete.account }}</strong></p>
            <div class="divider"></div>
        </div>
        <div slot="footer">
            <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action"
            @click="destroy()">OK</button>
            <button class="btn btn-flat waves-effect waves-red  modal-close modal-action"
                    >Cancelar</button>
        </div>

    </modal>

<script>
    import {BankAccount, Banks} from '../../services/resources';
    import PageTitleComponent from '../PageTitle.vue';

    export default{
        components:{
          'page-title' : PageTitleComponent

        },
        data(){
            return{
               bankAccounts:{
                   name: '',
                   agency: '',
                   account: '',
                   bank_id: '',
                   'default': false

               },
                banks:[]
            }
        },
        created(){
           this.getBanks();
        },
        methods:{
            getBanks(){
                Banks.query().then((response) => {
                                     this.banks = response.data.data;

                            });

            }

        }
    }
</script>
