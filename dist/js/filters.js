'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by awichmann on 23/08/2016.
 */
/*Vue.filter("doneLabel", function (value) {
    if (value == 0) {
        return 'Não paga';
    } else {
        return 'Paga';
    }
});*/
Vue.filter('statusGeneral', function (value) {
    if (value === false) {
        return 'Nenhuma conta cadastrada';
    }

    if (!value) {
        return 'Nenuma conta a pagar';
    } else {
        return value + ' contas à pagar';
    }
});
Vue.filter("doneLabel", function (value) {
    return value == 0 ? 'Não paga' : 'Paga';
});
Vue.filter("receiveLabel", function (value) {
    return value == 0 ? 'Não' : 'Sim';
});
/*
Vue.filter("receiveLabel", function (value) {
    if (value == 0) {
        return 'Não';
    } else {
        return 'Sim';
    }
});
*/

Vue.filter("totalLabel", function (value) {

    return !value ? 'Nenhuma conta a pagar' : value + ' contas à pagar';
    /* if (value == 0) {
         return 'Não';
     } else {
         return 'Sim';
     }*/
});

Vue.filter('numberFormat', {
    read: function read(value) {
        //mostra info na view
        var number = 0;
        if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== undefined) {
            var numberRegex = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g);
            number = numberRegex ? numberRegex[0] : numberRegex;
        }
        /*return new Number(number).toLocaleString('pt-BR',{minimumFractionDigits: 2, maximumFractionDigits: 2, style:'currency',
        currency: 'BRL'})
        */
        return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2, style: 'currency',
            currency: 'BRL' }).format(number);
    },
    write: function write(value) {
        // pegar valor da view converter para armazenar no model
        var number = 0;
        if (value.length > 0) {
            number = value.replace(/[^\d\,]/g, '').replace(/\,/g, '.');
            number = isNaN(number) ? 0 : parseFloat(number);
        }
        return number;
    }
});

Vue.filter('dateFormat', {
    read: function read(value) {
        //mostra info na view
        if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== undefined) {
            if (!(value instanceof Date)) {
                var dateRegex = value.match(/\d{4}\-\d{2}\-\d{2}/g);
                var dataString = dateRegex ? dateRegex[0] : dateRegex;
                if (dataString) {
                    value = new Date(dataString + "T03:00:00");
                } else {
                    return value;
                }
            }
            return new Intl.DateTimeFormat('pt-BR').format(value).split(' ')[0];
        }
        return value;
    },
    write: function write(value) {
        // pegar valor da view converter para armazenar no model
        var dateRegex = value.match(/\d{2}\/\d{2}\/\d{4}/g);
        if (dateRegex) {
            var dateString = dateRegex[0];
            var date = new Date(dateString.split('/').reverse().join('-') + "T03:00:00");
            if (!isNaN(date.getTime())) {
                return date;
            }
        }
        return value;
    }
});