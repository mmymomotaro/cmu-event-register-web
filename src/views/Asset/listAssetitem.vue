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
      <div style="font-size: 1.5rem">ในคลัง ({{ headerdata.qty_available }})</div>
      <v-card class="pa-2">
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
              <v-row class="pa-1">
                <v-expansion-panels>
                  <v-col
                    cols="12"
                    xs="12"
                    md="4"
                    class="py-1 px-1"
                    v-for="Asset in AssetListitemA"
                    :key="Asset"
                  >
                    <v-expansion-panel>
                      <v-expansion-panel-header
                        style="font-size: 1rem; border-left: solid #158aff 3px"
                        @click="AssetitemDetail(Asset.id)"
                      >
                        <div v-if="Asset.serial_number === ''">
                          <div>
                            <v-icon color="black" class="pa-0"> qr_code</v-icon> ไม่มี 
                          </div>
                        </div>
                        <div v-else>
                          <v-icon color="black" class="pa-0"> qr_code</v-icon>
                          {{ Asset.serial_number }}  
                          <v-menu open-on-hover bottom offset-y>
                                  <template v-slot:activator="{ on, attrs }">
                                        <v-icon v-bind="attrs"
                                      v-on="on" color="black" class="ml-4" >edit</v-icon>

                                  </template>

                                  <v-list>
                                    <v-list-item
                                      v-for="(item, index) in items"
                                      :key="index"
                                    >
                                      <v-list-item-title>{{
                                        item.title
                                      }}</v-list-item-title>
                                    </v-list-item>
                                  </v-list>
                                </v-menu>
                        </div>
                      </v-expansion-panel-header>

                      <v-expansion-panel-content>
                        <!-- start content -->
                        <v-row class="pt-4">
                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-item-icon>
                              <v-icon color="blue">location_on</v-icon
                              >{{ Assetdetail.location }}
                            </v-item-icon>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-icon color="blue">person</v-icon>
                          </v-col>
                          <v-col cols="12" class="pa-1">
                          </v-col>
                        </v-row>
                      </v-expansion-panel-content>
                      <!-- end content -->
                    </v-expansion-panel>
                  </v-col>
                </v-expansion-panels>
              </v-row>
            </v-lazy>
          </v-responsive>
        </v-responsive>
      </v-card>

      <div style="font-size: 1.5rem">ถอน ({{ headerdata.qty_unavailable }})</div>
      <v-card class="pa-2">
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
              <v-row class="pa-1">
                <v-expansion-panels focusable>
                  <v-col
                    cols="12"
                    xs="12"
                    md="4"
                    class="py-1"
                    v-for="Asset in AssetListitemB"
                    :key="Asset"
                  >
                    <v-expansion-panel>
                      <v-expansion-panel-header
                        style="font-size: 1rem; border-left: solid #edbb01 3px"
                      >
                        <div v-if="Asset.serial_number === ''">
                          <v-icon
                            color="black"
                            class="pa-0"
                            @click="AssetitemDetail(Asset.id)"
                          >
                            qr_code</v-icon
                          >
                          ไม่มี
                          <v-btn text><v-icon class="pa-0" small> create</v-icon></v-btn>
                        </div>
                        <div v-else>
                          <v-icon color="black" class="pa-0"> qr_code</v-icon>
                          {{ Asset.serial_number }}
                        </div>
                      </v-expansion-panel-header>

                      <v-expansion-panel-content>
                        <!-- start content -->
                        <v-row class="pt-4">
                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-item-icon>
                              <v-icon color="yellow darken-2">insert_invitation</v-icon>
                              {{ Assetdetail.update_at }}
                            </v-item-icon>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" class="pa-1">
                            <v-icon color="yellow darken-2"> person</v-icon>
                          </v-col>
                        </v-row>
                      </v-expansion-panel-content>
                      <!-- end content -->
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
      <InsertAssetItem :Asset_ID="group_data" @close="closeInsertAssetItem" />
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import InsertAssetItem from "../../components/Asset/AssetItem/InsertAssetItem.vue";
import api from "../../services/asset";
export default {
  name: "listAssetitem",
  data() {
    return {
      isActive: false,
      Insert_group: false,
      Asset_id: this.$route.params.id,
      AssetListitemA: [],
      AssetListitemB: [],
      assetdetailID: 0,
      Assetdetail: [],
      headerdata: [],
      group_data: "",
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" },
      ],
    };
  },
  components: { InsertAssetItem },
  methods: {
    closeInsertAssetItem(value) {
      this.Insert_group = value;
      this.ListAssetdata();
    },
    openInsertAssetItem(val) {
      this.group_data = val;
      this.Insert_group = true;
    },
    ListAssetItemA() {
      console.log("this A");
      console.log(this.Asset_id);
      api.ListAssetItemAvailable(
        {
          id: parseInt(this.Asset_id),
        },
        (result) => {
          this.AssetListitemA = result.data;
          // console.log('A' ,this.AssetListitemA);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    ListAssetItemB() {
      console.log("this B");
      console.log("B", this.Asset_id);
      api.ListAssetItemUnavailable(
        {
          id: parseInt(this.Asset_id),
        },
        (result) => {
          this.AssetListitemB = result.data;
          // console.log('b' ,this.AssetListitemB);
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
          // console.log(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    AssetitemDetail(val) {
      this.assetdetailID = val;
      this.ListAssetItemDetaildata();
    },
    ListAssetItemDetaildata() {
      api.ListAssetDetail(
        {
          id: parseInt(this.assetdetailID),
        },
        (result) => {
          this.Assetdetail = result.data;
          this.Assetdetail.update_at = moment(this.Assetdetail.update_at).format(
            "DD-MM-YYYY"
          );
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  mounted() {
    console.log(this.Asset_id);
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
