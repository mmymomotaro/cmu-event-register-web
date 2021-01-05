<template>
          <v-card>
            <v-toolbar color="primary" dark >เพิ่มหมวดหมู่</v-toolbar>
            <v-card-actions class="justify-center"> </v-card-actions>
            <v-card class="mx-5" flat>
              <v-form >
                <v-text-field
                  v-model="categoryname"
                  counter
                  maxlength="25"
                  hint="ความยาวหมวดหมู่ไม่เกิน 25 ตัวอักษร"
                  required
                ></v-text-field>
              </v-form>
            </v-card>
            <v-card>
              <div class="col">
                <v-btn
                  color="light-blue darken-1"
                  class="white--text"
                  block
                  @click="CheckCategoryData()"
                >
                  <h3>เพิ่มข้อมูล</h3>
                </v-btn>
              </div>
            </v-card>
          </v-card>
</template>

<script>
import api from "../../services/asset";
import Swal from "sweetalert2";
export default {
name: 'FormInsertCategory',

data(){
  return {
      categoryname: "",
      response: "",
  }
},
components: {  },
 methods: {
    CheckCategoryData() {
      if (this.categoryname === "") {
        Swal.fire({
          icon: "error",
          title: "กรุณากรอกชื่อ",
        });
      } else {
        this.InsertCategoryData();
      }
    },
    InsertCategoryData() {
      try {
         api.InsertCategory(
          {
            name: this.categoryname,
          },
          (result) => {
             
            this.response = result.response;
            if (this.response === "success") {
              Swal.fire({
                icon: "success",
                title: "เพิ่มหมวดหมู่สำเร็จ",
              });
            }else{
                
              Swal.fire({
                icon: "error",
                title: "ชื่อหมวดหมู่ซ้ำ กรุณากรอกใหม่",
              });
            }
          },
          (error) => {
            console.log(error);
          }
        );
      // eslint-disable-next-line no-empty
      } catch (error) {
           console.log(error);
      }
     
    },
  },

  mounted() {

    },
}
</script>