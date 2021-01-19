<template>
  <div>
    <GmapMap
      v-bind:center="center"
      v-bind:zoom="15"
      map-type-id="terrain"
      style="width: 700px; height: 300px"
    >
      <GmapMarker
        v-bind:key="index"
        v-for="(m, index) in markers"
        v-bind:position="m.position"
        v-bind:clickable="true"
        v-bind:draggable="true"
      />
    </GmapMap>
  </div>
</template>
<script>
export default {
  components: [],
  data() {
    return {
      center: { lat: 18.80791764321661, lng: 99.01388259667786 },
      markers: [
        { position: { lat: 18.82489237704105, lng: 99.01166793448174 } },
        { position: { lat: 18.77460756283495, lng: 99.06628064992606 } },
      ],
    };
  },
  methods:{
async getMap (val) {
      const haightAshbury = {
        lat: val.lat,
        lng: val.lon
      }
      await this.addMarker(val.lat, val.lon, haightAshbury)
    },
    async showMark (lat, lng) {
      const haightAshbury = {
        lat,
        lng
      }
      this.maps.show = await true
      this.$nextTick(() => {
        try {
          const map = this.$refs.google_map
          this.maps.map = new this.$google.maps.Map(map, {
            center: haightAshbury,
            zoom: 15,
            mapTypeId: 'terrain'
          })

          this.maps.map.addListener('click', (event) => {
            this.addMarker(event.latLng.lat(), event.latLng.lng(), event.latLng)
          })
          this.addMarker(haightAshbury.lat, haightAshbury.lng, haightAshbury)
        } catch (error) {
          console.log(error)
        }
      })
    },
    async addMarker (lat, lng, location) {
      await this.clearMarkers()

      const marker = new this.$google.maps.Marker({
        position: location,
        map: this.maps.map

      })
      this.maps.lat = await lat
      this.maps.lng = await lng
      this.maps.map.setCenter(marker.getPosition())
      this.markers.push(marker)
      console.log(lat, lng, location.lat, marker.getPosition())
    //   markers.push(marker)
    },
    setMapOnAll (map) {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(map)
      }
    },
    clearMarkers () {
      this.setMapOnAll(null)
    },
    deleteMarkers () {
      this.clearMarkers()
      this.markers = []
    },
    saveLatLng (lat, lng, state) {
      if (state === 'new') {
        this.page.address.map_location_x = lat
        this.page.address.map_location_y = lng
      } else {
        this.page.data.ship_to_lat = lat
        this.page.data.ship_to_long = lng
      }
      this.maps.show = false
    },
    initMap () {
      this.$nextTick(() => {
        try {
          const map = this.$refs.google_map
          this.maps.map = new this.$google.maps.Map(map, {
            center: {
              lat: 18.806818,
              lng: 99.01547
            },
            zoom: 15
          })

          this.maps.map.addListener('click', (event) => {
            this.addMarker(event.latLng.lat(), event.latLng.lng(), event.latLng)
          })

          console.log(map)
        } catch (error) {
          console.log(error)
        }
      })
    },

  },
  mounted(){

  },
};
</script>

<style></style>
