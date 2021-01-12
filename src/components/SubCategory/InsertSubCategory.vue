<template>
          <v-card>
            <v-toolbar color="primary" dark >เพิ่มประเภท</v-toolbar>
            <v-card-actions class="justify-center"> </v-card-actions>
            <v-card class="mx-5" flat>
              <v-form >
                <v-text-field
                  v-model="subcategoryname"
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
                  @click.stop="CheckSubCategoryData(category_ID)"
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
name: 'FormInsertSubCategory',
props: ["category_ID"],
data(){
  return {
      subcategoryname: "",
      response: "",
  }
},
components: {  },
 methods: {
    CheckSubCategoryData() {
      if (this.subcategoryname === "") {
        Swal.fire({
          icon: "error",
          title: "กรุณากรอกชื่อ",
        });
      } else {
        this.InsertSubCategoryData();
      }
    },

    InsertSubCategoryData() {
      console.log(this.subcategoryname,this.category_ID)
      api.InsertSubCategory(
        {
          category_id: parseInt(this.category_ID),
          sname: this.subcategoryname,
        },
        (result) => {
          console.log("response =",this.response ,"text =",this.subcategoryname)
          this.response = result.response;
          if (this.response === "false") {
            Swal.fire({
              icon: "error",
              title: "ชื่อหมวดหมู่ซ้ำ กรุณากรอกใหม่",
            });
          } else {
              Swal.fire({
              icon: "success",
              title: "เพิ่มหมวดหมู่สำเร็จ",
            });
          }

        },
        (error) => {
          console.log(error);
        }
      );
    },
  },

  mounted() {
    console.log(this.category_ID)
    },
}
</script>