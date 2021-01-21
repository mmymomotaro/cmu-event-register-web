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
                @click="openInsertAssetItem(headerdata)"
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
                        <v-col cols="9" md="9">
                          <v-expansion-panel-header
                            class="pa-0 pl-5"
                            style="font-size: 1rem; border-left: solid #02a0e9 3px"
                            @click="ListAssetItemDetaildata(AssetA)"
                          >
                            <div
                              style="
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                              "
                              v-if="headerdata.types === 0"
                            >
                              <div>
                                <v-icon color="black" class="pa-0"> widgets </v-icon>
                                {{ AssetA.id }}
                              </div>
                            </div>
                            <div
                              v-else
                              style="
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                              "
                            >
                              <v-icon color="black" class="pa-0"> qr_code</v-icon>
                              {{ AssetA.serial_number }}
                            </div>
                          </v-expansion-panel-header>
                        </v-col>
                        <v-col cols="1" md="1">
                          <v-progress-circular
                            max="10"
                            :rotate="360"
                            :size="25"
                            :width="4"
                            :value="AssetA.conditions * 10"
                            color="blue"
                          >
                            <div style="font-size: 13px">
                              {{ AssetA.conditions }}
                            </div>
                          </v-progress-circular>
                        </v-col>
                        <v-col cols="1" md="2">
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
                          <v-col cols="12" class="pa-1">
                            <v-btn
                              color="red"
                              class="white--text"
                              block
                              @click="openChangeAssetItem(Assetdetail.id)"
                              >เสีย</v-btn
                            ></v-col
                          >
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
              min-height="200"
              transition="fade-transition"
            >
              <v-row class="ma-2">
                <v-expansion-panels style="justify-content: left">
                  <v-col
                    cols="12"
                    md="4"
                    class="pa-1"
                    v-for="(AssetB, i) in AssetListitemB"
                    :key="i"
                  >
                    <v-expansion-panel>
                      <v-row align="center" no-gutters>
                        <v-col cols="9" md="9">
                          <v-expansion-panel-header
                            class="pa-0 pl-5"
                            style="font-size: 1rem; border-left: solid #e9bc02 3px"
                            @click="ListAssetItemDetaildata(AssetB)"
                          >
                            <div v-if="headerdata.types === 0">
                                <v-icon
                                  color="black"
                                  class="pa-0"
                                  style="
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                  "
                                >
                                  widgets</v-icon
                                >
                                {{ AssetB.id }}
                            </div>
                            <div v-else>
                              <v-icon
                                color="black"
                                class="pa-0"
                                style="
                                  white-space: nowrap;
                                  overflow: hidden;
                                  text-overflow: ellipsis;
                                "
                              >
                                qr_code</v-icon
                              >
                              {{ AssetB.serial_number }}
                            </div>
                          </v-expansion-panel-header>
                        </v-col>
                        <v-col cols="1" md="1">
                          <v-progress-circular
                            max="10"
                            :rotate="360"
                            :size="25"
                            :width="4"
                            :value="AssetB.conditions * 10"
                            color="yellow accent-4"
                          >
                            <div style="font-size: 13px">
                              {{ AssetB.conditions }}
                            </div>
                          </v-progress-circular>
                        </v-col>
                        <v-col cols="1" md="2">
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on: tooltip }">
                              <v-btn
                                fab
                                text
                                small
                                color="grey"
                                v-bind="attrs"
                                v-on="{ ...tooltip, ...menu }"
                                @click="ClickAssetItemDetaildata(AssetB)"
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
                            <v-icon color="yellow accent-4">location_on</v-icon
                            >{{ Assetdetail.location }}
                          </v-col>
                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-icon color="yellow accent-4">person</v-icon>
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

    <v-dialog transition="dialog-top-transition" max-width="900" v-model="Change_group">
      <ChangeAssetItem
        :AssetitemID="group_data"
        @close="closeChangeAssetItem"
        @cancel="cancelChange"
      />
    </v-dialog>
    <v-dialog transition="dialog-top-transition" max-width="900" v-model="Null_group">
      <NullAssetItem
        :AssetitemID="group_data"
        @close="closeChangeAssetItem"
        @cancel="cancelChange"
      />
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import DetailAssetItem from "../../../components/AssetItem/DetailAssetItem.vue";
import InsertAssetItem from "../../../components/AssetItem/InsertAssetItem.vue";
import ChangeAssetItem from "../../../components/AssetItem/ChangeAssetItem.vue";
import NullAssetItem from "../../../components/AssetItem/NullAssetItem.vue";
import api from "../../../services/asset";
export default {
  name: "listAssetitem",
  data() {
    return {
      group_data: "",
      isActive: false,
      Insert_group: false,
      Detail_group: false,
      Change_group: false,
      Null_group: false,
      Asset_id: this.$route.params.id,
      AssetListitemA: [],
      AssetListitemB: [],
      Assetdetail: [],
      headerdata: [],
      clickAssetData: [],
      respones: "",
    };
  },
  components: { InsertAssetItem, DetailAssetItem, ChangeAssetItem, NullAssetItem },
  methods: {
    openInsertAssetItem(val) {
      this.group_data = val;
      this.Insert_group = true;
    },
    openDetailAssetItem(val) {
      this.group_data = val;
      this.Detail_group = true;
    },
    openChangeAssetItem(val) {
      this.group_data = val;
      this.Change_group = true;
    },
    openNullAssetItem(val) {
      console.log("this",val)
      this.group_data = val;
      this.Null_group = true;
    },

    closeInsertAssetItem(close, assetid, status) {
      if (status.id == 0) {
        this.$router.push("../listAssetitemDamage/" + assetid.id);
      } else {
        this.Insert_group = close;
        this.ListAssetItemA(assetid);
        this.ListAssetItemB(assetid);
        this.HaederAssetdata(assetid);
      }
    },
    closeDetailAssetItem(close, assetid) {
      this.Detail_group = close;
      this.ListAssetItemA(assetid);
      this.ListAssetItemB(assetid);
      this.HaederAssetdata(assetid);
    },
    closeChangeAssetItem(close, assetid) {
      this.Change_group = close;
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
    cancelChange(cancel) {
      this.Change_group = cancel;
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
            this.openInsertAssetItem(this.headerdata);
          } else if (
            this.headerdata.qty_available == 0 &&
            this.headerdata.qty_unavailable == 0
          ) {
            this.openNullAssetItem(this.headerdata);
          } else {
            console.log("B");
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
