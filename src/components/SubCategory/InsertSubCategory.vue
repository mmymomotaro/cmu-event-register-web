<template>
  <div>
    <v-card class="pa-3 white--text" color="primary" style="font-size: 1.5rem"
      >เพิ่มประเภท</v-card
    >
    <v-card class="pa-3">
      <v-text-field
        v-model="subcategoryname"
        counter
        maxlength="25"
        hint="ความยาวหมวดหมู่ไม่เกิน 25 ตัวอักษร"
        required
      ></v-text-field>
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

    <v-dialog max-width="450" v-model="ErrorInputiden_group">
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
import PopupErrorInputiden from "../Popup/PopupErrorInputiden.vue";
import PopupResponError from "../Popup/PopupResponError.vue";
export default {
  name: "InsertSubCategory",
  props: ["category_ID"],
  data() {
    return {
      cat_id: this.category_ID,
      subcategoryname: "",
      dataclose: false,
      Insert_group: false,
      ErrorInputiden_group: false,
      ErrorRespon_group: false,
      response: "",
    };
  },
  components: { PopupInsert, PopupErrorInputiden, PopupResponError },
  methods: {
    checkdata() {
      if (this.subcategoryname === "") {
        this.ErrorInputiden_group = true;
        setTimeout(() => {
          this.ErrorInputiden_group = false;
        }, 2000);
      } else {
        this.InsertSubCategoryData();
      }
    },
    openInsert() {
      this.Insert_group = true;
    },
    closeInsert() {
      this.Insert_group = false;
    },
    cancelInsertgroup() {
      this.subcategoryname= "",
      this.$emit("cancel", this.dataclose);
    },
    closeInsertgroup() {
      this.subcategoryname= "",
      this.$emit("close", this.dataclose, this.cat_id);
    },
    InsertSubCategoryData() {
      this.openInsert();
      api.InsertSubCategory(
        {
          category_id: parseInt(this.cat_id),
          sname: this.subcategoryname,
        },
        (result) => {
          console.log("A")
          this.response = result.response;
          if (this.response === "success"){
            console.log("B")
            this.closeInsert();
            this.closeInsertgroup();
          } else {
            console.log("C")
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
  },
  watch: {
    category_ID(val) {
      if (val) {
        this.cat_id = this.category_ID;
      }
    },
  },
  mounted() {
    console.log(this.cat_id)
  },
};
</script>
