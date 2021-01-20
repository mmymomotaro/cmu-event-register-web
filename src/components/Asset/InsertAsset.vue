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
                  <v-col cols="12" md="8" class="px-2">
                    <v-text-field
                      required
                      v-model="assetname"
                      counter
                      maxlength="20"
                      hint="This field uses maxlength attribute"
                      label="ชื่อสินทรัพย์"
                      color="light-blue darken-3"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" class="px-2">
                    <v-select
                      color="light-blue darken-3"
                      v-model="typeSNdata"
                      :items="typeSN"
                      item-text="name"
                      return-object
                      label="ซีเรียวโค้ด"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" class="px-2">
                    <v-select
                      color="light-blue darken-3"
                      v-model="Categorydata"
                      :items="CategoryList"
                      item-text="name"
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
                      v-model="description"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-form>
            </v-card>
            <v-btn text @click="cancelInsertgroup()"> ยกเลิก </v-btn>
            <v-btn class="botton white--text" @click="e1 = 2"> ถัดไป </v-btn>
          </v-stepper-content>
          <v-stepper-content step="2" class="pa-2">
            <v-card flat>
              <v-form>
                <v-row no-gutters>
                  <v-col cols="12" sm="6" class="px-2">
                    <img
                      height="200px"
                      width="200px"
                      :src="
                        urlfile == ''
                          ? 'https://firebasestorage.googleapis.com/v0/b/np-storage-it.appspot.com/o/no-image.jpg?alt=media'
                          : urlfile
                      "
                      @click="$refs.fileUpload.click()"
                    />
                    <input
                      color="light-blue darken-3"
                      type="file"
                      class="form-control-file"
                      id="fileUpload"
                      ref="fileUpload"
                      hidden
                      @change="testimg"
                    />
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
                      <v-col cols="12" class="pa-0 ma-0" style="height: 200px">
                        <v-btn class="botton white--text" block @click="genbarcode()"
                          >Barcode</v-btn
                        >
                        <barcode
                          v-if="barcodest != ''"
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
                      <img
                        height="200px"
                        width="200px"
                        :src="
                          urlfile == ''
                            ? 'https://firebasestorage.googleapis.com/v0/b/np-storage-it.appspot.com/o/no-image.jpg?alt=media'
                            : urlfile
                        "
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="px-2 py-2">
                    บารโค้ด: {{ barcodest }} <v-btn outlined>พิมพ์บาร์โค้ด</v-btn>
                    <div>
                      <barcode
                        v-model="barcodest"
                        v-if="barcodest != ''"
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

    <v-dialog persistent max-width="300" v-model="Insert_group">
      <PopupInsert />
    </v-dialog>

    <v-dialog max-width="450" v-model="ErrorInputiden_group">
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
import PopupInsert from "../Popup/PopupInsert";
import PopupErrorInputiden from "../Popup/PopupErrorInputiden.vue";
import PopupResponError from "../Popup/PopupResponError.vue";
export default {
  name: "InsertAsset",
  data() {
    return {
      AssetdataInsertitem: null,
      dataclose: false,
      Insert_group: false,
      ErrorInputiden_group: false,
      ErrorRespon_group: false,
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
      time: "",
      response: "",
      imagefile: "",
      urlfile:
        "https://firebasestorage.googleapis.com/v0/b/np-storage-it.appspot.com/o/no-image.jpg?alt=media",
      img:
        "https://firebasestorage.googleapis.com/v0/b/np-storage-it.appspot.com/o/no-image.jpg?alt=media",
      urlFromApi: "",
      itemImg: "",
      genimg: "",
      typeSN: [
        { id: 1, name: "มี" },
        { id: 0, name: "ไม่มี" },
      ],
      typeSNdata: [],
    };
  },
  components: { PopupInsert, PopupErrorInputiden, PopupResponError },
  methods: {
    resetdata() {
      (this.selectedFile = ""),
        (this.dataclose = false),
        (this.Insert_group = false),
        (this.ErrorInputiden_group = false),
        (this.ErrorRespon_group = false),
        (this.e1 = 1),
        (this.asset = []),
        (this.assetname = ""),
        (this.CategoryList = []),
        (this.Categorydata = []),
        (this.SubCategoryList = []),
        (this.SubCategorydata = []),
        (this.barcodest = ""),
        (this.description = ""),
        (this.barcode = ""),
        (this.time = ""),
        (this.response = ""),
        (this.imagefile = ""),
        (this.urlfile = ""),
        (this.img =
          "https://firebasestorage.googleapis.com/v0/b/np-storage-it.appspot.com/o/no-image.jpg?alt=media"),
        (this.urlFromApi = ""),
        (this.itemImg = ""),
        (this.genimg = ""),
        (this.typeSN = [
          { id: 1, name: "มี" },
          { id: 0, name: "ไม่มี" },
        ]),
        (this.typeSNdata = []),
        this.ListCategorydata();
    },
    checkdataUpload() {
      if (
        this.assetname == "" ||
        this.typeSNdata == "" ||
        this.Categorydata == "" ||
        this.SubCategorydata == "" ||
        this.barcodest == ""
      ) {
        this.ErrorInputiden_group = true;
        setTimeout(() => {
          this.ErrorInputiden_group = false;
        }, 2000);
      } else {
        this.checkimgdata();
      }
    },
    openLoading() {
      this.Loading_group = true;
    },
    closeLoading() {
      this.Loading_group = false;
    },
    cancelInsertgroup() {
      this.$emit("cancel", this.dataclose);
    },
    closeInsertgroup() {
      this.resetdata();
      console.log(this.AssetdataInsertitem);
      this.$emit("close", this.dataclose, this.AssetdataInsertitem);
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
        this.uploadimage();
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
        types: this.typeSN.id,
      };
      api.InsertAsset(
        payload,
        (result) => {
          this.response = result.response;
          this.AssetdataInsertitem = result.data.id;
          this.resetdata();
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
        types: this.typeSN.id,
      };
      api.InsertAsset(
        payload,
        (result) => {
          this.response = result.response;
          this.AssetdataInsertitem = result.data.id;
          this.resetdata();
          this.closeLoading();
          this.closeInsertgroup();
        },
        (error) => {
          console.log(error);
        }
      );
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
    async testimg() {
      try {
        const formData = new FormData();
        formData.append("file", this.selectedFile);
        formData.append("type", "customer");

        this.imagefile = document.querySelector("#fileUpload");

        this.urlfile = URL.createObjectURL(this.imagefile.files[0]);
      } catch (error) {
        console.log(error);
      }
    },
    genbarcode() {
      this.time = Date();
      this.barcode = moment(this.time).format("YYMMDDhhmmss");
      this.barcodest = "NP" + this.barcode;
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
