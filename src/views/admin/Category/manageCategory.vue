<template>
  <div id="Category">
    <v-card class="pa-0 ma-0" elevation="1" tile color="white">
      <v-container grid-list-xs>
        <v-row no-gutters>
          <v-col cols="12" md="9" style="font-size: 1.7rem" class="text-center">
            <v-row no-gutters>
              <v-col cols="12" md="3">จัดการหมวดหมู่</v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="3" class="px-1">
            <v-btn
              height="48"
              block
              justify-center
              large
              class="button white--text"
              @click="openInsertCategoryGroup()"
              >เพิ่มหมวดหมู่</v-btn
            ></v-col
          >
        </v-row>
      </v-container>
    </v-card>

    <v-container grid-list-xs>
      <v-expansion-panels>
        <v-expansion-panel v-for="(item, i) in CategoryList" :key="i">
          <v-row align="center" no-gutters>
            <v-col cols="9" md="10">
              <v-expansion-panel-header
                style="font-size: 1rem"
                @click="ListSubCategorydata(item.id)"
              >
                {{ item.name }}</v-expansion-panel-header
              >
            </v-col>
            <v-col cols="1" md="1 ">
              <v-btn
                fab
                text
                small
                color="blue lighten-2"
                @click="openUpdateCategoryGroup(item)"
              >
                <v-icon color="blue darken-2"> create </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="1" md="1">
              <v-btn fab text small color="red" @click="openDeleteCategoryGroup(item)">
                <v-icon color="red"> delete </v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <v-expansion-panel-content class="pa-2">
            <v-row>
              <v-col
                cols="12"
                md="4"
                style="padding: 5px"
                v-for="subcat in SubCategoryList"
                :key="subcat.id"
              >
                <v-card class="px-3" style="font-size: 1rem">
                  <v-row no-gutters>
                    <v-col cols="8" md="8" class="pt-2">
                      {{ subcat.sname }}
                    </v-col>
                    <v-col cols="2" md="2">
                      <v-btn
                        fab
                        text
                        small
                        color="black"
                        @click="openUpdateSubCategoryGroup(subcat)"
                      >
                        <v-icon color="primary"> create </v-icon>
                      </v-btn>
                    </v-col>
                    <v-col cols="2" md="2">
                      <v-btn
                        fab
                        text
                        small
                        color="black"
                        align="right"
                        @click="openDeleteSubCategoryGroup(subcat)"
                      >
                        <v-icon color="red"> delete_outline </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>

              <v-col cols="12" md="4" style="padding: 5px">
                <v-btn
                  block
                  color="white"
                  style="height: 2.5rem"
                  @click="openInsertSubCategoryGroup(item.id)"
                >
                  <v-icon color="black"> add </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-dialog
        transition="dialog-top-transition"
        max-width="500"
        v-model="categorygroup.Insert_group"
      >
        <InsertCategory
          @close="closeInsertCategoryGroup"
          @cancel="cancelInsertCategoryGroup"
        />
      </v-dialog>

      <v-dialog
        transition="dialog-top-transition"
        max-width="500"
        v-model="categorygroup.Update_group"
      >
        <UpdateCategory
          :categoryData="group_data"
          @close="closeUpdateCategoryGroup"
          @cancel="cancelUpdateCategoryGroup"
        />
      </v-dialog>

      <v-dialog
        transition="dialog-top-transition"
        max-width="500"
        v-model="categorygroup.Delete_group"
      >
        <DeleteCatgory
          :categoryData="group_data"
          @close="closeDeleteCategoryGroup"
          @cancel="cancelDeleteCategoryGroup"
        />
      </v-dialog>

      <v-dialog
        transition="dialog-top-transition"
        max-width="500"
        v-model="subcategorygroup.Insert_group"
      >
        <InsertSubCategory
          :category_ID="group_data"
          @close="closeInsertSubCategoryGroup"
          @cancel="cancelInsertSubCategoryGroup"
        />
      </v-dialog>

      <v-dialog
        transition="dialog-top-transition"
        max-width="500"
        v-model="subcategorygroup.Update_group"
      >
        <UpdateSubCategory
          :subcategoryData="group_data"
          @close="closeUpdateSubCategoryGroup"
          @cancel="cancelUpdateSubCategoryGroup"
        />
      </v-dialog>

      <v-dialog
        transition="dialog-top-transition"
        max-width="500"
        v-model="subcategorygroup.Delete_group"
      >
        <DeleteSubCategory
          :subcategoryData="group_data"
          @close="closeDeleteSubCategoryGroup"
          @cancel="cancelDeleteSubCategoryGroup"
        />
      </v-dialog>

      <v-snackbar v-model="snackbar" :timeout="4000" top right color="success">
        <v-row no-gutters>
          <v-col cols="2" style="font-size: 1.1rem" class="text--white"
            ><v-icon large>check_circle</v-icon></v-col
          >
          <v-col
            cols="9"
            style="font-size: 1.1rem"
            class="text--white"
            align-self="center"
            >ทำรายการสำเร็จ</v-col
          >
          <v-col cols="1" align="right">
            <v-btn fab small text @click.native="snackbar = false"
              ><v-icon small>close</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import UpdateCategory from "../../../components/Category/UpdateCategory.vue";
