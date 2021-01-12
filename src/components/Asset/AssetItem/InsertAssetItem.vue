<template>
  <div class="InsertAssetItem">
    <v-card>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1" color="blue">
            เพิ่มข้อมูล
          </v-stepper-step>
          <v-divider></v-divider>
          <v-divider></v-divider>
          <v-stepper-step step="2" color="blue"> ยืนยันข้อมูล </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1" class="pa-2">
            <v-card flat>
              <v-form>
                <v-row no-gutters>
                  <v-col cols="12" sm="6" class="px-2 py-2">
                    <v-text-field
                      v-model="SerialNumber"
                      counter
                      label="Serial Number"
                      maxlength="25"
                      hint="ความยาวหมวดหมู่ไม่เกิน 25 ตัวอักษร"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" class="px-2 py-2">
                    <v-select
                      color="light-blue darken-3"
                      v-model="Locationdata"
                      :items="Location"
                      item-text="name"
                      :error-messages="errors"
                      return-object
                      :value="item"
                      label="สถานที่เก็บ"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </v-form>
            </v-card>

            <v-btn text @click="closeInsertitemgroup()"> ยกเลิก </v-btn>
            <v-btn class="botton white--text" @click="e1 = 2"> ถัดไป </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2" class="pa-2">
            <v-card flat>
              <v-form>
                <v-row no-gutters>
                  <v-col cols="12" sm="6" class="px-2 py-2 grey--text">
                    ชื่อสินทรัพย์ <br />
                    <div class="pl-3 black--text">{{ headerdata.name }}</div>
                  </v-col>
                  <v-col cols="12" sm="3" class="px-2 py-2 grey--text">
                    หมวดหมู่ <br />
                    <div class="pl-3 black--text">{{ headerdata.category_name }}</div>
                  </v-col>
                  <v-col cols="12" sm="3" class="px-2 py-2 grey--text">
                    ประเภท <br />
                    <div class="p3-2 black--text">{{ headerdata.sub_category_name }}</div>
                  </v-col>
                  <v-col cols="12" sm="12" class="px-2 py-2 grey--text">
                    รายละเอียด <br />
                    <div class="pl-3 black--text">
                      {{ headerdata.description }}
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="px-2 py-2 grey--text">
                    Serila Number <br />
                    <div class="pl-3 black--text">
                      {{ SerialNumber }}
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="px-2 py-2 grey--text">
                    สถานที่เก็บ
                    <div class="pl-3 black--text">
                      {{ Locationdata.name }}
                    </div>
                  </v-col>
                </v-row>
              </v-form>
            </v-card>
            <v-btn text @click="e1 = 1"> ย้อนกลับ </v-btn>
            <v-btn class="botton white--text" @click="checkdata()"> เพิ่ม </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>

    <v-dialog
      persistent
      transition="dialog-top-transition"
      max-width="300"
      v-model="Loading_group"
    >
      <LoadingAsset />
    </v-dialog>
  </div>
</template>

<script>
import api from "../../../services/asset";
import LoadingAsset from "../AssetPopup/LoadingAsset.vue";
export default {
  name: "InsertAssetItem",
  props: ["Asset_ID"],
  data() {
    return {
      headerdata: [],
      SerialNumber: "",
      statusAssettiem: 1,
      availableAssetitem: 1,
      e1: 1,
      Loading_group: false,
      dataclose: false,
      Locationdata: [],
      Location: [],
    };
  },
  components: { LoadingAsset },
  methods: {
    ListLocationAssetItemdata() {
      api.LocationAssetItem(
        {
          id: null,
        },
        (result) => {
          this.Location = result.data;
          console.log(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    HaederAssetdata() {
      api.HaederAsset(
        {
          id: parseInt(this.Asset_ID),
        },
        (result) => {
          this.headerdata = result.data;
          console.log(this.headerdata);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    checkdata() {
      console.log("Lo", this.Locationdata);
      console.log("SN", this.SerialNumber);
      if (this.Locationdata === "") {
        console.log("A+");
        // this.InsertAssetItemdata()
      } else {
        console.log("B+");
        // this.InsertAssetItemdata()
      }
    },

    InsertAssetItemdata() {
      api.InsertAssetItem(
        {
          asset_id: parseInt(this.Asset_ID),
          location_id: this.Locationdata.id,
          status: this.statusAssettiem,
          available: this.availableAssetitem,
          serial_number: this.SerialNumber,
        },
        (result) => {
          this.Location = result.data;
          console.log(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    openLoading() {
      this.Loading_group = true;
    },
    closeLoading() {
      this.Loading_group = false;
    },
    closeInsertitemgroup() {
      this.$emit("close", this.dataclose);
    },
  },
  mounted() {
    this.HaederAssetdata();
    this.ListLocationAssetItemdata();
  },
};
</script>

<style scoped>
.botton {
  background: linear-gradient(90.75deg, #00b9f8 5.43%, #3780ee 84.26%), #c4c4c4;
}
</style>
