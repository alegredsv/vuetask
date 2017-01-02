<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Meu dashboard</div>

                    <div class="panel-body">
                    meu conteudo
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Auth from '../services/auth';
    //import {User} from '../services/resources'
    export default {
        ready(){
            console.log(Auth.user);
//            User.get().then((response) => {
//                console.log(response.data);
//            });
//            console.log(Auth.user());
        }
    }
</script>
