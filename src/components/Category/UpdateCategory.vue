<template>
  <div class="UpdateCategory">
    <v-card class="pa-3 white--text" color="blue darken-1" style="font-size: 1.5rem"
      >แก้ไขข้อมูล</v-card
    >
    <v-card class="pa-3">
      <v-text-field
        v-model="categoryData.name"
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
          <v-btn block outlined color="primary" height="2.5rem" @click="checkdata()">
            ยืนยัน
          </v-btn>
        </v-col>
      </v-row>
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
import api from "../../services/asset";
import PopupErrorInputiden from "../Popup/PopupErrorInputiden";
import PopupResponError from "../Popup/PopupResponError.vue";
import PopupUpdate from "../Popup/PopupUpdate";
export default {
  name: "UpdateCategory",
  props: ["categoryData"],
  data() {
    return {
      response: "",
      categoryname: "",
      dataclose: false,
      Update_group: false,
      Error_group: false,
      ErrorRespon_group: false,
      
    };
  },
  components: { PopupUpdate, PopupErrorInputiden,PopupResponError},
  methods: {
    checkdata() {
      if (this.categoryData.name === "") {
        this.Error_group = true;
        setTimeout(() => {
          this.Error_group = false;
        }, 2000);
      } else {

        this.UpdateCategorydata();
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
      this.$emit("close", this.dataclose);
    },
    UpdateCategorydata() {

      this.openUpdate();
      api.UpdateCategory(
        {
          id: this.categoryData.id,
          name: this.categoryData.name,
        },
        (result) => {

          this.response = result.response;
          console.log('sdf',this.response)
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
