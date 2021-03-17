<template>
  <div>
    <v-dialog v-model="maps.show">
      <v-card v-if="maps.show">
        <v-card-title class="headline" />
        <center>
          <v-card-text class="grid-map">
            <listmap @eventSelect="getMap" />
            <h1>ยินดีต้อนรับเข้าสู่ CMU EVENT LIST</h1>
            <div id="map" ref="google_map" />
          </v-card-text>
        </center>
        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" text @click="maps.show = false">
            ปิด
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  components: [],
  data() {
    return {
      markers: [],
      maps: {
        map: null,
        show: true,
        state: "new",
        lat: 0,
        lng: 0,
      },
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style></style>
