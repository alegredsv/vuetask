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
Vue.filter('statusGeneral', (value) =>{
    if(value === false){
        return 'Nenhuma conta cadastrada';
    }

    if(!value){
        return 'Nenuma conta a pagar';
    }else{
        return 'Exites '+value+' contas a serem pagas';
    }

})
Vue.filter("doneLabel",(value) => value == 0 ? 'Não paga':'Paga');
Vue.filter("receiveLabel",(value) => value == 0 ? 'Não':'Sim');
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

    return !value ? 'Nenhuma conta a pagar' : 'Existem ' + value + ' contas a pagar';
   /* if (value == 0) {
        return 'Não';
    } else {
        return 'Sim';
    }*/
});

Vue.filter('numberFormat',{
    read(value){ //mostra info na view
        let number = 0;
        if(value && typeof value !== undefined){
            number = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g)[0] || 0;
        }
        /*return new Number(number).toLocaleString('pt-BR',{minimumFractionDigits: 2, maximumFractionDigits: 2, style:'currency',
        currency: 'BRL'})
*/
        return new Intl.NumberFormat('pt-BR',{minimumFractionDigits: 2, maximumFractionDigits: 2, style:'currency',
            currency: 'BRL'}).format(number);
     }
    ,
     write(value){ // pegar valor da view converter para armazenar no model
        let number = 0;
        if(value > 0){
            number =  value.replace(/[^\d\,]/g,'')
                .replace(/\,/g,'.');
            number = isNaN(number) ? 0: parseFloat(number);
        }
         return number;
     }
})