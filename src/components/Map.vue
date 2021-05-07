<template>
  <div id="map">
      ceci est ma map
  </div>
</template>

<script>
export default {
    name: 'mapPrat',
    props: ['pratData'],
    data(){
      return{
        mymap: '',
        lat: '',
        lon: '',
        url: '',
        promiseArray: [],
        res: '',
        i: 0
      }
    },
    created: async function(){
      if (this.mymap !== '') {
        console.log('il faut remove la map')
        this.mymap.remove();
    }
      this.pratData.forEach((element) => {
        let adresse = element.adresse + ' ' + element.codePostal + ' ' + element.ville
          this.url = `https://api.mapbox.com/geocoding/v5/mapbox.places/` + adresse +`.json?access_token=pk.eyJ1IjoiYWNhcmRuaWNvbGFzOTEiLCJhIjoiY2swcnloczN0MGJneDNjbzB1am9ob3cycCJ9.5JXyVWCo9csiDd-U5bvejw`;
          this.promiseArray.push(fetch(this.url).then(response => response.json()))
      });
      this.res = await Promise.all(this.promiseArray);
      var L = await window.L;
      this.mymap = L.map('mapid').setView([43.336451, 5.367485], 13);
      var group = await new L.featureGroup(); 
      this.res.forEach((coord) => {
          L.marker([coord.features[0].center[1], coord.features[0].center[0]])
          .addTo(group)
          .addTo(this.mymap)
          .bindPopup(`
          <div class="text-center">
          <h6>` + this.pratData[this.i].prenom + ' ' + this.pratData[this.i].nom +`</h6>
          <p>` + this.pratData[this.i].specialite.specialite + `</p>
          </div>
          `)
          .openPopup();
          this.i++;
      });
      this.mymap.fitBounds(group.getBounds());
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: `mapbox/streets-v11`,
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYWNhcmRuaWNvbGFzOTEiLCJhIjoiY2swcnloczN0MGJneDNjbzB1am9ob3cycCJ9.5JXyVWCo9csiDd-U5bvejw'
    }).addTo(this.mymap);






      // if(this.pratData){
      //   this.url = `https://api.mapbox.com/geocoding/v5/mapbox.places/`+ this.pratData.adresse + ' ' +  this.pratData.codePostal + ' ' + this.pratData.ville + `.json?access_token=pk.eyJ1IjoiYWNhcmRuaWNvbGFzOTEiLCJhIjoiY2swcnloczN0MGJneDNjbzB1am9ob3cycCJ9.5JXyVWCo9csiDd-U5bvejw`;
      //   await fetch(this.url)
      //   .then(response => response.json())
      //   .then((data) => {
      //     this.lat = data.features[0].center[1]
      //     this.lon = data.features[0].center[0]  
      //   })
      //   var L = window.L;
      //   this.mymap = L.map('mapid').setView([this.lat, this.lon], 13);   
      //   var group = new L.featureGroup(); 
      //   L.marker([this.lat, this.lon])
      //           .addTo(group)
      //           .addTo(this.mymap)
      //           .bindPopup(`
      //           <div class="text-center">
      //           <h6><i class="fas fa-clinic-medical"></i> ` + this.pratData.nom + ' ' + this.pratData.prenom + `</h6>
      //           <p><strong>` + this.pratData.specialite.specialite +  `<strong></p>
      //           </div>
      //           `)
      //           .openPopup();
      //   this.mymap.fitBounds(group.getBounds());
      //   L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      //     id: `mapbox/streets-v11`,
      //     tileSize: 512,
      //     zoomOffset: -1,
      //     accessToken: 'pk.eyJ1IjoiYWNhcmRuaWNvbGFzOTEiLCJhIjoiY2swcnloczN0MGJneDNjbzB1am9ob3cycCJ9.5JXyVWCo9csiDd-U5bvejw'
      //   }).addTo(this.mymap);
      // }  
   }
}
</script>

<style scoped>
#map{
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 30px;
  color: grey;
}

</style>