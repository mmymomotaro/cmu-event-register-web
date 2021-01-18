<template>
  <div>
    <v-card class="pa-3 white--text" color="blue darken-1" style="font-size: 1.5rem"
      >เพิ่มข้อมูล</v-card
    >
    <v-card class="pa-3">
      <v-text-field
        v-model="categoryname"
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
import PopupInsert from "../Popup/PopupInsert";
import PopupErrorInputiden from "../Popup/PopupErrorInputiden.vue";
import PopupResponError from "../Popup/PopupResponError.vue";
import api from "../../services/asset";
export default {
  name: "InsertCategory",
  data() {
    return {
      categoryname: "",
      response: "",
      dataclose: false,
      Insert_group: false,
      ErrorInputiden_group: false,
      ErrorRespon_group: false,
    };
  },
  components: { PopupInsert, PopupErrorInputiden, PopupResponError },
  methods: {
    checkdata() {
      if (this.categoryname === "") {
        this.ErrorInputiden_group = true;
        setTimeout(() => {
          this.ErrorInputiden_group = false;
        }, 2000);
      } else {
        this.InsertCategoryData();
      }
    },
    openInsert() {
      this.Insert_group = true;
    },
    closeInsert() {
      this.Insert_group = false;
    },
    cancelInsertgroup() {
      (this.categoryname = ""), this.$emit("cancel", this.dataclose);
    },
    closeInsertgroup() {
      (this.categoryname = ""), this.$emit("close", this.dataclose);
    },
    InsertCategoryData() {
      this.openInsert();
      try {
        api.InsertCategory(
          {
            name: this.categoryname,
          },
          (result) => {
            this.response = result.response;
            if (this.response === "success") {
              this.closeInsert();
              this.closeInsertgroup();
            } else {
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
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {},
};
</script>
