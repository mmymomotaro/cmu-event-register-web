<template>
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
          <v-card class="mb-12" flat>
            <v-form>
              <v-row no-gutters>
                <v-col cols="12" sm="12" class="px-2">
                  <v-text-field
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
          <v-btn text > ยกเลิก </v-btn>
          <v-btn class="botton white--text" @click="e1 = 2"> ถัดไป </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2" class="pa-2">
          <v-card class="mb-12" flat>
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
                    v-model="barcodest"
                    :rules="rules"
                    counter
                    maxlength="25"
                    label="บาร์โค้ด"
                    color="light-blue darken-3"
                  ></v-text-field>
                  <barcode
                    v-model="barcodest"
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
          <v-card class="mb-12" flat>
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
          <v-btn class="botton white--text" :loading="true" @click="uploadimage()"> เพิ่มข้อมูล </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>


</template>

<script>
import moment from "moment";
import api from "../../services/asset";
export default {
  name: "InsertAsset",
  data() {
    return {
      loading: false,
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
      urlfile: "https://firebasestorage.googleapis.com/v0/b/np-storage-it.appspot.com/o/2021-01-06-1148301?alt=media&fbclid=IwAR1pcgdTi0OC4YtD-8Mz4J9SvrAYJ7QrFzfvtu36UuIuggFIH7m5AVPDx3M",
      urlFromApi: "",
      itemImg: "",
      genimg: "",
    };
  },
  components: {},
  methods: {
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
uploadimage() {
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
            this.InsertAssetdata()
            console.log(this.urlFromApi)
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
          },
          (error) => {
            console.log(error);
          }
        );
    },
    genbaecode() {
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
      // console.log(formData)
      // console.log(document.querySelector('#fileUpload'))
      this.imagefile = document.querySelector("#fileUpload");
      console.log(this.imagefile.files[0]);
      this.urlfile = URL.createObjectURL(this.imagefile.files[0]);
    },
    
    getFile() {
      this.imagefile = document.querySelector("#fileUpload");
      console.log(this.imagefile.files);
      this.urlfile = URL.createObjectURL(this.imagefile.files[0]);
    },
  },
  mounted() {
    this.genbaecode();
    this.ListCategorydata();
    // this.ListSubCategorydata()
  },
};
</script>

<style scoped>
.botton {
  background: linear-gradient(90.75deg, #00b9f8 5.43%, #3780ee 84.26%), #c4c4c4;
}
</style>
