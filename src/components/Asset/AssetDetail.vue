<template>
  <div>
    <v-card class="pa-3 white--text" color="blue darken-1" style="font-size: 1.5rem"
      >รายละเอียด</v-card
    >
    <v-card class="pa-3">
      <v-row no-gutters class="mb-5">
        <v-col cols="12" md="5" align="center">
          <img :src="dataAsset.url" />
        </v-col>
        <v-col cols="12" md="7">
          <v-row no-gutters>
            <v-col cols="12" style="font-size: 2.5rem">{{ dataAsset.name }}</v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" class="pt-2">
              รายละเอียด
              {{ dataAsset.description }}
            </v-col>
            <v-col cols="12" class="pt-2"
              >หมวดหมู่ {{ dataAsset.category_name }}
            </v-col>
            <v-col cols="12" class="pt-2"
              >ประเภท {{ dataAsset.sub_category_name }}
            </v-col>
            <v-col cols="12" class="pt-2"
              >บาร์โค้ด {{ dataAsset.barcode }}
              <v-btn height="30" color="blue" class="white--text"
                >พิมพ์บาร์โค้ด</v-btn
              ></v-col
            >
            <v-col cols="12" class="pt-2">
              <barcode
                v-model="dataAsset.barcode"
                :options="{ displayValue: false }"
                style="height: 90px"
              ></barcode
            ></v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "AssetDetail",
  props: ["SendAssetData"],
  data() {
    return {
      dataAsset: this.SendAssetData
    };
  },
  components: {},
  methods: {},
    watch: {
    SendAssetData(val) {
      console.log(val);
      if (val) {
        console.log("Pass");
        this.dataAsset =  this.$props.SendAssetData
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.botton {
  background: linear-gradient(90.75deg, #00b9f8 5.43%, #3780ee 84.26%), #c4c4c4;
}
</style>
