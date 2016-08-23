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