<template>
  <v-card>
    <v-toolbar color="red" dark style="font-size:1.5rem;">ต้องการลบ "{{SubcategoryData.sname}}" หรือไม่</v-toolbar>
    <v-card>
      <v-row no-gutters class="pa-3">
        <v-col cols="12" md="6"  class="pa-1" >
          <v-btn block outlined height="2.5rem"> ยกเลิก </v-btn>
        </v-col>
        <v-col cols="12" md="6" class="pa-1">
          <v-btn block outlined color="red" height="2.5rem"> ยืนยัน </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-card>
</template>

<script>
// import api from "../../services/asset";
export default {
  name: "DeleteSubCatgory",
  props: ["SubcategoryData"],
  data() {
    return {
      Categoryitem: [],
      categoryname: "",
      response: "",
    };
  },
  components: {},
  methods: {},
  mounted() {
    // console.log(this.SubcategoryData);
  },
};
</script>
