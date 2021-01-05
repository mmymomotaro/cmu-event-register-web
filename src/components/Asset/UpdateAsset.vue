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
        <v-stepper-content step="1">
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
                  <v-select :items="items" label="เลือหมวดหมู่" v-model="category_id"></v-select>
                </v-col>
                <v-col cols="12" sm="6" class="px-2">
                  <v-select :items="items" label="ประเภท" v-model="subcategory_id"></v-select>
                </v-col>
                <v-col cols="12" sm="12" class="px-2">
                  <v-textarea outlined name="input-7-4" label="รายละเอียด" v-model="description"></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
          <v-btn text> ยกเลิก </v-btn>
          <v-btn class="botton white--text" @click="e1 = 2"> ถัดไป </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12" flat>
            <v-form>
              <v-row no-gutters>
                <v-col cols="12" sm="6" class="px-2">
                  <input type="file" @change ="fileChange">
                    <img :src="image" alt="" height="200px" width="200px" align-center >
              <!-- <img class="img-fit" :src="urlfile" /> -->

                </v-col>
                <v-col cols="12" sm="6" class="px-2">
                  <v-text-field
                  disabled
                    v-model="barcodest"
                    :rules="rules"
                    counter
                    maxlength="25"
                    label="บาร์โค้ด"
                  ></v-text-field>
                  <barcode v-model="barcodest" :options="{ displayValue: false }"></barcode>
                </v-col>
              </v-row>
            </v-form>
          </v-card>

          <v-btn text @click="e1 = 1"> ย้อนกลับ </v-btn>
          <v-btn class="botton white--text" @click="e1 = 3"> ถัดไป </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" flat>
            <v-form>
              <v-row no-gutters>
                <v-col cols="12" sm="12" class="px-2 py-2">
                  ชื่อสินทรัพย์: {{assetname}}
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
                     <img :src="image" alt="" height="200px" width="200px" align-center >
                  </div>
                </v-col>
                <v-col cols="12" sm="6" class="px-2 py-2">
                  บารโค้ด: {{ barcodest }} <v-btn outlined>พิมพ์บาร์โค้ด</v-btn>
                  <div>
                    <barcode v-model="barcodest" :options="{ displayValue: false }"></barcode>
                  </div>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
          <v-btn text @click="e1 = 2"> ย้อนกลับ </v-btn>
          <v-btn class="botton white--text" @click="e1 = 1"> ยืนยัน </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
import moment from "moment"
export default {
  props: ["AssetData"],
  name: "UpdateAsset",
  data() {
    return {
      e1: 1,
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      assetname: "",
      category_id: "",
      subcategory_id: "",
      barcodest: "",
      description: "",
      img_url: "",
      response: "",
      barcode: "",
      time: Date(),
      image: "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg",
      
    };
  },
  components: {
  
  },
  methods: {
    fileChange(e){
        const file = e.target.files[0]
        this.image = URL.createObjectURL(file)
    },
    genbaecode(){
      this.time = Date()
      this.barcode = moment(this.time).format('YYYYMMDDhhmmss')
      this.barcodest = "NP" + this.barcode
      console.log(this.barcodest)
    },
        testimg () {
      const formData = new FormData()
      formData.append('file', this.selectedFile)
      formData.append('type', 'customer')
      // console.log(formData)
      // console.log(document.querySelector('#fileUpload'))
      this.imagefile = document.querySelector('#fileUpload')
      console.log(this.imagefile.files[0])
      this.urlfile = URL.createObjectURL(this.imagefile.files[0])
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
    getFile () {
      this.imagefile = document.querySelector('#fileUpload')
      console.log(this.imagefile.files)
      this.urlfile = URL.createObjectURL(this.imagefile.files[0])
    },
  },

  mounted() {
    this.genbaecode();
  },
};
</script>

<style scoped>
.botton{
    background: linear-gradient(90.75deg, #00b9f8 5.43%, #3780ee 84.26%), #c4c4c4;
  }
</style>