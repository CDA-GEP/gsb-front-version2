<template>
  <div class="praticien">
      <div class="main-frame">
        <formulaire-praticien v-bind:shadow="false" class="form-prat"></formulaire-praticien>
        <div class="">  
            <div class="container resultat">
                <div class="row">
                     <card-praticien class="col-xs-12 col-md-6 center"
                        v-for="praticien in getPraticien" 
                        v-bind:key="praticien.id"
                        v-bind:praticien="praticien"
                        ></card-praticien>
                    </div>
                </div>    
            </div> 
      </div>
     <prat-map class="mapAllPrat" id="mapid" v-if="getPraticien" v-bind:pratData="getPraticien" ></prat-map>
  </div>
</template>

<script>
import formulairePraticien from '@/components/FormulairePraticien'
import pratMap from '@/components/Map'
import cardPraticien from '@/components/Card'
export default {
    components:{
        formulairePraticien,
        pratMap,
        cardPraticien,
    },
    computed:{
        getPraticien: function(){
            return this.$store.getters.getPraticien
        }
    }
}
</script>

<style>
    .praticien{
        display: flex;
    }

    .resultat{
        overflow-y: scroll;
        height: 75vh;
    }

    .main-frame{
        width: 70%;
        
    }

    .mapAllPrat{
        height: 93vh;
        width: 30%;
        border-left: 1px solid rgba(0, 0, 0, 0.2);
    }

    .form-prat{
        width: 100%;
    }
</style>
