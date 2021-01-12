<template>
<div>
    <v-card>
    <v-card class="pa-3 white--text" color="red" style="font-size:1.5rem">ต้องการลบ "{{categoryData.name}}" หรือไม่</v-card>
    <v-card>
      <v-row no-gutters class="pa-3">
        <v-col cols="12" md="6"  class="pa-1" >
          <v-btn block outlined height="2.5rem" @click="closeDeletegroup()"> ยกเลิก </v-btn>
        </v-col>
        <v-col cols="12" md="6" class="pa-1">
          <v-btn block outlined color="red" height="2.5rem" @click="DeleteCategorydata()"> ยืนยัน </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-card>
<v-dialog
      persistent
      max-width="300"
      v-model="Delete_group"
    >
      <DeletingCatgory />
    </v-dialog>
</div>
</template>

<script>
import api from "../../services/asset";
import DeletingCatgory from "../../components/Category/DeletingCatgory.vue";
export default {
  name: "DeleteAsset",
  props: ["categoryData"],
  data() {
    return {
      Delete_group: false,
      dataclose: false,
      Categoryitem: [],
      categoryname: "",
      response: "",
    };
  },
  components: { DeletingCatgory },
  methods: {
    closeDeletegroup(){
      console.log(this.dataclose)
      this.$emit("close", this.dataclose);
    },
    openDeleting() {
      this.Delete_group = true;
    },
    closeDeleting() {
      this.Delete_group = false;
    },
    DeleteCategorydata() {
      this.openDeleting()
      api.DeleteCategory(
        {
          id: this.categoryData.id,
        },
        (result) => {
          this.Categoryitem = result.data;
          this.closeDeleting()
          this.closeDeletegroup()
        },
        (error) => {
          console.log(error);
        }
      );
    },

  },
  mounted() {
    console.log('cat ID',this.categoryData.id)
  },
};
</script>
