<template>
  <div>
    <div class="card-praticien">
        <router-link :to="{ name: 'Profile', params: { id: praticien.id} }">
            <div class="avatar">
                <img src="@/assets/avatar-praticien.png" class="avatar" alt="">
                <div class="nom">{{ praticien.nom }} {{ praticien.prenom }}</div>
            </div>            
            <div class="specialite">{{ praticien.specialite.specialiteLibelle }}</div>
            <div class="visite">{{ visite }}</div>
            <div class="localite"><i class="fas fa-street-view"></i> {{ praticien.ville }}</div>
        </router-link>
    </div>
  </div>
</template>

<script>
export default {
    name: 'card',
    data(){
        return{
            visite: ''
        }
    },
    props:['praticien'],
    mounted(){
        if(this.praticien.visite){
            this.visite = 'Déjà visité'
        }else{
            this.visite = 'Pas encore visité'
        }
    }
}
</script>

<style scoped>
.card-praticien{
    margin: auto;
    position: relative;
    width: 100%;
    height: 200px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    margin: 20px;
    transition: .4s ease-in-out;
}

.card-praticien:hover{
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
    transition: .4s ease-in-out;
}

.center{
    align-items: center;
    display: flex;
    justify-content: space-around;
}

.avatar{
    width: 70px;
    display: flex;
    border-radius: 50%;
    align-items: center;
    margin-left: 10px;
}

.nom{
    /* position: absolute; */
    padding: 20px;
    
}

.visite{
    position: absolute;
    bottom: 10px;
    left: 10px;
}

.localite{
    position: absolute;
    right: 10px;
    top: 10px;
}

.specialite{
    position: absolute;
    right: 10px;
    bottom: 10px;
}
</style>