import DeleteCatgory from "../../../components/Category/DeleteCatgory.vue";
import InsertCategory from "../../../components/Category/InsertCategory.vue";
import UpdateSubCategory from "../../../components/SubCategory/UpdateSubCategory.vue";
import DeleteSubCategory from "../../../components/SubCategory/DeleteSubCategory.vue";
import InsertSubCategory from "../../../components/SubCategory/InsertSubCategory.vue";
import api from "../../../services/asset";
export default {
  name: "Category",
  data() {
    return {
      snackbar: false,
      categorygroup: {
        Update_group: false,
        Delete_group: false,
        Insert_group: false,
      },
      subcategorygroup: {
        Update_group: false,
        Delete_group: false,
        Insert_group: false,
      },

      group_data: {},
      CategoryList: [],
      SubCategoryList: [],
      response: "",
    };
  },
  components: {
    InsertSubCategory,
    DeleteSubCategory,
    UpdateSubCategory,
    UpdateCategory,
    DeleteCatgory,
    InsertCategory,
  },
  methods: {
    openInsertCategoryGroup() {
      this.categorygroup.Insert_group = true;
    },
    openUpdateCategoryGroup(val) {
      this.group_data = val;
      this.categorygroup.Update_group = true;
    },
    openDeleteCategoryGroup(val) {
      this.group_data = val;
      this.categorygroup.Delete_group = true;
    },
    closeInsertCategoryGroup(close) {
      this.categorygroup.Insert_group = close;
      this.ListCategorydata();
      this.snackbar = true;
    },
    closeUpdateCategoryGroup(value) {
      this.categorygroup.Update_group = value;
      this.ListCategorydata();
      this.snackbar = true;
    },
    closeDeleteCategoryGroup(value) {
      this.categorygroup.Delete_group = value;
      this.ListCategorydata();
      this.snackbar = true;
    },

    cancelInsertCategoryGroup(cancel) {
      this.categorygroup.Insert_group = cancel;
    },
    cancelUpdateCategoryGroup(cancel) {
      this.categorygroup.Update_group = cancel;
    },
    cancelDeleteCategoryGroup(cancel) {
      this.categorygroup.Delete_group = cancel;
    },

    openInsertSubCategoryGroup(val) {
      this.group_data = val;
      this.subcategorygroup.Insert_group = true;
    },
    openUpdateSubCategoryGroup(val) {
      this.group_data = val;
      this.subcategorygroup.Update_group = true;
    },
    openDeleteSubCategoryGroup(val) {
      this.group_data = val;
      this.subcategorygroup.Delete_group = true;
    },

    closeInsertSubCategoryGroup(close, catid) {
      this.subcategorygroup.Insert_group = close;
      this.ListSubCategorydata(catid);
      this.snackbar = true;
    },
    closeUpdateSubCategoryGroup(close, catid) {
      this.subcategorygroup.Update_group = close;
      this.ListSubCategorydata(catid);
      this.snackbar = true;
    },
    closeDeleteSubCategoryGroup(close, catid) {
      this.subcategorygroup.Delete_group = close;
      this.ListSubCategorydata(catid);
      this.snackbar = true;
    },
    cancelInsertSubCategoryGroup(cancel) {
      this.subcategorygroup.Insert_group = cancel;
    },
    cancelUpdateSubCategoryGroup(cancel) {
      this.subcategorygroup.Update_group = cancel;
    },
    cancelDeleteSubCategoryGroup(cancel) {
      this.subcategorygroup.Delete_group = cancel;
    },

    ListCategorydata() {
      api.ListCategory(
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
    ListSubCategorydata(val) {
      api.ListSubCategory(
        {
          id: parseInt(val),
        },
        (result) => {
          this.SubCategoryList = result.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },

  mounted() {
    this.ListCategorydata();
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
