/**
 * Created by awichmann on 23/08/2016.
 */
window.modalComponent = Vue.extend({
    template: `
       <div  class="modal" >
            <div class="modal-content">
                <slot name="content"></slot>
            </div>
             <div class="modal-footer">
                <slot name="footer"></slot>
            </div>
        </div>
    `,
    props:['modal'],
    created(){

    },
    data(){
        return{
            modal:{
                id:''
            }
        };
    }
});