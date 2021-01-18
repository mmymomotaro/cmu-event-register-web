<template>
<div>
    <v-card>
    <v-card class="pa-3 white--text" color="red darken-1" style="font-size:1.5rem">ต้องการลบสินทรัพย์ "{{SendAssetData.name}}" หรือไม่</v-card>
    <v-card>
      <v-row no-gutters class="pa-3">
        <v-col cols="12" md="6"  class="pa-1" >
          <v-btn block outlined height="2.5rem" @click="cancelDeletegroup()"> ยกเลิก </v-btn>
        </v-col>
        <v-col cols="12" md="6" class="pa-1">
          <v-btn block outlined color="red" height="2.5rem" @click="DeleteAssetdata()"> ยืนยัน </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-card>
<v-dialog
      persistent
      max-width="300"
      v-model="Delete_group"
    >
      <PopupDelete />
    </v-dialog>
</div>
</template>

<script>
import api from "../../services/asset";
import PopupDelete from "../Popup/PopupDelete";
export default {
  name: "DeleteAsset",
  props: ["SendAssetData"],
  data() {
    return {
      Delete_group: false,
      dataclose: false,
      Asset: [],
      response: "",
    };
  },
  components: { PopupDelete },
  methods: {
    openDeleting() {
      this.Delete_group = true;
    },
    closeDeleting() {
      this.Delete_group = false;
    },
    DeleteAssetdata() {
      this.openDeleting() 
      api.DeleteAsset(
        {
          id: this.SendAssetData.id,
        },
        (result) => {
          this.Asset = result.data;
          console.log( this.Asset)
          this.closeDeleting()
          this.closeDeletegroup()

        },
        (error) => {
          this.Delete_group = false;
          console.log(error);
        }
      );
    },
    cancelDeletegroup(){
      this.$emit("cancel", this.dataclose);
    },
    closeDeletegroup(){
      this.$emit("close", this.dataclose);
    },
  },
  mounted() {
  },
};
</script>
