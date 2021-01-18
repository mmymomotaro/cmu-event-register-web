<template>
  <div>
    <v-card class="pa-3 white--text" color="primary" style="font-size: 1.5rem"
      >แก้ไขข้อมูล</v-card
    >
    <v-card class="pa-3">
      <v-text-field
        v-model="subcategoryData.sname"
        counter
        maxlength="25"
        hint="ความยาวหมวดหมู่ไม่เกิน 25 ตัวอักษร"
        required
      ></v-text-field>
      <v-row no-gutters>
        <v-col cols="6" md="6" class="pr-1">
          <v-btn block outlined height="2.5rem" @click="cancelUpdategroup()">
            ยกเลิก
          </v-btn>
        </v-col>
        <v-col cols="6" md="6" class="pl-1">
          <v-btn
            block
            outlined
            color="primary"
            height="2.5rem"
            @click="UpdateSubCategorydata()"
          >
            ยืนยัน
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog persistent max-width="300" v-model="Update_group">
      <PopupUpdate />
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
import PopupUpdate from "../Popup/PopupUpdate";
import PopupErrorInputiden from "../Popup/PopupErrorInputiden.vue";
import PopupResponError from "../Popup/PopupResponError.vue";
import api from "../../services/asset";
export default {
  name: "UpdateSubCategory",
  props: ["subcategoryData"],
  data() {
    return {
      response: "",
      dataclose: false,
      Update_group: false,
      ErrorInputiden_group: false,
      ErrorRespon_group: false,
    };
  },
  components: { PopupUpdate , PopupErrorInputiden, PopupResponError  },
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
    openUpdate() {
      this.Update_group = true;
    },
    closeUpdate() {
      this.Update_group = false;
    },
    cancelUpdategroup() {
      this.$emit("cancel", this.dataclose);
    },
    closeUpdategroup() {
      this.$emit("close", this.dataclose, this.subcategoryData.category_id);
    },

    UpdateSubCategorydata() {
      this.openUpdate();
      api.UpdateSubCategory(
        {
          id: this.subcategoryData.id,
          sname: this.subcategoryData.sname,
        },
        (result) => {
          this.response = result.response;
          if (this.response === "success") {
            this.closeUpdate();
            this.closeUpdategroup();
          } else {
            this.closeUpdate();
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
  mounted() {},
};
</script>
