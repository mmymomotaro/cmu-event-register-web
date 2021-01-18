<template>
  <div>
    <v-card>
      <v-card class="pa-3 white--text" color="red" style="font-size: 1.5rem"
        >ต้องการลบ "{{ subcateData.sname }}" หรือไม่</v-card
      >
      <v-card>
        <v-row no-gutters class="pa-3">
          <v-col cols="12" md="6" class="pa-1">
            <v-btn block outlined height="2.5rem" @click="cancelDeletegroup()">
              ยกเลิก
            </v-btn>
          </v-col>
          <v-col cols="12" md="6" class="pa-1">
            <v-btn
              block
              outlined
              color="red"
              height="2.5rem"
              @click="DeleteSubCategorydata()"
            >
              ยืนยัน
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-card>
    <v-dialog persistent max-width="300" v-model="Delete_group">
      <PopupDelete />
    </v-dialog>
  </div>
</template>

<script>
import PopupDelete from "../Popup/PopupDelete";
import api from "../../services/asset";
export default {
  name: "DeleteSubCatgory",
  props: ["subcategoryData"],
  data() {
    return {
      subcateData: this.subcategoryData,
      subCategoryitem: [],
      response: "",
      Delete_group: false,
      dataclose: false,
    };
  },
  components: { PopupDelete },
  methods: {
    closeDeletegroup() {
      this.$emit("close", this.dataclose, this.subcateData.category_id);
    },
    cancelDeletegroup() {
      this.$emit("cancel", this.dataclose);
    },
    openDelete() {
      this.Delete_group = true;
    },
    closeDelete() {
      this.Delete_group = false;
    },
    DeleteSubCategorydata() {
      this.openDelete();
      api.DeleteSubCategory(
        {
          id: parseInt(this.subcateData.id),
        },
        (result) => {
          this.subCategoryitem = result.data;
          this.closeDelete();
          this.closeDeletegroup();
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  watch: {
    subcategoryData(val) {
      if (val) {
        this.subcateData = this.subcategoryData;
      }
    },
  },
  mounted() {},
};
</script>
