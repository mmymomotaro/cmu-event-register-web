<template>
  <div id="manageAsset">
    <v-card class="pa-0 ma-0" elevation="1" tile color="white">
      <v-container grid-list-xs>
        <v-row no-gutters>
          <v-col cols="12" md="12" style="font-size: 1.7rem" class="text-center">
            <v-row no-gutters>

              <v-col cols="12" md="3">จัดการสินทรัพย์</v-col>
              <v-col cols="2" md="1" class="px-1">
                <div class="text-left">
                  <v-menu
                    bottom
                    :offset-y="offset"
                    :nudge-width="200"
                    transition="slide-y-transition"
                  >
                  <div class="text-left">

                  </div>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        fab
                        text
                        small
                        v-bind="attrs"
                        v-on="on"
                        @click="ListCateAndsubcate()"
                      >
                        <v-icon color="black"> inventory </v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item v-for="cate in CategoryList" :key="cate.id">
                        <v-menu
                          open-on-hover
                          bottom
                          :offset-x="offset"
                          :nudge-width="100"
                          transition="slide-x-transition"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              color="primary"
                              dark
                              v-bind="attrs"
                              v-on="on"
                              block
                              text
                              @click="SearchAssetBycatdata(cate)"
                            >
                              {{ cate.name }}

                            </v-btn>
                          </template>
                          <v-list>
                            <v-list-item v-for="(sub, id) in cate.subs" :key="id">
                              <v-list-item-title>
                                <v-btn color="success" block text
                                @click="SearchAssetBySubcatdata(sub)"
                                >
                                  {{ sub.sub_category_name}}
                                </v-btn></v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </v-col>
              <v-col cols="10" md="8"
                ><v-text-field
                  v-model="search"
                  hide-details
                  solo
                  label="ค้นหา สินทรัพย์ด้วยชื่อ , บาร์โค้ด"
                ></v-text-field
              ></v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-container grid-list-xs>
      <v-row no-gutters class="pb-4">
        <v-col cols="12" md="10">
          <span style="font-size: 1.2rem">
            {{ search != "" ? "ผลลัพธ์ :" : "สินทรัพย์ทั้งหมด" }} {{ search }}</span
          >
        </v-col>
        <v-col cols="12" md="2" class="px-1">
          <v-btn
            style="font-size: 1rem"
            justify-center
            block
            outlined
            class="blue--text"
            @click="openInsertAsset()"
            >เพิ่มสินทรัพย์</v-btn
          >
        </v-col>
      </v-row>
      <v-item-group active-class="primary">
        <v-row no-gutters>
          <v-col
            cols="6"
            md="3"
            lg="2"
            class="pa-1"
            v-for="AssList in AssetList"
            :key="AssList.name"
          >
            <v-card class="mx-auto" max-width="400">
              <v-img class="white--text align-end" height="200px" :src="AssList.url">
              </v-img>
              <v-card-text
                class="text--primary pa-2"
                @click="golistAssetitem(AssList.id)"
              >
                <div style="font-size: 16px; font-weight: bold; height: 50px">
                  {{ AssList.name }}
                </div>
                <div style="font-size: 14px">
                  <v-icon color="gray" class="pr-2">qr_code</v-icon>{{ AssList.barcode }}
                </div>
                <div style="font-size: 14px">{{ AssList.category_name }}</div>
                <div style="font-size: 14px">
                  <v-list-item-icon class="ma-0">{{
                    AssList.sub_category_name
                  }}</v-list-item-icon>
                </div>
                <div v-if="AssList.qty === 0">
                  <div style="font-size: 14px">
                    <v-list-item-icon class="ma-0"
                      ><v-icon class="pr-2">check_circle</v-icon> จำนวน
                      {{ AssList.qty }} ชิ้น</v-list-item-icon
                    >
                  </div>
                </div>
                <div v-else>
                  <div style="font-size: 14px" class="green--text">
                    <v-list-item-icon class="ma-0"
                      ><v-icon color="green" class="pr-2">check_circle</v-icon> จำนวน
                      {{ AssList.qty }} ชิ้น</v-list-item-icon
                    >
                  </div>
                </div>
              </v-card-text>
              <v-row no-gutters>
                <v-col cols="12" class="pa-1">
                  <v-btn
                    text
                    block
                    style="font-size: 0.7rem"
                    @click="openAssetDetail(AssList)"
                    ><v-icon color="grey">analytics</v-icon> ดูข้อมูลเพิ่มเติม</v-btn
                  >
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" md="6" class="pa-1">
                  <v-btn color="blue" text block @click="openUpdateAsset(AssList)"
                    >แก้ไข</v-btn
                  >
                </v-col>
                <v-col cols="12" md="6" class="pa-1">
                  <v-btn color="red" text block @click="openDeleteAsset(AssList)"
                    >ลบ</v-btn
                  >
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>

    <v-dialog
      persistent
      transition="dialog-top-transition"
      max-width="900"
      v-model="Insert_group"
    >
      <InsertAsset @close="closeInsert" @cancel="cancelInsert" />
    </v-dialog>

    <v-dialog
      persistent
      transition="dialog-top-transition"
      max-width="900"
      v-model="Update_group"
    >
      <UpdateAsset
        :SendAssetData="group_data"
        @close="closeUpdate"
        @cancel="cancelUpdate"
      />
    </v-dialog>

    <v-dialog transition="dialog-top-transition" max-width="500" v-model="Delete_group">
      <DeleteAsset
        :SendAssetData="group_data"
        @close="closeDelete"
        @cancel="cancelDelete"
      />
    </v-dialog>

    <v-dialog transition="dialog-top-transition" max-width="900" v-model="Detail_group">
      <AssetDetail :SendAssetData="group_data" />
    </v-dialog>
  </div>
