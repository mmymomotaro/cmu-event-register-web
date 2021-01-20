<template>
  <div>
    <v-card class="pa-3 white--text" color="primary" style="font-size: 1.5rem"
      >แก้ไข</v-card
    >
    <v-card class="pa-3">
      <v-row no-gutters>
        <v-col cols="12" md="6" class="pa-2">
          <v-text-field
            v-model="AssetItem.serial_number"
            counter
            prepend-icon="qr_code"
            maxlength="25"
            hint="ความยาวหมวดหมู่ไม่เกิน 25 ตัวอักษร"
            label="Serial Number"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="pa-2">
          <v-select
            prepend-icon="mdi-map-marker"
            color="light-blue darken-3"
            v-model="Locationdata"
            :items="Location"
            item-text="name"
            return-object
            label="สถานที่เก็บ"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" md="12" class="pa-2">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="AssetItem.warranty_date"
                label="วันสินสุดรับประกัน"
                prepend-icon="security"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="AssetItem.warranty_date"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="12">
          <v-subheader class="pl-0"> สภาพสินทรัพย์ </v-subheader>
          <v-slider
            v-model="AssetItem.conditions"
            prepend-icon="build"
            :thumb-size="24"
            max="10"
            min="0"
            thumb-label="always"
          ></v-slider>
        </v-col>
        <v-col cols="12" md="12">
          <v-textarea
            prepend-icon="article"
            v-model="AssetItem.detail"
            label="รายละเอียดเพิ่มเติม"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="6" md="6" class="pr-1">
          <v-btn block outlined height="2.5rem" @click="closegroup()"> ยกเลิก </v-btn>
        </v-col>
        <v-col cols="6" md="6" class="pl-1">
          <v-btn block outlined color="primary" height="2.5rem" @click="checkdata()">
            ยืนยัน
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <v-dialog persistent max-width="300" v-model="Update_group">
      <PopupUpdate />
    </v-dialog>

    <v-dialog max-width="450" v-model="Error_group">
      <PopupErrorInputiden />
    </v-dialog>

    <v-dialog max-width="450" v-model="ErrorRespon_group">
      <PopupResponError />
    </v-dialog>
  </div>
</template>

<script>
import api from "../../services/asset";
import PopupUpdate from "../Popup/PopupUpdate";
import PopupErrorInputiden from "../Popup/PopupErrorInputiden";
import PopupResponError from "../Popup/PopupResponError";
export default {
  name: "InsertAssetItem",
  props: ["AssetItem"],
  data() {
    return {
      SerialNumber: "",
      statusAssettiem: 1,
      availableAssetitem: 1,
      e1: 1,
      Update_group: false,
      Error_group: false,
      ErrorRespon_group: false,
      dataclose: false,
      Locationdata: "",
      Location: [],
      response: "",
      status: [
        { id: 1, name: "ดี" },
        { id: 0, name: "เสีย" },
      ],
      statusdata: [{ id: 1, name: "ดี" }],
    };
  },
  components: { PopupUpdate, PopupErrorInputiden, PopupResponError },
  methods: {
    checkdata() {
      if (this.Locationdata === "") {
        this.Error_group = true;
        setTimeout(() => {
          this.Error_group = false;
        }, 2000);
      } else {
        this.UpdateAssetItemdata();
      }
    },
    SelectLocationAssetItemdata() {
      api.SelectLocationAssetItem(
        {
          id: this.AssetItem.location_id,
        },
        (result) => {
          this.Locationdata = result.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    ListLocationAssetItemdata() {
      api.LocationAssetItem(
        {
          id: 0,
        },
        (result) => {
          this.Location = result.data;
          console.log(this.Location);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    ListAssetItemDetaildata() {
      api.ListAssetItemDetail(
        {
          id: parseInt(this.Asset),
        },
        (result) => {
          this.Assetdetail = result.data;
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    UpdateAssetItemdata() {
      this.openUpdate();
      api.UpdateAssetItem(
        {
          id: this.AssetItem.id,
          location_id: this.Locationdata.id,
          serial_number: this.AssetItem.serial_number,
          conditions: this.AssetItem.conditions,
          warranty_date: this.AssetItem.warranty_date,
          detail: this.AssetItem.detail,
        },
        (result) => {
          this.response = result.response;
          if (this.response === "success") {
            this.closeUpdate();
            this.closeUpdategroup();
          } else {
            this.closeUpdate();
            this.ErrorRespon_group = true;
            setTimeout(() => {
              this.ErrorRespon_group = false;
            }, 2000);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    openUpdate() {
      this.Update_group = true;
    },
    closeUpdate() {
      this.Update_group = false;
    },
    openError() {
      this.Error_group = true;
    },
    closeError() {
      this.Error_group = false;
    },
    closegroup() {
      this.$emit("cancel", this.dataclose);
    },
    closeUpdategroup() {
      this.$emit("close", this.dataclose, this.Asset);
    },
  },
  watch: {
    AssetItem(val) {
      console.log(val);
      if (val) {
        console.log("Pass");
        this.ListLocationAssetItemdata();
        this.SelectLocationAssetItemdata();
      }
    },
  },
  mounted() {
    console.log(this.AssetItem);
    this.ListLocationAssetItemdata();
    this.SelectLocationAssetItemdata();
  },
};
</script>

<style scoped>
.botton {
  background: linear-gradient(90.75deg, #00b9f8 5.43%, #3780ee 84.26%), #c4c4c4;
}
</style>
