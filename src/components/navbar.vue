<template>
  <div class="">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">GSB</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/about">About</router-link>
                </li>
            </ul>
            <div>

            </div>
            <div v-if="getUser !== null">
                <img class="avatar" src="@/assets/avatar-visiteur.jpeg" alt="">
                <strong class="user">{{ getUser }}</strong>
                <button class="btn add-prat btn-connect" @click="addPrat"><i class="fas fa-user-plus"></i> Ajouter un praticien</button>
                <button class="btn btn-connect" @click="disconnect"><i class="fas fa-sign-out-alt"></i> Se déconnecter</button>
            </div>
                <router-link class="btn btn-connect" v-if="getUser === null" to="/login"><i class="far fa-user"></i> Se connecter</router-link>
            </div>
        </div>
        </nav>
  </div>
</template>

<script>
export default {
    methods:{
        disconnect: function(){
            fetch('http://localhost:90/gsb/logout', {
                method: 'GET',
                headers:{
                    'Content-Type': 'Application/json; charset=utf-8'
                },
                credentials: 'include'
            })
            .then(() => {
                this.$router.push('/login')
            })
            this.disconnectButton = false
            this.connectButton = true
            this.$store.dispatch('user', null)
            localStorage.clear();
            this.$router.push('/login')
        }
    },
    computed:{
        getUser: function(){
            return this.$store.getters.getUserName
        }
    }
}
</script>

<style scoped>
nav{
    height: 8vh;
    background-color: white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding: 30px;
    color: black;
}

.navbar-brand{
    color: gray;
}

li a{
    text-decoration: none;
    color: gray;
}

.btn-connect{
    color: white;
    text-decoration: none;
}

button{
    margin-left: 10px;
}

.user{
    padding: 8px;
    margin-right: 10px;
}

.add-prat{
    background-color: #05abe0;
}

.avatar{
    width: 30px;
    border-radius: 50%;
}
</style>