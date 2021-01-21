<template>
  <div>
    <v-card>
      <v-card class="pa-3 white--text" color="red" style="font-size: 1.5rem"
        >เปลี่ยนเป็นสถานะเสียหรือไม่</v-card
      >
      <v-card>
        <v-row no-gutters class="pa-3">
          <v-col cols="12" md="6" class="pa-1">
            <v-btn block outlined height="2.5rem" @click="cancelChangegroup()">
              ยกเลิก
            </v-btn>
          </v-col>
          <v-col cols="12" md="6" class="pa-1">
            <v-btn
              block
              outlined
              color="red"
              height="2.5rem"
              @click="changestatus(AssetitemID)"
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
  name: "ChangeAssetItem",
  props: ["AssetitemID"],
  data() {
    return {
      response: "",
      Delete_group: false,
      dataclose: false,
    };
  },
  components: { PopupDelete },
  methods: {
    testID(a){
      console.log(a)
    },
    closeChangegroup() {
      this.$emit("close", this.dataclose);
    },
    cancelChangegroup() {
      this.$emit("cancel", this.dataclose);
    },
    openDelete() {
      this.Delete_group = true;
    },
    closeDelete() {
      this.Delete_group = false;
    },
    changestatus(val) {
      api.UpdatestatusAssetItem(
        {
          id: val,
        },
        (result) => {
          this.respones = result.respones;
          this.closeChangegroup();
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
