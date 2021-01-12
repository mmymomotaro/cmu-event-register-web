<template>
  <v-card>
    <v-toolbar color="primary" dark>แก้ไขหมวดหมู่</v-toolbar>
    <v-card-actions class="justify-center"></v-card-actions>
    <v-card class="mx-5" flat>
      <v-form>
        <v-text-field
          v-model="categoryData.name" counter maxlength="25" hint="ความยาวหมวดหมู่ไม่เกิน 25 ตัวอักษร" required ></v-text-field>
      </v-form>
    </v-card>
    <v-card>
      <div class="col">
        <v-btn color="light-blue darken-1" class="white--text" block @click="UpdateCategorydata()">
          <h3>แก้ไข</h3>
        </v-btn>
      </div>
    </v-card>
  </v-card>
</template>

<script>
import api from "../../services/asset";
export default {
  name: "UpdateCategory",
  props: ["categoryData"],
  data() {
    return {
      Categoryitem: [],
      categoryname: "",
      response: "",
    };
  },
  components: {},
  methods: {
    UpdateCategorydata() {
      console.log(this.categoryData)
      api.UpdateCategory(
        {
          id: this.categoryData.id,
          name: this.categoryData.name,
        },
        (result) => {
          this.Categoryitem = result.data;
          // console.log(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  mounted() {
    // console.log(this.categoryData)
  },
};
</script>
