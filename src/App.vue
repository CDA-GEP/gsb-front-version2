<template>
  <div>
    <navbar :user="user"></navbar>
      <router-view :user="user" />  
  </div>
</template>

<script>
import navbar from '@/components/navbar'
export default {
  data(){
    return{
      user: null
    }
  },
  components:{
    navbar
  },
  created(){
    this.user = localStorage.getItem('userName')
  }
}
</script>

<style>

body{
  margin: 0px;
  padding: 0px;
  overflow: hidden;
  box-sizing: border-box;
}

.btn{
  border: none;
  color: white;
  background-color: #E98D08;
}

.btn:hover{
  background-color: #E38A08;
}

.fa-clinic-medical,
.fa-chevron-circle-left,
.fa-globe-africa
{
  color:#E98D08;
}

.center{
  display: flex;
  align-items: center;
  justify-content: center;
}

a{
  text-decoration: none;
  color: black;
}

a:hover{
  color: gray;
  transition: .4s;
}

form{
  color: grey;
  font-weight: bold;
  
  padding: 50px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#87e0fd+0,53cbf1+40,05abe0+100;Blue+3D+%23+16 */
  /* background: #87e0fd; Old browsers */
  /* background: -moz-linear-gradient(top,  #87e0fd 0%, #53cbf1 40%, #05abe0 100%); FF3.6-15 */
  /* background: -webkit-linear-gradient(top,  #87e0fd 0%,#53cbf1 40%,#05abe0 100%); Chrome10-25,Safari5.1-6 */
  /* background: linear-gradient(to bottom,  #87e0fd 0%,#53cbf1 40%,#05abe0 100%); W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#87e0fd', endColorstr='#05abe0',GradientType=0 ); /* IE6-9 */
}
</style>