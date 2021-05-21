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
                    <router-link class="nav-link" to="/about">Informations du groupe</router-link>
                </li>
            </ul>
            <div>

            </div>
            <div v-if="getUser !== null">
                <img class="avatar" src="@/assets/avatar-visiteur.jpeg" alt="">
                <strong class="user">{{ getUser[0].login }}</strong>
                <button type="button" class="btn add-prat btn-connect" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i class="fas fa-user-plus"></i> Ajouter un praticien
                </button>
                <button class="btn btn-connect" @click="disconnect"><i class="fas fa-sign-out-alt"></i> Se déconnecter</button>
            </div>
                <router-link class="btn btn-connect" v-if="getUser === null" to="/login"><i class="far fa-user"></i> Se connecter</router-link>
            </div>
        </div>
        </nav>
        <!-- Modal -->
         <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Ajouter un praticien</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="form-add-prat" @submit.prevent="addPrat">
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                <label for="inputEmail4">Prénom</label>
                                <input type="text" class="form-control" name="prenom" id="inputPrenom" placeholder="Ex: Simon" required>
                                </div>
                                <div class="form-group col-md-6">
                                <label for="inputPassword4">Nom</label>
                                <input type="text" class="form-control" name="nom" id="inputNom" placeholder="Ex: Martin" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputAddress">Address</label>
                                <input type="text" class="form-control" name="adresse" id="inputAddress" placeholder="12 rue des acacias" required>
                            </div>
                            <div class="form-group">
                                <label for="inputAddress">Code postal</label>
                                <input type="text" class="form-control" name="code_postal" id="inputCodePostal" placeholder="91340" required>
                            </div>
                            <div class="form-group">
                                <label for="inputAddress">Ville</label>
                                <input type="text" class="form-control" name="ville" id="inputCity" placeholder="vigneux" required>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                <label for="inputCity">Email</label>
                                <input type="text" class="form-control" name="email" id="inputEmail" placeholder="Ex: joe@gmail.com" required>
                                </div>
                                <div class="form-group col-md-4">
                                <label for="inputState">Visite</label>
                                <select id="inputState" name="is_visite" class="form-control">
                                    <option selected>Jamais visité</option>
                                    <option>Déjà visité</option>
                                </select>
                            </div>
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-warning" data-bs-dismiss="modal">Annulé</button>
                                <button type="submit" class="btn btn-primary add-prat">Ajouter ce praticien</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    methods:{
        addPrat: function(){
            const form = document.querySelector('.form-add-prat')
            const formData = new FormData(form);
            console.log(form)
             var object = {};
             formData.forEach((value, key) => object[key] = value);
            // var object = {};
            // if (object.is_visite === 'Jamais visité'){
            //     object.visite = false;
            // }else{
            //     object.visite = true;
            // }
            
            var json = JSON.stringify(object);
            console.log(json)
            fetch('http://localhost:90/gsb/praticien', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json; charset=utf-8',  
                },
                credentials: 'include',
                body: json
            })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
            })
            .then((err) => {
                console.log('adde prat: ' + err)
            })
        },
        disconnect: function(){
            fetch('http://localhost:90/gsb/role/ulee', {
                method: 'GET',
                headers:{
                    'Content-Type': 'Application/json; charset=utf-8',
                    'Authorization': 'Basic 123456'
                },
                credentials: 'include'
            })
            .then(() => {
                this.$router.push('/login')
            })
            this.disconnectButton = false
            this.connectButton = true
            this.$store.dispatch('user', null)
            this.$store.dispatch('praticien', null)
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

.form-group{
    width: 100%;
}
</style>