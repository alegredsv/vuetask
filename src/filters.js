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
            let numberRegex = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g);
            number = (numberRegex)?numberRegex[0] :numberRegex;
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
        if(value.length  > 0){
            number =  value.replace(/[^\d\,]/g,'')
                .replace(/\,/g,'.');
            number = isNaN(number) ? 0: parseFloat(number);
        }
         return number;
     }
});


Vue.filter('dateFormat',{
    read(value){ //mostra info na view
        if(value && typeof value !== undefined){
            if(!(value instanceof Date)){
                let dateRegex = value.match(/\d{4}\-\d{2}\-\d{2}/g);
                let dataString = dateRegex ? dateRegex[0] : dateRegex;
                if(dataString){
                    value = new Date(dataString+"T03:00:00");
                }else{
                    return value;
                }
            }
            return  new Intl.DateTimeFormat('pt-BR').format( value).split(' ')[0];
        }
        return value;
    }
    ,
    write(value){ // pegar valor da view converter para armazenar no model
        let dateRegex =  value.match(/\d{2}\/\d{2}\/\d{4}/g);
        if(dateRegex){
            let dateString = dateRegex[0];
            let date = new Date(dateString.split('/').reverse().join('-')+"T03:00:00");
            if(!isNaN(date.getTime())){
                return date;
            }
        }
        return value;

    }
})