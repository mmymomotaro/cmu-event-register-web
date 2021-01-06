<template>
  <div id="manageAsset">
    <v-card class="pa-0 ma-0" elevation="1" tile color="white">
      <v-container grid-list-xs>
        <v-row>
          <v-col cols="12" md="9" style="font-size:1.5rem;">
            จัดการสินทรัพย์
            </v-col>
          <v-col cols="12" md="3" class="pa-2"
            > <v-btn block justify-center large class="button white--text"   @click="openInsertAsset()">เพิ่มสินทรัพย์</v-btn></v-col
          >
        </v-row>
      </v-container>
    </v-card>

    <v-container grid-list-xs>
      <v-item-group active-class="primary">
        <v-row>
          <v-col
            cols="6"
            md="2"
            class="pa-2"
            v-for="item in AssetList" :key="item.name"
          >
            <v-card class="mx-auto" max-width="400">
              <v-img
                class="white--text align-end"
                height="200px"
              :src="item.url"
              >
              </v-img>
              <v-card-text
                class="text--primary pa-2"
                @click="golistAssetitem(item.id)"
              >
                <div style="font-size: 16px; font-weight: bold; height: 50px">
                  {{ item.name }}
                </div>
                <div style="font-size: 14px">
                  <v-list-item-icon class="ma-0"
                    ><v-icon color="gray" class="pr-2">qr_code_2</v-icon
                    >{{ item.barcode }}</v-list-item-icon
                  >
                </div>
                <div style="font-size: 14px">{{ item.category_name }}</div>
                <div style="font-size: 14px">
                  <v-list-item-icon class="ma-0"
                    >{{ item.sub_category_name }}</v-list-item-icon
                  >
                </div>
                <div v-if="item.qty === 0">
                  <div style="font-size: 14px" class="grey-darken-1--text">
                    <v-list-item-icon class="ma-0"
                      ><v-icon color="" class="pr-2">check_circle</v-icon> เหลือ
                      {{ item.qty }} ชิ้น</v-list-item-icon
                    >
                  </div>
                </div>
                <div v-else>
                  <div style="font-size: 14px" class="green--text">
                    <v-list-item-icon class="ma-0"
                      ><v-icon color="green" class="pr-2">check_circle</v-icon> เหลือ
                      {{ item.qty }} ชิ้น</v-list-item-icon
                    >
                  </div>
                </div>
              </v-card-text>

              <v-row no-gutters>
                <v-col cols="12" md="6" class="pa-1">
                  <v-btn color="blue" text block @click="openUpdateAsset(item)">แก้ไข</v-btn>
                </v-col>
                <v-col cols="12" md="6" class="pa-1">
                  <v-btn color="red" text block @click="openDeleteAsset()">ลบ</v-btn>
                </v-col>
              </v-row>

              <!-- <v-card-actions class="pa-1 pt-0">
                <v-btn
                  color="blue"
                  text
                  outlined
                  block
                  @click="openUpdateAsset(item)"
                  >แก้ไข</v-btn>
              </v-card-actions>

              <v-card-actions class="pa-1 pt-0">
                <v-btn color="red" text outlined block @click="openDeleteAsset()"
                  >ลบ</v-btn>
              </v-card-actions> -->
          
            </v-card>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>

    <v-dialog transition="dialog-top-transition" max-width="900" v-model="Insert_group">
      <InsertAsset
    /></v-dialog>

    <v-dialog transition="dialog-top-transition" max-width="900" v-model="Update_group">
      <UpdateAsset :SendAssetData="group_data"
    /></v-dialog>

    <v-dialog transition="dialog-top-transition" max-width="500" v-model="Delete_group">
      <DeleteAsset :SendAssetData="group_data"
    /></v-dialog>
  </div>
</template>

<script>
import InsertAsset from "../../components/Asset/InsertAsset.vue";
import UpdateAsset from "../../components/Asset/UpdateAsset.vue";
import DeleteAsset from "../../components/Asset/DeleteAsset.vue";
import api from "../../services/asset";
export default {
  name: "manageAsset",
  data() {
    return {
      AssetList: [],
      // MoxAssetList: [
      //   {name: "Asus",barcode: "NP9716854654", category_id: 1 , sub_category_id: 2 , qty: 4 },
      //   {name: "Acer",barcode: "NP9584554271", category_id: 5 , sub_category_id: 2 , qty: 0 },
      // ],
      Insert_group: false,
      Update_group: false,
      Delete_group: false,
      group_data: {},
      time: "",
    };
  },
  components: {
    InsertAsset,
    UpdateAsset,
    DeleteAsset,
  },
  methods: {
    openInsertAsset() {
      this.Insert_group = true;
    },
    openUpdateAsset(val) {
      this.group_data = val;
      this.Update_group = true;
    },
    openDeleteAsset(val) {
      this.group_data = val;
      this.Delete_group = true;
    },
    golistAssetitem(val) {
      this.$router.push("listAssetitem/" + val);
    },
    ListAssetdata() {
      api.ListAsset(
        {
          id: null,
        },
        (result) => {
          this.AssetList = result.data;
          console.log(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  mounted() {
    this.ListAssetdata();
  },
};
</script>

<style lang="scss" scoped>
.button {
  font-size: 1.25rem;
  background: linear-gradient(90.75deg, #00b9f8 5.43%, #3780ee 84.26%), #c4c4c4;
}
</style>
