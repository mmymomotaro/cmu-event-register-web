<template>
<div>
    <v-card>
    <v-card class="pa-3 white--text" color="red" style="font-size:1.5rem">มีสินทรัพย์เสียหาย คุณต้องการไปหน้าสินทัพย์เสียหายหรือไม่</v-card>
    <v-card>
      <v-row no-gutters class="pa-3">
        <v-col cols="12" md="6"  class="pa-1" >
          <v-btn block outlined height="2.5rem" @click="cancelDeletegroup()"> ยกเลิก </v-btn>
        </v-col>
        <v-col cols="12" md="6" class="pa-1">
          <v-btn block outlined color="red" height="2.5rem" @click="closeDeletegroup()"> ไป </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-card>

</div>
</template>

<script>
export default {
  name: "NullAssetItem",
  props: ["AssetitemID"],
  data() {
    return {
      AssetItemIDdata: [],
      response: "",
      Delete_group: false,
      dataclose: false,
    };
  },
  components: {},
  methods: {
  closeDeletegroup(){
      this.$emit("close", this.dataclose);
    },
  cancelDeletegroup(){
      this.$emit("cancel", this.dataclose);
    },
    openDelete() {
      this.Delete_group = true;
    },
    closeDelete() {
      this.Delete_group = false;
    },
  },
  watch: {
    AssetitemID(val) {
      if (val) {
        this.AssetItemIDdata = this.AssetitemID
      }
    },
  },
  mounted() {
    this.AssetItemIDdata = this.AssetitemID
  },
};
</script>
