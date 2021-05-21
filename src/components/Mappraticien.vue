<template>
  <div id="map" />
</template>

<script>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
export default {
    data(){
        return{
            url: '',
            adresse: '',
            lat: '',
            lon: '',
            promiseArray: [],
            res: ''
        }
    },
    props:['pratData'],
    computed: {
      getCity: function(){
        return this.$store.getters.getPraticien
      }
    },
  async mounted(){
      console.log(this.getCity)
      this.pratData.forEach((element) => {
        let adresse = element.adresse + ' ' + element.codePostal + ' ' + element.ville
          this.url = `https://api.mapbox.com/geocoding/v5/mapbox.places/` + adresse +`.json?access_token=pk.eyJ1IjoiYWNhcmRuaWNvbGFzOTEiLCJhIjoiY2swcnloczN0MGJneDNjbzB1am9ob3cycCJ9.5JXyVWCo9csiDd-U5bvejw`;
          this.promiseArray.push(fetch(this.url).then(response => response.json()))
      });
      this.res = await Promise.all(this.promiseArray);
      fetch(this.url)
      .then(response => response.json())
      .then((data) => {
          console.log(data.features[0].center)
          this.lon = data.features[0].center[0]
          this.lat = data.features[0].center[1]

          mapboxgl.accessToken = "pk.eyJ1IjoiYWNhcmRuaWNvbGFzOTEiLCJhIjoiY2swcnloczN0MGJneDNjbzB1am9ob3cycCJ9.5JXyVWCo9csiDd-U5bvejw";
        const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/light-v9",
            center: [this.lon, this.lat],
            zoom: 11
        });
        map.on('load', () => {
        // TODO: Here we want to load a layer
        // TODO: Here we want to load/setup the popup
        });
        this.res.forEach((item) => {
            new mapboxgl.Marker() // Initialize a new marker
            .setLngLat([item.features[0].center[0], item.features[0].center[1]])
            .addTo(map); // Add the marker to the map
            })
        })
        
    }
};
</script>

<style scoped>
#map {
  height: 100vh;
}

.mapboxgl-map {
    overflow: visible;
}
</style>