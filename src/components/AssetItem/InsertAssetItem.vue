<template>
  <div>
    <v-card class="pa-3 white--text" color="primary" style="font-size: 1.5rem"
      >เพิ่ม</v-card
    >
    <v-card class="pa-3">
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="SerialNumber"
            prepend-icon="qr_code"
            counter
            maxlength="25"
            hint="ความยาวหมวดหมู่ไม่เกิน 25 ตัวอักษร"
            label="Serial Number"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            color="light-blue darken-3"
            v-model="Locationdata"
            prepend-icon="mdi-map-marker"
            :items="Location"
            item-text="name"
            return-object
            label="สถานที่เก็บ"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" md="12">
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
                v-model="date"
                label="วันสินสุดรับประกัน"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="12">
          <v-subheader class="pl-0"> สภาพสินทรัพย์ </v-subheader>
          <v-slider
            v-model="slider"
            prepend-icon="build"
            :thumb-size="24"
            thumb-label="always"
          ></v-slider>
        </v-col>
        <v-col cols="12" md="12">
          <v-textarea
            prepend-icon="article"
            v-model="itemdescription"
            label="รายละเอียดเพิ่มเติม"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="6" md="6" class="pr-1">
          <v-btn block outlined height="2.5rem" @click="cancelInsertgroup()">
            ยกเลิก
          </v-btn>
        </v-col>
        <v-col cols="6" md="6" class="pl-1">
          <v-btn block outlined color="primary" height="2.5rem" @click="checkdata()">
            ยืนยัน
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <v-dialog persistent max-width="300" v-model="Insert_group">
      <PopupInsert />
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
import PopupInsert from "../Popup/PopupInsert";
import PopupErrorInputiden from "../Popup/PopupErrorInputiden";
import PopupResponError from "../Popup/PopupResponError";
export default {
  name: "InsertAssetItem",
  props: ["Asset"],
  data() {
    return {
      headerdata: [],
      SerialNumber: "",
      statusAssettiem: 1,
      availableAssetitem: 1,
      e1: 1,
      Insert_group: false,
      Error_group: false,
      ErrorRespon_group: false,
      dataclose: false,
      Locationdata: "",
      Location: [],
      response: "",
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      menu2: false,
      slider: 50,
    };
  },
  components: { PopupInsert, PopupErrorInputiden, PopupResponError },
  methods: {
    checkdata() {
      if (this.Locationdata === "") {
        this.Error_group = true;
        setTimeout(() => {
          this.Error_group = false;
        }, 2000);
      } else {
        this.InsertAssetItemdata();
      }
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
    InsertAssetItemdata() {
      this.openInsert();
      api.InsertAssetItem(
        {
          asset_id: parseInt(this.Asset),
          location_id: this.Locationdata.id,
          status: this.statusAssettiem,
          available: this.availableAssetitem,
          serial_number: this.SerialNumber,
        },
        (result) => {
          this.response = result.response;
          if (this.response === "success") {
            console.log("B");
            this.closeInsert();
            this.closeInsertgroup();
          } else {
            console.log("C");
            this.closeInsert();
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
    openInsert() {
      this.Insert_group = true;
    },
    closeInsert() {
      this.Insert_group = false;
    },
    openError() {
      this.Error_group = true;
    },
    closeError() {
      this.Error_group = false;
    },
    closegroup() {
      this.resetdata();
      this.$emit("closegroup", this.dataclose);
    },
    closeInsertgroup() {
      this.resetdata();
      this.$emit("close", this.dataclose, this.Asset);
    },
    cancelInsertgroup() {
      this.resetdata();
      this.$emit("cancel", this.dataclose);
    },
    resetdata() {
      (this.headerdata = []),
        (this.SerialNumber = ""),
        (this.statusAssettiem = 1),
        (this.availableAssetitem = 1),
        (this.e1 = 1),
        (this.Loading_group = false),
        (this.Error_group = false),
        (this.dataclose = false),
        (this.Locationdata = ""),
        (this.Location = []),
        (this.itemdata = []),
        this.ListLocationAssetItemdata();
    },
  },
  mounted() {
    console.log(this.Asset);
    this.ListLocationAssetItemdata();
  },
};
</script>

<style scoped>
.botton {
  background: linear-gradient(90.75deg, #00b9f8 5.43%, #3780ee 84.26%), #c4c4c4;
}
</style>
