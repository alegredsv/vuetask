'use strict';

/**
 * Created by awichmann on 23/08/2016.
 */
Vue.filter("doneLabel", function (value) {
    if (value == 0) {
        return 'Não paga';
    } else {
        return 'Paga';
    }
});

Vue.filter("receiveLabel", function (value) {
    if (value == 0) {
        return 'Não';
    } else {
        return 'Sim';
    }
});

Vue.filter("totalLabel", function (value) {

    return !value ? 'Nenhuma conta a pagar' : 'Existem ' + value + ' contas a pagar';
    /* if (value == 0) {
         return 'Não';
     } else {
         return 'Sim';
     }*/
});