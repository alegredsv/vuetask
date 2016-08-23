/**
 * Created by awichmann on 23/08/2016.
 */
window.menuComponent = Vue.extend({
    template: `
         <nav>
                    <ul>
                        <li><a href="#" @click.prevent="showView(0)">Listar contas</a></li>
                        <li><a href="#" @click.prevent="novaConta()">Nova conta</a></li>
                    </ul>
                </nav>
        `,
    data: function () {
        return{
            menus: [
                {id: 0, name: "Listar contas"}, {id: 1, name: "Criar contas"}
            ],
        };
    },
    methods:{
        showView: function (number) {
            this.$dispatch('change-activedview', number);
            // this.$parent.activedView = number;
            if(number == 1){
                this.$dispatch('change-formtype','insert');
                // this.$root.$children[0].formType = 'insert';
            }
        },
        novaConta:function () {
            this.$root.$children[0].bill = {
                date_due: '',
                name: '',
                value: 0,
                done: 0
            };
            //this.$root.$children[0].formType = 'insert';
            this.$dispatch('change-formtype','insert');
            //this.$root.$children[0].activedView = 1;
            this.$dispatch('change-activedview', 1);
        }
    }


});