</template>

<script>
import InsertAsset from "../../../components/Asset/InsertAsset.vue";
import UpdateAsset from "../../../components/Asset/UpdateAsset.vue";
import DeleteAsset from "../../../components/Asset/DeleteAsset.vue";
import AssetDetail from "../../../components/Asset/AssetDetail.vue";
import api from "../../../services/asset";
export default {
  name: "manageAsset",
  data() {
    return {
      search: "",
      length: null,
      AssetList: [],
      Insert_group: false,
      Update_group: false,
      Delete_group: false,
      Detail_group: false,
      group_data: {},
      CategoryList: [],
      SubCategoryList: [],
      items: [
        {
          id: 1,
          name: "คอม",
          sub_cate: [
            { id: 1, sname: "เมาส์" },
            { id: 1, sname: "จอ" },
          ],
        },
                {
          id: 1,
          name: "Paybox",
          sub_cate: [
            { id: 1, sname: "ตู้กาแฟ" },
            { id: 1, sname: "กล่องเก็บเงิน" },
          ],
        },
      ],
      offset: true,
    };
  },
  components: {
    InsertAsset,
    UpdateAsset,
    DeleteAsset,
    AssetDetail,
  },
  methods: {
    openInsertAsset() {
      this.Insert_group = true;
    },
    openAssetDetail(val) {
      this.group_data = val;
      this.Detail_group = true;
    },
    openUpdateAsset(val) {
      this.group_data = val;
      this.Update_group = true;
      this.ListAssetdata();
    },
    openDeleteAsset(val) {
      this.group_data = val;
      this.Delete_group = true;
    },

    closeInsert(value, assID) {
      this.Insert_group = value;
      this.ListAssetdata();
      this.golistAssetitem(assID);
    },
    closeUpdate(value) {
      this.Update_group = value;
      this.ListAssetdata();
    },
    closeDelete(value) {
      this.Delete_group = value;
      this.ListAssetdata();
    },

    cancelInsert(value) {
      this.Insert_group = value;
    },
    cancelUpdate(value) {
      this.Update_group = value;
    },
    cancelDelete(value) {
      this.Delete_group = value;
    },

    golistAssetitem(val) {
      this.$router.push("listAssetitem/" + val);
    },
    ListCateAndsubcate() {
      api.SerachAssetCatSub(
        {
          id: null,
        },
        (result) => {
          this.CategoryList = result.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    ListAssetdata() {
      api.ListAsset(
        {
          id: null,
        },
        (result) => {
          this.AssetList = result.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },

    SearchAssetdata(val) {
      api.SerachAsset(
        {
          keyword: val,
          active: 1,
          limit: 25,
          status: 1,
        },
        (result) => {
          this.AssetList = result.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    SearchAssetBycatdata(val) {
      // console.log(val)
      api.SerachAssetBycat(
        {
          category_id: val.id,
          sub_category_id: null,
          status: 1,
        },
        (result) => {
          this.AssetList = result.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    SearchAssetBySubcatdata(val) {

      api.SerachAssetBycat(
        {
          category_id: val.category_id,
          sub_category_id: val.id,
          status: 1,
        },
        (result) => {
          this.AssetList = result.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  watch: {
    search(val) {
      if (val) {
        clearTimeout(this.timeout);
        const self = this;
        this.timeout = setTimeout(function () {
          self.SearchAssetdata(val);
        }, 1000);
      } else {
        this.ListAssetdata();
      }
    },
  },
  mounted() {
    this.ListCateAndsubcate();
    this.ListAssetdata();
  },
};
</script>

<style lang="scss" scoped>
.button {
  font-size: 1.25rem;
  background: linear-gradient(90.75deg, #00b9f8 5.43%, #3780ee 84.26%), #c4c4c4;
}
.bthover:hover {
  border-bottom: 1px;
}
</style>
