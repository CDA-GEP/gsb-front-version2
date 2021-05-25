<template>
  <div>
      <form 
      @submit.prevent="getData" 
      class="row gy-2 gx-3 align-items-center"
      :class=" shad ? null : 'hide-shadow' "
      >
        <div class="location-autocomplete col-auto">
        <div class="input-group">
            <div class="input-group-text"><i class="fas fa-map-marker-alt"></i></div>
            <input type="text" v-on:keyup="autocomplete" v-model="ville" class="form-control" id="localite" autocomplete="off" placeholder="Ex: Marseille" required>     
        </div>
        <div class="card card-autocomplete" v-if="showWindowCity">
            <div class="card-body">
                <ul class="ville-liste">
                    <li v-for="(ville, index) in villes" v-bind:key="index">
                        <h6 v-on:click="getCity(ville.locale_names.default[0])" v-if="index < 10" class="card-title"><i class="fas fa-globe-africa"></i> {{ ville.locale_names.default[0] }}</h6>
                    </li>
                </ul>
            </div>
        </div>
        </div>
        <div class="col-auto">
        <select class="form-select" v-model="specialite" id="specialite">
            <option v-bind:value="spe.id" v-for="spe in specialite_praticien" v-bind:key="spe.id">
                {{ spe.specialiteLibelle }}
            </option>
        </select>
        </div>
        <div class="col-auto">
        <label class="visually-hidden" for="autoSizingSelect">Preference</label>
        <select class="form-select" v-model="visite" id="visite">
            <option value="all">Tous</option>
            <option value="true">Déjà visité</option>
            <option value="false">Jamais visité</option>
        </select>
        </div>
        <div class="col-auto">
        <button type="submit" class="btn btn-primary get-prat"><i class="fas fa-search"></i> Recherché</button>
        </div>
    </form>
  </div>
</template>

<script>
export default {
    data(){
        return{
            shad: true,
            visite: '',
            ville: '',
            specialite: '',
            url: 'http://localhost:90/gsb/praticien?',
            urlAlgolia: 'https://places-dsn.algolia.net/1/places/query',
            villes: [],
            showWindowCity: false,
            url_specialite: 'http://localhost:90/gsb/specialite',
            specialite_praticien: []

        }
    },
    props:{
        shadow:{
            type: Boolean,
            default: true 
        }   
    },
    computed:{
        getCredentials: function(){
            return this.$store.getters.getCredentials
        }
    },
    methods:{
        getCity: function(city){
            const arrayCity = city.split(' ');
            this.ville = arrayCity[0]
            this.showWindowCity = false
        },
        autocomplete: async function(){
            await fetch(this.urlAlgolia, {
                method: "POST",
                body: JSON.stringify({ query: this.ville })
             })
            .then(response => response.json())
            .then((data) => {
                this.showWindowCity = true
                this.villes = data.hits
            })
            if(this.ville.length <= 0){
                this.showWindowCity = false
            }
        },
        getData: async function(){
            localStorage.removeItem('praticien')
            this.url = 'http://localhost:90/gsb/praticien?'
            if(this.ville !== ''){
                this.url += 'ville=' + this.ville
            }
            if(this.visite !== ''){
                this.url += '&visite=' + this.visite
            }
            if(this.specialite !== ''){
                this.url += '&specialiteid=' + this.specialite
            }
            console.log(this.url)
            await fetch(this.url, {
                headers:{
                    'Content-type': 'Application/json; charset=utf-8',
                    'Authorization': 'Basic ' + this.getCredentials
               },
               credentials: 'include'
            })
            .then((response) => {
               if(response.status === 401){
                   this.$router.push('/login')
               }else{
                  // console.log('le user des connecté')
                   this.$router.push('/praticien')
                   return response.json()
               } 
            })
            .then((data) => {
               this.$store.dispatch('praticien', data)
            })
            .catch((err) => {
                console.log(err)
            })
            this.ville = ''
        }
    },
    async created(){
        this.shad = this.shadow
        //faire un requête pour aller cherche les spécialités
        // et les afficher dans la vue via un boucle
        await fetch(this.url_specialite, {
            headers:{
                'Content-type': 'Application/json; charset=utf-8',
                'Authorization': 'Basic ' + this.getCredentials
            }
        })
        .then((response) => {
            if(response.status === 401){
                console.log('User pas autorisé')
            }else{
                return response.json()
            }
        })
        .then((data) => {
            this.specialite_praticien = data
        })
    }
}
</script>

<style scoped>
.input-group-text{
  background-color: white;
}

.hide-shadow{
    box-shadow: 0px 0px 0px;
}

.card-autocomplete{
    position: fixed;
    width: 30%;
    z-index: 10;
}

.ville-liste li{
    list-style: none;
}

.ville-liste li:hover{
    background-color: #0A5ED6;
    color: white;
    transition: .4s ease-in-out;
    border-radius: 5px;
    cursor: pointer;
}

.card-title{
    padding: 10px;
}

.fa-globe-africa{
    position: absolute;
    left: 20px;
}

</style>