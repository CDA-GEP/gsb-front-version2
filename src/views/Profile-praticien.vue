<template>
    <div class="praticien">
      <div class="main-frame container">
          <!-- <router-link to="/"><i class="fas fa-chevron-circle-left"></i></router-link> -->
        <formulaire-praticien v-bind:shadow="false" class="form-prat"></formulaire-praticien>
            <div class="alert alert-warning" v-if="!visited" role="alert">
                Ce praticien n'a jamais été visité.
            </div>
            <div class="alert alert-success" v-else role="alert">
                Ce praticien a déjà été visité.
            </div>
            <div class="card-bloc">
                <div class="card card-prat" style="width: 18rem;">
                    <img src="@/assets/avatar-praticien.png" class="card-img-top avatar-show-prat" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{ prenom }} {{ nom }}</h5>
                        <!-- <p class="card-text">{{ specialite }}</p> -->
                        <p class="card-text"><em>{{ adresse }} {{ postal }} {{ ville }}</em></p>
                        <a href="#" class="btn btn-warning btn-show">Modifier les informations</a>
                        <a href="#" class="btn btn-warning btn-show">Créer un rapport</a>
                        <a href="#" class="btn btn-danger btn-show">Supprimer ce praticien</a>
                    </div>
                </div>
                <div class="card card-infos" style="width: 70%;">
                    <div class="card-body">
                        <strong>Prénom et nom: </strong><span>{{ prenom }} {{ nom }}</span>
                        <hr>
                        <strong>Email: </strong><span>soins-medecin-sud@gmail.com</span>
                        <hr>
                        <!-- <strong>Spécialité: </strong><span>{{ specialite }}</span> -->
                        <hr>
                        <strong>Adresse du cabinet: </strong><span>{{adresse}} {{ postal }} {{ ville }}</span>
                    </div>
                </div>
            </div>
      </div>
     <map-prat class="mapAllPrat" v-if="pratInfo" v-bind:pratData="[pratInfo]"></map-prat>
  </div>
</template>

<script>
import formulairePraticien from '@/components/FormulairePraticien'
//import pratMap from '@/components/Map'
import mapPrat from '@/components/Mappraticien'
export default {
    name: 'page-profile',
    components:{
        formulairePraticien,
        //pratMap,
        mapPrat
    },
    data(){
        return{
            ville: '',
            postal: '',
            nom: '',
            prenom: '',
            specialite: '',
            adresse: '',
            pratInfo: '',
            visited: false
        }
    },
    mounted(){
        fetch('http://localhost:90/gsb/praticien/' + this.$route.params.id, {
            methods: 'GET',
            headers: {
                "Content-type": "Application/json",
                "Authorization": "Basic " + this.$store.getters.getCredentials
            },
            credentials: 'include'
        })
        .then((response) => {
            if(response.status === 401){
                console.log(('cet utilisateur nexiste pas'))
            }else{
                return response.json()
            }
        })
        .then((data) => {
            this.ville = data.ville
            this.postal = data.codePostal
            this.adresse = data.adresse
            this.nom = data.nom
            this.prenom = data.prenom
            this.visited = data.visite
            this.specialite = data.specialite.specialite
            this.pratInfo = data
        })
    }

}
</script>

<style scoped>

.fa-chevron-circle-left{
    position: absolute;
    top: 70px;
    left: 15px;
    font-size: 30px;
}

/* .main-frame-prat{
    width: 70%;
} */

.card-bloc{
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: auto;
}

.card-prat{
    padding: 10px;
    text-align: center;
}

.card-prat p{
    color: gray;
}

.avatar-show-prat{
    margin: auto;
    width: 50%;
    border-radius: 50%;
}

.card-title{
    padding: 10px;
}

.btn-show{
    width: 100%;
    margin: 5px 0px;
    background-color: #05abe0;
}

.card-infos span{
    color: gray;
}

.card-infos{
    margin-left: 10px;
}
</style>