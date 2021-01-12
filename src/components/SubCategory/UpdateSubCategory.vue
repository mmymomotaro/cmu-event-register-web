<template>
  <v-card>
    <v-toolbar color="primary" dark>แก้ไขประเภท</v-toolbar>
    <v-card-actions class="justify-center"></v-card-actions>
    <v-card class="mx-5" flat>
      <v-form>
        <v-text-field
          v-model="SubcategoryData.sname" counter maxlength="25" hint="ความยาวหมวดหมู่ไม่เกิน 25 ตัวอักษร" required ></v-text-field>
      </v-form>
    </v-card>
    <v-card>
      <div class="col">
        <v-btn color="light-blue darken-1" class="white--text" block @click="UpdateSubCategorydata()">
          <h3>แก้ไข</h3>
        </v-btn>
      </div>
    </v-card>
  </v-card>
</template>

<script>
import api from "../../services/asset";
export default {
  name: "FormUpdateSubCategory",
  props: ["SubcategoryData"],
  data() {
    return {
      SubCategoryitem: [],
      response: "",
    };
  },
  components: {},
  methods: {
    UpdateSubCategorydata() {
      api.UpdateSubCategory(
        {
          id: this.SubcategoryData.id,
          sname:this.SubcategoryData.sname,
        },
        (result) => {
          this.SubCategoryitem = result.data;
          // console.log(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  mounted() {
  },
};
</script>
