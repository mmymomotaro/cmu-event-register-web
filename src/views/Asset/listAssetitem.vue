<template>
  <div id="listAssetitem">
    <v-card class="pa-0 ma-0" elevation="1" tile color="white">
      <v-container grid-list-xs>
        <v-row>
          <v-col cols="12" md="9" style="font-size: 1.5rem"> Title </v-col>
          <v-col cols="12" md="3" class="pa-2">
            <v-hover>            
              <v-btn
              block
              justify-center
              large
              class="button white--text"
              @click="openInsertAsset()"
              >เพิ่มสินทรัพย์</v-btn>
              </v-hover>
              </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-container grid-list-xs>
      <v-row justify="center" class="pa-2">
        <v-expansion-panels focusable>
          <v-expansion-panel v-for="item in AssetListitem" :key="item" >
            <v-expansion-panel-header style="font-size:1rem;"  @click="AssetitemDetail(item.id)">{{item.name}}<br> sn : {{item.serial_number}}
            </v-expansion-panel-header>
            <v-expansion-panel-content class="pa-2">
                <div style="font-size: 16px; font-weight: bold; height: 50px">
                  {{item.name}}
                </div>
                <div style="font-size: 14px">
                  <v-list-item-icon class="ma-0"
                    ><v-icon color="gray" class="pr-2">qr_code_2</v-icon
                    >{{ Assetdetail.barcode}}</v-list-item-icon
                  >
                </div>
                <div style="font-size: 14px">{{ item.category_name }}</div>
                <div style="font-size: 14px">
                  <v-list-item-icon class="ma-0"
                    >{{ item.sub_category_name }}</v-list-item-icon
                  >
                </div>
                <div v-if="item.qty === 0">
                  <div style="font-size: 14px" class="grey-darken-1--text">
                    <v-list-item-icon class="ma-0"
                      ><v-icon color="" class="pr-2">check_circle</v-icon> เหลือ
                      {{ item.qty }} ชิ้น</v-list-item-icon
                    >
                  </div>
                </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-container>
    
  </div>
</template>

<script>
import api from "../../services/asset";
export default {
  name: "listAssetitem",
  data() {
    return {
      Asset_id: this.$route.params.id,
      AssetListitem: [],
      assetdetailID: 0,
      Assetdetail: [],
    };
  },
  components: {},
  methods: {
    AssetitemDetail(val){
      this.assetdetailID = val,
      this.ListAssetItemDetaildata()
    },
    ListAssetItemDetaildata() {
      console.log(this.Asset_id)
      api.ListAssetDetail(
        {
          id: parseInt(this.assetdetailID),
        },
        (result) => {
          this.Assetdetail = result.data;
          console.log(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    ListAssetItemdata() {
      console.log(this.Asset_id)
      api.ListAssetItem(
        {
          id: parseInt(this.Asset_id),
        },
        (result) => {
          this.AssetListitem = result.data;
          console.log(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  mounted() {
    this.ListAssetItemdata();
  },
};
</script>

<style lang="scss" scoped>
.button {
  font-size: 1.25rem;
  height: 2.5rem;
  background: linear-gradient(90.75deg, #00b9f8 5.43%, #3780ee 84.26%), #c4c4c4;
}
</style>
