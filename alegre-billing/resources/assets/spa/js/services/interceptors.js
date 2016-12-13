import Auth from './auth';
Vue.http.interceptors.push((request, next) => {
    request.headers.set('Authorization',Auth.getAutorizationHeader());
    next();
});

Vue.http.interceptors.push((request, next) => {
    next((response) => {
        if(response.status === 401 || response.status === 0){ //token expirado
            return Auth.refreshToken().then(() =>{
                return Vue.http(request);
            });
        }
    });
});