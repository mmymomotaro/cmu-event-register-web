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
                    v-for="(AssetA, i) in AssetListitemA"
                    :key="i"
                  >
                    <v-expansion-panel>
                      <v-row align="center" no-gutters>
                        <v-col cols="10" md="10">
                          <v-expansion-panel-header
                            class="pa-0 pl-5"
                            style="font-size: 1rem; border-left: solid blue 3px"
                            @click="ListAssetItemDetaildata(AssetA)"
                          >
                            <div v-if="AssetA.serial_number === ''">
                              <div>
                                <v-icon color="black" class="pa-0"> qr_code</v-icon> ไม่มี
                              </div>
                            </div>
                            <div v-else>
                              <v-icon color="black" class="pa-0"> qr_code</v-icon>
                              {{ AssetA.serial_number }}
                            </div>
                          </v-expansion-panel-header>
                        </v-col>
                        <v-col cols="1" md="2">
                          <v-progress-circular
                            max="10"
                            :rotate="360"
                            :size="20"
                            :width="4"
                            :value="AssetA.conditions * 10"
                            color="blue"
                          >
                            {{ value }}
                          </v-progress-circular>

                          <v-tooltip bottom>
                            <template v-slot:activator="{ on: tooltip }">
                              <v-btn
                                fab
                                text
                                small
                                color="grey"
                                v-bind="attrs"
                                v-on="{ ...tooltip, ...menu }"
                                @click="ClickAssetItemDetaildata(AssetA)"
                              >
                                <v-icon color="black"> article </v-icon>
                              </v-btn>
                            </template>
                            <span>ดูรายละเอียด</span>
                          </v-tooltip>
                        </v-col>
                      </v-row>

                      <v-expansion-panel-content>
                        <v-row class="pt-4">
                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-icon color="blue">location_on</v-icon
                            >{{ Assetdetail.location }}
                          </v-col>
                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-icon color="blue">event</v-icon>
                            {{ Assetdetail.update_at }}
                          </v-col>
                          <v-col cols="12" class="pa-1"> <v-btn color="red" class="white--text" block @click="changstatus(Assetdetail.id)">เสีย</v-btn></v-col>
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

      <div style="font-size: 1.5rem">อยู่ในคลัง ({{ headerdata.qty_unavailable }})</div>
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
                        <v-col cols="10" md="10">
                          <v-expansion-panel-header
                            class="pa-0 pl-5"
                            style="font-size: 1rem; border-left: solid #e9bc02 3px"
                            @click="ListAssetItemDetaildata(Asset)"
                          >
                            <div v-if="Asset.serial_number === ''">
                              <div>
                                <v-icon color="black" class="pa-0"> qr_code</v-icon> ไม่มี
                              </div>
                            </div>
                            <div v-else>
                              <v-icon color="black" class="pa-0"> qr_code</v-icon>
                              {{ Asset.serial_number }}
                            </div>
                          </v-expansion-panel-header>
                        </v-col>
                        <v-col cols="1" md="2">
                          <v-progress-circular
                            max="10"
                            :rotate="360"
                            :size="20"
                            :width="4"
                            :value="Asset.conditions * 10"
                            color="yellow"
                          >
                            {{ value }}
                          </v-progress-circular>
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
                                    <v-icon color="black"> </v-icon>
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
                            <v-icon color="yellow">location_on</v-icon
                            >{{ Assetdetail.location }}
                          </v-col>
                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-icon color="yellow">person</v-icon>
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

    <v-dialog transition="dialog-top-transition" max-width="900" v-model="Detail_group">
      <DetailAssetItem
        :Asset="group_data"
        @close="closeDetailAssetItem"
        @cancel="cancelDetail"
      />
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import DetailAssetItem from "../../../components/AssetItem/DetailAssetItem.vue";
import InsertAssetItem from "../../../components/AssetItem/InsertAssetItem.vue";
import api from "../../../services/asset";
export default {
  name: "listAssetitem",
  data() {
    return {
      group_data: "",
      isActive: false,
      Insert_group: false,
      Detail_group: false,
      Asset_id: this.$route.params.id,
      AssetListitemA: [],
      AssetListitemB: [],
      Assetdetail: [],
      headerdata: [],
      clickAssetData: [],
      respones:"",
    };
  },
  components: { InsertAssetItem, DetailAssetItem },
  methods: {
    openInsertAssetItem(val) {
      this.group_data = val;
      this.Insert_group = true;
    },
    openDetailAssetItem(val) {
      this.group_data = val;
      this.Detail_group = true;
    },

    closeInsertAssetItem(close, assetid) {
      this.Insert_group = close;
      this.ListAssetItemA(assetid);
      this.ListAssetItemB(assetid);
      this.HaederAssetdata(assetid);
    },
    closeDetailAssetItem(close, assetid) {
      this.Detail_group = close;
      this.ListAssetItemA(assetid);
      this.ListAssetItemB(assetid);
      this.HaederAssetdata(assetid);
    },

    cancelInsert(cancel) {
      this.Insert_group = cancel;
    },
    cancelDetail(cancel) {
      this.Detail_group = cancel;
    },
    ListAssetItemA() {
      api.ListAssetItemAvailable(
        {
          id: parseInt(this.Asset_id),
        },
        (result) => {
          this.AssetListitemA = result.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    changstatus(val) {
      console.log(val)
      api.UpdatestatusAssetItem(
        {
          id: val,
        },
        (result) => {
          this.respones = result.respones;
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
          if (this.headerdata.qty == 0) {
            this.openInsertAssetItem(this.Asset_id);
          }
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
          this.openDetailAssetItem(this.clickAssetData);
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


