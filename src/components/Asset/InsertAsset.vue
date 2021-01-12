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
                    {{New}}
                    <v-text-field
                      required
                      v-model="assetname"
                      :rules="rules"
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
                      :error-messages="errors"
                      :value="item"
                      return-object
                      label="หมวดหมู่"
                      @change="ListSubCategorydata()"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" class="px-2">
                    <v-select
                      color="light-blue darken-3"
                      v-model="SubCategorydata"
                      :items="SubCategoryList"
                      item-text="sname"
                      :error-messages="errors"
                      return-object
                      :value="item"
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
                      v-model="description"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-form>
            </v-card>
            <v-btn text @click="closeInsertgroup()"> ยกเลิก </v-btn>
            <v-btn class="botton white--text" @click="e1 = 2"> ถัดไป </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2" class="pa-2">
            <v-card flat>
              <v-form>
                <v-row no-gutters>
                  <v-col cols="12" sm="6" class="px-2">
                    <!-- <input type="file" @change="fileChange" /> -->
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
                      v-model="barcodest"
                      :rules="rules"
                      counter
                      maxlength="25"
                      label="บาร์โค้ด"
                      color="light-blue darken-3"
                    ></v-text-field>
                    <v-row class="pa-0 ma-0">
                      <v-col cols="12" class="pa-0 ma-0">
                        <v-btn  class="botton white--text" block @click="genbarcode()">Barcode</v-btn>
                        <barcode
                      v-model="barcodest"
                      :options="{ displayValue: false }"
                    ></barcode>
                      </v-col>
                    </v-row>

                    
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
                    ชื่อสินทรัพย์: {{ assetname }}
                  </v-col>
                  <v-col cols="12" sm="6" class="px-2 py-2">
                    หมวดหมู่: {{ Categorydata.name }}
                  </v-col>
                  <v-col cols="12" sm="6" class="px-2 py-2">
                    ประเภท: {{ SubCategorydata.sname }}
                  </v-col>
                  <v-col cols="12" sm="12" class="px-2 py-2">
                    รายละเอียด : {{ description }}
                  </v-col>
                  <v-col cols="12" sm="6" class="px-2 py-2">
                    รูป:
                    <div>
                      <img height="200px" width="200px" :src="urlfile" />
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="px-2 py-2">
                    บารโค้ด: {{ barcodest }} <v-btn outlined>พิมพ์บาร์โค้ด</v-btn>
                    <div>
                      <barcode
                        v-model="barcodest"
                        :options="{ displayValue: false }"
                      ></barcode>
                    </div>
                  </v-col>
                </v-row>
              </v-form>
            </v-card>
            <v-btn text @click="e1 = 2"> ย้อนกลับ </v-btn>
            <v-btn class="botton white--text" type="submit" @click=" checkimgdata()">
              เพิ่มข้อมูล
            </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>

    <v-dialog
      persistent
      max-width="300"
      v-model="Loading_group"
    >
      <LoadingAsset />
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import api from "../../services/asset";
import LoadingAsset from "../../components/Asset/AssetPopup/LoadingAsset.vue";
export default {
  name: "InsertAsset",
  props: ["New"],
  data() {
    return {
      dataclose: false,
      e1: 1,
      asset: [],
      assetname: "",
      CategoryList: [],
      Categorydata: [],
      SubCategoryList: [],
      SubCategorydata: [],
      barcodest: "",
      description: "",
      barcode: "",
      time: Date(),
      response: "",
      imagefile: "",
      urlfile:
        "https://firebasestorage.googleapis.com/v0/b/np-storage-it.appspot.com/o/no-image.jpg?alt=media",
      img:
        "https://firebasestorage.googleapis.com/v0/b/np-storage-it.appspot.com/o/no-image.jpg?alt=media",
      urlFromApi: "",
      itemImg: "",
      genimg: "",
      Loading_group: false,
    };
  },
  components: { LoadingAsset },
  methods: {
    resetdata(){
      this.e1 = 1,
      this.assetname = "",
      this.Categorydata.name = "",
      this.SubCategorydata.sname = "",
      this.barcodest = "",
      this.description = "",
      this.urlFromApi = "",
      this.imagefile = "",
      this.urlfile = "https://firebasestorage.googleapis.com/v0/b/np-storage-it.appspot.com/o/no-image.jpg?alt=media"
    },
    openLoading() {
      this.Loading_group = true;
    },
    closeLoading() {
      this.Loading_group = false;
    
    },

    closeInsertgroup(){
      this.resetdata()
      this.$emit("close", this.dataclose);
    },
    ListSubCategorydata() {
      api.ListSubCategory(
        {
          id: this.Categorydata.id,
        },
        (result) => {
          this.SubCategoryList = result.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    checkimgdata() {
      if (this.urlfile === this.img) {
        this.InsertAssetdataNoing();
      } else {
        this.uploadimage()
      }
    },

    uploadimage() {
      this.openLoading();
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
            this.InsertAssetdata();
          } else {
            // result.message
          }
        },
        (error) => {
          alert(JSON.stringify(error));
        }
      );
    },
    InsertAssetdata() {
      let payload = {
        name: this.assetname,
        category_id: this.Categorydata.id,
        sub_category_id: this.SubCategorydata.id,
        barcode: this.barcodest,
        description: this.description,
        url: this.urlFromApi,
      };
      api.InsertAsset(
        payload,
        (result) => {
          this.asset = result;
          this.resetdata()
          this.closeLoading();
          this.closeInsertgroup();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    InsertAssetdataNoing() {
      let payload = {
        name: this.assetname,
        category_id: this.Categorydata.id,
        sub_category_id: this.SubCategorydata.id,
        barcode: this.barcodest,
        description: this.description,
        url: this.img,
      };
      api.InsertAsset(
        payload,
        (result) => {
          this.asset = result;
          this.resetdata()
          this.closeLoading();
          this.closeInsertgroup();
        },
        (error) => {
          console.log(error);
        }
      );
    },

    genbarcode(){
      this.time = Date();
      this.barcode = moment(this.time).format("YYMMDDhhmmss");
      this.barcodest = "NP" + this.barcode;
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
    testimg() {
      const formData = new FormData();
      formData.append("file", this.selectedFile);
      formData.append("type", "customer");
      this.imagefile = document.querySelector("#fileUpload");
      this.urlfile = URL.createObjectURL(this.imagefile.files[0]);
    },
  },
  mounted() {
    this.ListCategorydata();
  },
};
</script>

<style scoped>
.botton {
  background: linear-gradient(90.75deg, #00b9f8 5.43%, #3780ee 84.26%), #c4c4c4;
}
</style>
