<template>
  <div class="login center">
    <form @submit.prevent="connection">
        <h2>Connexion</h2>
        <div class="mb-3" v-show="ok">
            <div class="alert alert-danger text-center" role="alert">
                Bad login or password
            </div>
        </div>
        <div class="mb-3" v-show="emptyInput">
            <div class="alert alert-danger text-center" role="alert">
                Fill in the form correctly
            </div>
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Login</label>
            <input type="text" class="form-control" v-model="login" required>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" v-model="password" required>
        </div>
        <button type="submit" class="btn btn-primary">Je me connecte</button>
    </form>
  </div>
</template>

<script>
export default {
    name: 'login',
    data(){
        return{
            login: '',
            password: '',
            ok: false,
            emptyInput: false,
            connected: false
        }
    },
    methods:{
        connection: function(){
            if(this.login.length !== 0 && this.password.length !== 0){
                const credential = window.btoa(this.login + ':' +  this.password);
                let h = new Headers();
                const url = 'http://localhost:90/gsb/role/' + this.login.toLowerCase();
                h.append('Content-Type', 'Application/json; charset=utf-8');
                h.append('Authorization', 'Basic ' + credential);
                h.append('credentials', 'include');
                let req = new Request(url, {
                    method: 'GET',
                    headers: h,
                })
                fetch(req)
                .then((response) => {
                    console.log(response)
                    if(response.status === 200){
                        this.$router.push('/')
                        // localStorage.setItem('user_credential', credential)
                        // localStorage.setItem('userName', this.login)
                        return response.json()
                    }else if(response.status === 401){
                        console.log('user non autorisé')
                        this.ok = true
                    }   
                })
                .then((data) => {
                    this.$store.dispatch('user', data)
                    this.$store.dispatch('credential', credential)
                    console.log('data from login ' + data)
                })
                .catch((err) => {
                    console.log(err)
                })
            }else{
                this.emptyInput = true
            }
            
        }
    }
}
</script>

<style scoped>
.login{
    height: 92vh;
    background: linear-gradient(to bottom,  #87e0fd 0%,#53cbf1 40%,#05abe0 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
}

h2{
    text-align: center;
}

form{
    width: 400px;
}

input,
.btn{
    margin: auto;
    width: 100%;
}

</style>