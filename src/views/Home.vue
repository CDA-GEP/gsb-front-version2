<template>
<div class="formulaire center">
  <div>
    <h2 v-if="getUser !== null">Bonjour {{ getUser[0].login }}.
      Vous êtes connecté en tant que : 
      <p v-if="getUser[0].role === 'VISITEUR'">visiteur médical</p> 
      <p v-if="getUser[0].role === 'RESHUMAINE'">ressource humaine</p>
    </h2>

    <h3>Trouvez votre praticien</h3>
    <formulairePraticien></formulairePraticien>
  </div>
</div>
</template>

<script>
import formulairePraticien from '@/components/FormulairePraticien'
export default {
  components:{
    formulairePraticien
  },
  computed:{
    getUser: function(){
      return this.$store.getters.getUserName
    }
  }
}
</script>

<style scoped>

h2, h3{
  color: white;
  font-weight: bold;
  text-align: center;
  margin-bottom: 100px;
}

.formulaire{
  height: 92vh;
  background: linear-gradient(to bottom,  #87e0fd 0%,#53cbf1 40%,#05abe0 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */

}

</style>