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
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" class="px-2">
                  <v-select
                    v-model="CategoryID"
                    :items="CategoryList"
                    item-text="name"
                    :error-messages="errors"
                    :return-object="false"
                    :value="item"
                    label="หมวดหมู่"
                    @change="test($event)"
                    required
                  ></v-select>
<!-- 
                  <select class="form-control" style="font-size:1.5rem;" v-model="zone">
                    <option
                    v-for="(item, index) in CategoryList" :key="index" :value="item.id"
                    >{{item.name}}</option>
                  </select> -->

                </v-col>

                <v-col cols="12" sm="6" class="px-2">
                  <v-select
                    :items="items"
                    label="ประเภท"
                    v-model="subcategory"
                  ></v-select>

                </v-col>
              
                <v-col cols="12" sm="12" class="px-2">
                  <v-textarea
                    outlined
                    name="input-7-4"
                    label="รายละเอียด"
                    v-model="description"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
          <v-btn text @click="closeInsertAsset()"> ยกเลิก </v-btn>
          <v-btn class="botton white--text" @click="e1 = 2"> ถัดไป </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2" class="pa-2">
          <v-card class="mb-12" flat>
            <v-form>
              <v-row no-gutters>
                <v-col cols="12" sm="6" class="px-2">
                  <input type="file" @change="fileChange" />
                  <img :src="image" alt="" height="200px" width="200px" align-center />
                </v-col>
                <v-col cols="12" sm="6" class="px-2">
                  <v-text-field
                    v-model="barcodest"
                    :rules="rules"
                    counter
                    maxlength="25"
                    label="บาร์โค้ด"
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
                  หมวดหมู่: {{ category_id }}
                </v-col>
                <v-col cols="12" sm="6" class="px-2 py-2">
                  ประเภท: {{ subcategory_id }}
                </v-col>
                <v-col cols="12" sm="12" class="px-2 py-2">
                  รายละเอียด : {{ description }}
                </v-col>
                <v-col cols="12" sm="6" class="px-2 py-2">
                  รูป:
                  <div>
                    <img :src="image" alt="" height="200px" width="200px" align-center />
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
          <v-btn class="botton white--text"  @click="InsertAssetdata()"> ยืนยัน </v-btn>
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
      e1: 1,
      items: ["qqq" , "wwwww" , "DDDDD"],
      assetname: "",
      CategoryList: [],
      cagname: [],
      subcategory: [],
      barcodest: "",
      description: "",
      img_url: "",
      response: "",
      changeCag: [],
      barcode: "",
      time: Date(),
      image: "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg",
    };
  },
  components: {},
  methods: {
    test(event) {
      this.CategoryID = event.name
      // console.log(event);
      console.log(this.CategoryID);
    },
    ListSubCategorydata() {
      api.ListSubCategory(
        {
          id: this.cat_id,
        },
        (result) => {
          this.SubCategoryList = result.data;
          console.log(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    InsertAssetdata() {
      api.InsertAsset(
          {
              "name": this.assetname,
              // "category_id": this.category_id,
              // "sub_category_id": this.sub_category_id,
              "category_id": 1,
              "sub_category_id": 2,
              "barcode": this.barcodest,
              "description": this.description,
              "url": this.image,
          },
        (result) => {
          this.Assetupdate = result.data;
          // console.log(result.data)
        },
        (error) => {
          console.log(error);
        }
      );
    },
    fileChange(e) {
      const file = e.target.files[0];
      this.image = URL.createObjectURL(file);
    },
    genbaecode() {
      this.time = Date();
      this.barcode = moment(this.time).format("YYYYMMDDhhmmss");
      this.barcodest = "NP" + this.barcode;
    },
    ListCategorydata(){
      api.ListCategory(
        {
          id: "",
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
      // console.log(this.imagefile.files[0]);
      this.urlfile = URL.createObjectURL(this.imagefile.files[0]);
    },
    // uploadimage () {
    //   const header = {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   }
    //   const formData = new FormData()
    //   formData.append('file', this.imagefile.files[0])
    //   api.genItem(
    //     header,
    //     formData,
    //     (result) => {
    //       if (result.response === 'success') {
    //         this.urlFromApi = result.data.url
    //       } else {
    //         // alert(this.urlFromApi)
    //         // result.message
    //       }
    //     },
    //     (error) => {
    //       alert(JSON.stringify(error))
    //     }
    //   )
    // },
    getFile() {
      this.imagefile = document.querySelector("#fileUpload");
      // console.log(this.imagefile.files);
      this.urlfile = URL.createObjectURL(this.imagefile.files[0]);
    },
  },

  mounted() {
    this.genbaecode();
    this.ListCategorydata();
  
  },
};
</script>

<style scoped>
.botton {
  background: linear-gradient(90.75deg, #00b9f8 5.43%, #3780ee 84.26%), #c4c4c4;
}
</style>
