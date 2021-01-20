<template>
  <div>
    <v-card
      class="pa-3 white--text"
      color="red darken-2"
      style="font-size: 1.5rem"
      >รายละเอียด</v-card
    >
    <v-card class="pa-3">
      <v-row no-gutters class="mb-5">
        <v-col cols="12" md="5" align="center">
          <img :src="headerdata.url" />
        </v-col>
        <v-col cols="12" md="7">
          <v-row no-gutters>
            <v-col cols="12" style="font-size: 2rem">{{ headerdata.name }}</v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12">
              รายละเอียด
              {{ headerdata.description }}
            </v-col>
            <v-col cols="12">หมวดหมู่ {{ headerdata.category_name }} </v-col>
            <v-col cols="12">ประเภท {{ headerdata.sub_category_name }} </v-col>
            <v-col cols="12"
              ><v-icon>location_on</v-icon> {{ dataAsset.location }}
            </v-col>
            <v-col cols="12"
              ><v-icon>qr_code</v-icon> {{ dataAsset.serial_number }}
            </v-col>
            <v-col cols="12"><v-icon>schedule</v-icon> {{ dataAsset.update_at }} </v-col>
            <v-col cols="12"
              ><v-icon>security</v-icon>รับประกันถึง {{ dataAsset.warranty_date }}
            </v-col>
            <v-col cols="12">รายละเอียดเพิ่มเติม {{ dataAsset.detail }} </v-col>
            <v-col cols="12"
              >บาร์โค้ด {{ headerdata.barcode }}
              <v-btn fab text small color="grey">
                <v-icon color="primary"> local_printshop </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12">
              <barcode
                v-model="headerdata.barcode"
                :options="{ displayValue: false }"
                style="height: 90px"
              ></barcode
            ></v-col>
            <v-col cols="12" md="6" class="pa-1">
              <v-btn
                small
                block
                color="blue"
                class="white--text"
                style="height: 35px"
                @click="openUpdateAssetItem(dataAsset)"
                >แก้ไข</v-btn
              >
            </v-col>
            <v-col cols="12" md="6" class="pa-1">
              <v-btn
                small
                block
                color="red"
                class="white--text"
                style="height: 35px"
                @click="openDeleteAssetItem(dataAsset)"
                >ลบ</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-dialog transition="dialog-top-transition" max-width="900" v-model="Update_group">
      <UpdateAssetItem
        :AssetItem="group_data"
        @close="closeUpdateAssetItem"
        @cancel="cancelUpdate"
      />
    </v-dialog>

    <v-dialog transition="dialog-top-transition" max-width="500" v-model="Delete_group">
      <DeleteAssetItem
        :AssetItem="group_data"
        @close="closeDeleteAssetItem"
        @cancel="cancelDelete"
      />
    </v-dialog>
  </div>
</template>

<script>
import api from "../../services/asset";
import UpdateAssetItem from "../../components/AssetItem/UpdateAssetItem.vue";
import DeleteAssetItem from "../../components/AssetItem/DeleteAssetItem.vue";
// import moment from "moment";
export default {
  name: "DetailAssetItem",
  props: ["Asset"],
  data() {
    return {
      headerdata: [],
      dataAsset: this.Asset,
      Update_group: false,
      Delete_group: false,
      dataclose: false,
    };
  },
  components: { UpdateAssetItem, DeleteAssetItem },
  methods: {
    HaederAssetdata() {
      api.HaederAsset(
        {
          id: parseInt(this.dataAsset.asset_id),
        },
        (result) => {
          this.headerdata = result.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    openUpdateAssetItem(val) {
      this.group_data = val;
      this.Update_group = true;
    },
    openDeleteAssetItem(val) {
      this.group_data = val;
      this.Delete_group = true;
    },
    closeUpdateAssetItem(close) {
      this.Update_group = close;
    },
    closeDeleteAssetItem(close) {
      this.Delete_group = close;
      this.$emit("close", this.dataclose);
    },
    cancelUpdate(cancel) {
      this.Update_group = cancel;
    },
    cancelDelete(cancel) {
      this.Delete_group = cancel;
    },
  },
  watch: {
    Asset(val) {
      console.log(val);
      if (val) {
        console.log("Pass");
        this.dataAsset = this.$props.Asset;
        this.HaederAssetdata();
      }
    },
  },
  mounted() {
    this.HaederAssetdata();
  },
};
</script>

<style scoped>
.botton {
  background: linear-gradient(90.75deg, #00b9f8 5.43%, #3780ee 84.26%), #c4c4c4;
}
</style>
