<template>
  <div>
    <v-card>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1" color="blue">
            ข้อมูลสินทรัพย์
          </v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2" color="blue">
            รูปภาพ / บาร์โค้ด
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3" color="blue"> รายละเอียดทั้งหมด </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1" class="pa-2">
            <v-card flat>
              <v-form>
                <v-row no-gutters>
                  <v-col cols="12" sm="12" class="px-2">
                    <v-text-field
                      required
                      v-model="SendAssetData.name"
                      counter
                      maxlength="25"
                      hint="This field uses maxlength attribute"
                      label="ชื่อสินทรัพย์"
                      color="light-blue darken-3"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" class="px-2">
                    <v-select
                      color="light-blue darken-3"
                      v-model="Categorydata"
                      :items="CategoryList"
                      item-text="name"
                      return-object
                      label="หมวดหมู่"
                      @change="ListSubCategorydata(Categorydata)"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" class="px-2">
                    <v-select
                      color="light-blue darken-3"
                      v-model="SubCategorydata"
                      :items="SubCategoryList"
                      item-text="sname"
                      return-object
                      label="ประเภท"
                      required
                    ></v-select>
                  </v-col>

                  <v-col cols="12" sm="12" class="px-2">
                    <v-textarea
                      required
                      color="light-blue darken-3"
                      outlined
                      name="input-7-4"
                      label="รายละเอียด"
                      v-model="SendAssetData.description"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-form>
            </v-card>
            <v-btn text @click="cancelUpdategroup()"> ยกเลิก </v-btn>
            <v-btn class="botton white--text" @click="e1 = 2"> ถัดไป </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2" class="pa-2">
            <v-card flat>
              <v-form>
                <v-row no-gutters>
                  <v-col cols="12" sm="6" class="px-2">
                    <input
                      color="light-blue darken-3"
                      type="file"
                      class="form-control-file"
                      id="fileUpload"
                      @change="testimg()"
                    />
                    <img height="200px" width="200px" :src="urlfile" />
                  </v-col>
                  <v-col cols="12" sm="6" class="px-2">
                    <v-text-field
                      required
                      disabled
                      v-model="SendAssetData.barcode"
                      counter
                      maxlength="25"
                      label="บาร์โค้ด"
                      color="light-blue darken-3"
                    ></v-text-field>
                    <barcode
                      v-model="SendAssetData.barcode"
                      :options="{ displayValue: false }"
                    ></barcode>
                  </v-col>
                </v-row>
              </v-form>
            </v-card>

            <v-btn text @click="e1 = 1"> ย้อนกลับ </v-btn>
            <v-btn class="botton white--text" @click="e1 = 3"> ถัดไป </v-btn>
          </v-stepper-content>

          <v-stepper-content step="3" class="pa-2">
            <v-card flat>
              <v-form>
                <v-row no-gutters>
                  <v-col cols="12" sm="12" class="px-2 py-2">
                    ชื่อสินทรัพย์: {{ SendAssetData.name }}
                  </v-col>
                  <v-col cols="12" sm="6" class="px-2 py-2">
                    หมวดหมู่: {{ Categorydata.name }}
                  </v-col>
                  <v-col cols="12" sm="6" class="px-2 py-2">
                    ประเภท: {{ SubCategorydata.sname }}
                  </v-col>
                  <v-col cols="12" sm="12" class="px-2 py-2">
                    รายละเอียด : {{ SendAssetData.description }}
                  </v-col>
                  <v-col cols="12" sm="6" class="px-2 py-2">
                    รูป:
                    <div>
                      <img height="200px" width="200px" :src="urlfile" />
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="px-2 py-2">
                    บารโค้ด: {{ SendAssetData.barcode }}
                    <v-btn outlined>พิมพ์บาร์โค้ด</v-btn>
                    <div>
                      <barcode
                        v-model="SendAssetData.barcode"
                        :options="{ displayValue: false }"
                      ></barcode>
                    </div>
                  </v-col>
                </v-row>
              </v-form>
            </v-card>
            <v-btn text @click="e1 = 2"> ย้อนกลับ </v-btn>
            <v-btn class="botton white--text" type="submit" @click="checkdataUpload()">
              เพิ่มข้อมูล
            </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>

    <v-dialog persistent max-width="300" v-model="Update_group">
      <PopupUpdate />
    </v-dialog>

    <v-dialog max-width="500" v-model="Error_group">
      <PopupErrorInputiden />
    </v-dialog>

    <v-dialog max-width="450" v-model="ErrorRespon_group">
      <PopupResponError />
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import api from "../../services/asset";
import PopupErrorInputiden from "../Popup/PopupErrorInputiden";
import PopupResponError from "../Popup/PopupResponError.vue";
import PopupUpdate from "../Popup/PopupUpdate";
export default {
  name: "UpdateAsset",
  props: ["SendAssetData"],
  data() {
    return {
      dataclose: false,
      Update_group: false,
      Error_group: false,
      ErrorRespon_group: false,
      e1: 1,
      asset: [],
      CategoryList: [],
      Categorydata: [],
      SubCategoryList: [],
      SubCategorydata: [],
      barcodest: "",
      barcode: "",
      time: Date(),
      imagefile: "",
      urlfile: this.SendAssetData.url,
      urlFromApi: "",
    };
  },
  components: { PopupUpdate, PopupErrorInputiden, PopupResponError },
  methods: {
    checkdataUpload() {
      if (
        this.assetname == "" ||
        this.typeSNdata == "" ||
        this.Categorydata == "" ||
        this.SubCategorydata == ""
      ) {
        this.ErrorInputiden_group = true;
        setTimeout(() => {
          this.ErrorInputiden_group = false;
        }, 2000);
      } else {
        this.checkimgdata();
      }
    },
    resetdata() {
      (this.dataclose = false),
        (this.Update_group = false),
        (this.Error_group = false),
        (this.ErrorRespon_group = false),
        (this.e1 = 1),
        (this.asset = []),
        (this.CategoryList = []),
        (this.Categorydata = []),
        (this.SubCategoryList = []),
        (this.SubCategorydata = []),
        (this.barcodest = ""),
        (this.barcode = ""),
        (this.time = Date()),
        (this.imagefile = ""),
        (this.urlfile = this.SendAssetData.url),
        (this.urlFromApi = "");
      this.SelectCategoryID();
      this.SelectSubCategoryIDdata();
    },
    openUpdate() {
      this.Update_group = true;
    },
    closeUpdate() {
      this.Update_group = false;
    },
    cancelUpdategroup() {
      this.$emit("cancel", this.dataclose);
      this.resetdata();
    },
    closeUpdategroup() {
      this.$emit("close", this.dataclose);
      this.resetdata();
    },

    ListCategorydata() {
      api.ListCategory(
        {
          id: null,
        },
        (result) => {
          this.CategoryList = result.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },

    ListSubCategorydata(val) {
      api.ListSubCategory(
        {
          id: val.id,
        },
        (result) => {
          this.SubCategoryList = result.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },

    SelectAssetID() {
      api.HaederAsset(
        {
          id: this.SendAssetData.id,
        },
        (result) => {
          this.asset = result.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },

    SelectCategoryID() {
      api.SelectCategory(
        {
          id: this.SendAssetData.category_id,
        },
        (result) => {
          this.Categorydata = result.data;
          console.log("Categorydata", this.Categorydata);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    SelectSubCategoryIDdata() {
      api.SelectSubCategory(
        {
          id: this.SendAssetData.sub_category_id,
        },
        (result) => {
          this.SubCategorydata = result.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    checkimgdata() {
      if (this.SendAssetData.url === this.urlfile) {
        this.UpdateAssetdataNoImg();
      } else {
        this.uploadimage();
      }
    },

    testimg() {
      const formData = new FormData();
      formData.append("file", this.selectedFile);
      formData.append("type", "customer");
      this.imagefile = document.querySelector("#fileUpload");
      this.urlfile = URL.createObjectURL(this.imagefile.files[0]);
    },
    uploadimage() {
      this.openUpdate();
      const header = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.append("file", this.imagefile.files[0]);
      api.genItem(
        header,
        formData,
        (result) => {
          if (result.response === "success") {
            this.urlFromApi = result.data.url;
            this.UpdateAssetdata();
          } else {
            // result.message
          }
        },
        (error) => {
          alert(JSON.stringify(error));
        }
      );
    },
    UpdateAssetdata() {
      let payload = {
        id: this.SendAssetData.id,
        name: this.SendAssetData.name,
        category_id: this.Categorydata.id,
        sub_category_id: this.SubCategorydata.id,
        description: this.SendAssetData.description,
        url: this.urlFromApi,
      };
      api.UpdateAsset(
        payload,
        (result) => {
          this.asset = result;
          this.closeUpdate();
          this.closeUpdategroup();
          this.resetdata();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    UpdateAssetdataNoImg() {
      let payload = {
        id: this.SendAssetData.id,
        name: this.SendAssetData.name,
        category_id: this.Categorydata.id,
        sub_category_id: this.SubCategorydata.id,
        description: this.SendAssetData.description,
        url: this.SendAssetData.url,
      };
      api.UpdateAsset(
        payload,
        (result) => {
          this.asset = result;
          this.closeUpdate();
          this.closeUpdategroup();
          this.resetdata();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    genbarcode() {
      this.time = Date();
      this.barcode = moment(this.time).format("YYMMDDhhmmss");
      this.barcodest = "NP" + this.barcode;
    },
  },
  watch: {
    SendAssetData(val) {
      console.log(val);
      if (val) {
        console.log("Pass", val);
        this.genbarcode();
        this.ListCategorydata();
        this.SelectCategoryID();
        this.SelectSubCategoryIDdata();
        this.SelectAssetID();
      }
    },
  },
  mounted() {
    console.log("this");
    console.log("mounted", this.SendAssetData);
    this.ListCategorydata();
    this.SelectCategoryID();
    this.SelectSubCategoryIDdata();
    this.SelectAssetID();
  },
};
</script>

<style scoped>
.botton {
  background: linear-gradient(90.75deg, #00b9f8 5.43%, #3780ee 84.26%), #c4c4c4;
}
</style>
