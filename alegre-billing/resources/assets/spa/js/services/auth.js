import JwtToken from './jwt-token';
import LocalStorage from './localStorage';
import {User} from '../services/resources';

const USER = 'user';
const afterLogin = (response)=>{
    User.get().then((response) => {
        LocalStorage.setObject(USER,response.data);
    });
}
export default{
    login(email,password){
       return JwtToken.accessToken(email, password).then((response) => {
            afterLogin(response);
            return response;
        });

    },
    logout(){
       return JwtToken.revokeToken().then(
           this.afterLogout()).catch(this.afterLogout());
    },
    user(){
        return LocalStorage.getObject(USER);
    },
    check(){
        return JwtToken.token ? true : false;
    },
    afterLogout(){
       LocalStorage.remove(USER);
    },
    clearAuth(){
       LocalStorage.remove(USER);
    }
}
