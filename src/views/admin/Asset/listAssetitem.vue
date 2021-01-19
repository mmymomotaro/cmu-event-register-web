<template>
  <div id="listAssetitem">
    <v-card class="pa-0 ma-0" elevation="1" tile color="white">
      <v-container grid-list-xs>
        <v-row>
          <v-col cols="12" md="9" style="font-size: 1.5rem">
            <div>{{ headerdata.name }}</div>
            <div style="font-size: 1rem">
              <v-icon color="black">description</v-icon> {{ headerdata.description }}
            </div>
            <div style="font-size: 1rem">
              <v-icon color="black">view_week</v-icon> {{ headerdata.barcode }}
            </div>
          </v-col>

          <v-col cols="12" md="3" class="pa-2">
            <v-hover>
              <v-btn
                block
                large
                class="button white--text"
                @click="openInsertAssetItem(Asset_id)"
                >เพิ่มจำนวน</v-btn
              >
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-container grid-list-xs>
      <div style="font-size: 1.5rem">อยู่ในคลัง ({{ headerdata.qty_available }})</div>
      <v-card>
        <v-responsive class="overflow-y-auto" max-height="200">
          <v-responsive>
            <v-lazy
              v-model="isActive"
              :options="{
                threshold: 0.5,
              }"
              color="primary"
              min-height="200"
              transition="fade-transition"
            >
              <v-row class="ma-2">
                <v-expansion-panels style="justify-content: left">
                  <v-col
                    cols="12"
                    md="4"
                    class="pa-1"
                    v-for="(Asset, i) in AssetListitemA"
                    :key="i"
                  >
                    <v-expansion-panel>
                      <v-row align="center" no-gutters>
                        <v-col cols="10" md="10">
                          <v-expansion-panel-header
                            class="pa-0 pl-5"
                            style="font-size: 1rem; border-left: solid blue 3px"
                            @click="ListAssetItemDetaildata(Asset)"
                          >
                            <div v-if="Asset.serial_number === ''">
                              <div>
                                <v-icon color="black" class="pa-0"> qr_code</v-icon> ไม่มี
                                <v-progress-circular
                                  max="10"
                                  :rotate="360"
                                  :size="40"
                                  :width="10"
                                  :value="Asset.condition"
                                  color="blue"
                                >
                                  {{ value }}
                                </v-progress-circular>
                              </div>
                            </div>
                            <div v-else>
                              <v-icon color="black" class="pa-0"> qr_code</v-icon>
                              {{ Asset.serial_number }}
                            </div>
                          </v-expansion-panel-header>
                        </v-col>
                        <v-col cols="1" md="1">
                          <v-menu>
                            <template v-slot:activator="{ on: menu, attrs }">
                              <v-tooltip bottom>
                                <template v-slot:activator="{ on: tooltip }">
                                  <v-btn
                                    fab
                                    text
                                    small
                                    color="grey"
                                    v-bind="attrs"
                                    v-on="{ ...tooltip, ...menu }"
                                    @click="ClickAssetItemDetaildata(Asset)"
                                  >
                                    <v-icon color="black"> settings </v-icon>
                                  </v-btn>
                                </template>
                                <span>แก้ไข</span>
                              </v-tooltip>
                            </template>
                            <v-list>
                              <v-list-item>
                                <v-btn
                                  color="blue lighten-1"
                                  block
                                  outlined
                                  @click="openUpdateAssetItem(clickAssetData)"
                                >
                                  <v-icon>create</v-icon></v-btn
                                >
                              </v-list-item>
                              <v-list-item>
                                <v-btn
                                  color="red"
                                  outlined
                                  block
                                  @click="openDeleteAssetItem(clickAssetData)"
                                >
                                  <v-icon>delete</v-icon></v-btn
                                >
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </v-col>
                      </v-row>

                      <v-expansion-panel-content>
                        <v-row class="pt-4">
                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-icon color="blue">location_on</v-icon
                            >{{ Assetdetail.location }}
                          </v-col>
                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-icon color="blue">person</v-icon>
                          </v-col>
                          <v-col cols="12" class="pa-1"> </v-col>
                        </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-col>
                </v-expansion-panels>
              </v-row>
            </v-lazy>
          </v-responsive>
        </v-responsive>
      </v-card>

      <div style="font-size: 1.5rem">ถอน ({{ headerdata.qty_unavailable }})</div>
      <v-card>
        <v-responsive class="overflow-y-auto" max-height="200">
          <v-responsive>
            <v-lazy
              v-model="isActive"
              :options="{
                threshold: 0.5,
              }"
              color="primary"
              min-height="200"
              transition="fade-transition"
            >
              <v-row class="ma-2">
                <v-expansion-panels style="justify-content: left">
                  <v-col
                    cols="12"
                    md="4"
                    class="pa-1"
                    v-for="(Asset, i) in AssetListitemB"
                    :key="i"
                  >
                    <v-expansion-panel>
                      <v-row align="center" no-gutters>
                        <v-col cols="11" md="11">
                          <v-expansion-panel-header
                            class="pa-0 pl-5"
                            style="font-size: 1rem; border-left: solid yellow 3px"
                            @click="ClickAssetItemDetaildata(Asset)"
                          >
                            <div v-if="Asset.serial_number === ''">
                              <div>
                                <v-icon color="black" class="pa-0"> qr_code</v-icon> ไม่มี
                                <v-progress-circular
                                  max="10"
                                  :rotate="360"
                                  :size="40"
                                  :width="10"
                                  :value="Asset.condition"
                                  color="yellow"
                                >
                                  {{ value }}
                                </v-progress-circular>
                              </div>
                            </div>
                            <div v-else>
                              <v-icon color="black" class="pa-0"> qr_code</v-icon>
                              {{ Asset.serial_number }}
                            </div>
                          </v-expansion-panel-header>
                        </v-col>
                      </v-row>

                      <v-expansion-panel-content>
                        <v-row class="pt-4">
                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-icon color="blue">event</v-icon>
                            {{ Assetdetail.update_at }}
                          </v-col>
                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-icon color="blue">person</v-icon>
                          </v-col>
                          <v-col cols="12" class="pa-1"> </v-col>
                        </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-col>
                </v-expansion-panels>
              </v-row>
            </v-lazy>
          </v-responsive>
        </v-responsive>
      </v-card>
    </v-container>

    <v-dialog transition="dialog-top-transition" max-width="900" v-model="Insert_group">
      <InsertAssetItem
        :Asset="group_data"
        @close="closeInsertAssetItem"
        @cancel="cancelInsert"
      />
    </v-dialog>

    <v-dialog transition="dialog-top-transition" max-width="900" v-model="Update_group">
      <UpdateAssetItem
        :AssetItem="group_data"
        @close="closeUpdateAssetItem"
        @cancel="cancelUpdate"
      />
    </v-dialog>

    <v-dialog transition="dialog-top-transition" max-width="500" v-model="Delete_group">
      <DeleteAssetItem
        :AssetItem="group_data"
        @close="closeDeleteAssetItem"
        @cancel="cancelDelete"
      />
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import InsertAssetItem from "../../../components/AssetItem/InsertAssetItem.vue";
import UpdateAssetItem from "../../../components/AssetItem/UpdateAssetItem.vue";
import DeleteAssetItem from "../../../components/AssetItem/DeleteAssetItem.vue";
import api from "../../../services/asset";
export default {
  name: "listAssetitem",
  data() {
    return {
      group_data: "",
      isActive: false,
      Insert_group: false,
      Update_group: false,
      Delete_group: false,
      Asset_id: this.$route.params.id,
      AssetListitemA: [],
      AssetListitemB: [],
      assetdetailID: 0,
      Assetdetail: [],
      headerdata: [],
      clickAssetData: [],
      condition: 5,
    };
  },
  components: { InsertAssetItem, UpdateAssetItem, DeleteAssetItem },
  methods: {
    openInsertAssetItem(val) {
      this.group_data = val;
      this.Insert_group = true;
    },
    openUpdateAssetItem(val) {
      this.group_data = val;
      this.Update_group = true;
    },
    openDeleteAssetItem(val) {
      this.group_data = val;
      this.Delete_group = true;
    },

    closeInsertAssetItem(close, assetid) {
      this.Insert_group = close;
      this.ListAssetItemA(assetid);
      this.ListAssetItemB(assetid);
      this.HaederAssetdata(assetid);
    },
    closeUpdateAssetItem(close, assetid) {
      this.Update_group = close;
      this.ListAssetItemA(assetid);
      this.ListAssetItemB(assetid);
      this.HaederAssetdata(assetid);
    },
    closeDeleteAssetItem(close, assetid) {
      this.Delete_group = close;
      this.ListAssetItemA(assetid);
      this.ListAssetItemB(assetid);
      this.HaederAssetdata(assetid);
    },

    cancelInsert(close) {
      this.Insert_group = close;
    },
    cancelUpdate(close) {
      this.Update_group = close;
    },
    cancelDelete(close) {
      this.Delete_group = close;
    },
    ListAssetItemA() {
      api.ListAssetItemAvailable(
        {
          id: parseInt(this.Asset_id),
        },
        (result) => {
          this.AssetListitemA = result.data;
          this.AssetListitemA.condition = this.AssetListitemA.condition * 10;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    ListAssetItemB() {
      api.ListAssetItemUnavailable(
        {
          id: parseInt(this.Asset_id),
        },
        (result) => {
          this.AssetListitemB = result.data;
          this.AssetListitemB.condition = this.AssetListitemB.condition * 10;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    HaederAssetdata() {
      api.HaederAsset(
        {
          id: parseInt(this.Asset_id),
        },
        (result) => {
          this.headerdata = result.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    ListAssetItemDetaildata(val) {
      api.ListAssetItemDetail(
        {
          id: val.id,
        },
        (result) => {
          this.Assetdetail = result.data;
          this.Assetdetail.update_at = moment(this.Assetdetail.update_at).format(
            "DD-MM-YYYY"
          );
          console.log(this.Assetdetail);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    ClickAssetItemDetaildata(val) {
      api.ListAssetItemDetail(
        {
          id: val.id,
        },
        (result) => {
          this.clickAssetData = result.data;
          console.log(this.clickAssetData);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  mounted() {
    this.HaederAssetdata();
    this.ListAssetItemA();
    this.ListAssetItemB();
  },
};
</script>

<style lang="scss" scoped>
.button {
  font-size: 1.25rem;
  height: 2.5rem;
  background: linear-gradient(90.75deg, #00b9f8 5.43%, #3780ee 84.26%), #c4c4c4;
}
</style>
