'use strict';

/**
 * Created by awichmann on 23/08/2016.
 */
window.modalComponent = Vue.extend({
    template: '\n       <div  class="modal" >\n            <div class="modal-content">\n                <slot name="content"></slot>\n            </div>\n             <div class="modal-footer">\n                <slot name="footer"></slot>\n            </div>\n        </div>\n    ',
    props: ['modal'],
    created: function created() {},
    data: function data() {
        return {
            modal: {
                id: ''
            }
        };
    }
});