<template>
<div class="formulaire center">
  <div>
    <h1 v-if="getUser !== null">Bonjour {{ getUser }}</h1>
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

h1, h3{
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