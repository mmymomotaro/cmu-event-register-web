<template>
  <div id="Category">
    <v-card class="pa-0" elevation="1" tile color="white">
      <v-container grid-list-xs>
        <v-row>
          <v-col cols="12" md="9" style="font-size: 1.5rem"> จัดการหมวดหมู่ </v-col>
          <v-col cols="12" md="3" class="pa-2">
            <v-hover>
              <v-btn
                block
                justify-center
                large
                class="button white--text"
                @click="openInsertCategoryGroup()"
                >เพิ่มหมวดหมู่</v-btn
              >
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-container grid-list-xs>
      <v-expansion-panels focusable>
        <v-expansion-panel v-for="(item, i) in MoxCategoryList" :key="i">
          <v-row>
            <v-col cols="12" md="6">
              <v-expansion-panel-header>dfdf}</v-expansion-panel-header>
            </v-col>
            <v-btn-icon color="primary">
              <v-icon>lisy</v-icon>
            </v-btn-icon>
          </v-row>

          <v-expansion-panel-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-dialog
        transition="dialog-top-transition"
        max-width="500"
        v-model="categorygroup.Insert_group"
      >
        <InsertCategory />
      </v-dialog>

      <v-dialog transition="dialog-top-transition" max-width="500" v-model="Update_group">
        <UpdateCategory :categoryData="group_data" />
      </v-dialog>

      <v-dialog transition="dialog-top-transition" max-width="500" v-model="Delete_group">
        <DeleteCatgory :categoryData="group_data" @close="closeDelete" />
      </v-dialog>

      <v-dialog transition="dialog-top-transition" max-width="500" v-model="Insert_group">
        <InsertSubCategory :category_ID="group_data" />
      </v-dialog>

      <v-dialog transition="dialog-top-transition" max-width="500" v-model="Update_group">
        <UpdateSubCategory :subcategoryData="group_data" />
      </v-dialog>

      <v-dialog transition="dialog-top-transition" max-width="500" v-model="Delete_group">
        <DeleteSubCatgory :subcategoryData="group_data" />
      </v-dialog>
    </v-container>
  </div>
</template>

v-for="item in MoxCategoryList" :key="item.name"

<script>
import UpdateCategory from "../../components/Category/UpdateCategory.vue";
import DeleteCatgory from "../../components/Category/DeleteCatgory.vue";
import InsertCategory from "../../components/Category/InsertCategory.vue";
import UpdateSubCategory from "../../components/SubCategory/UpdateSubCategory.vue";
import DeleteSubCatgory from "../../components/SubCategory/DeleteSubCatgory.vue";
import InsertSubCategory from "../../components/SubCategory/InsertSubCategory.vue";
import api from "../../services/asset";
export default {
  name: "Category",
  data() {
    return {
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
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" },
      ],
      group_data: {},
      CategoryList: [],
      SubCategoryList: [],
      response: "",
      MoxCategoryList: [
        { id: 1, name: "A" },
        { id: 2, name: "B" },
        { id: 3, name: "C" },
      ],
    };
  },
  components: {
    InsertSubCategory,
    DeleteSubCatgory,
    UpdateSubCategory,
    UpdateCategory,
    DeleteCatgory,
    InsertCategory,
  },
  methods: {
    closeDelete(value) {
      this.Delete_group = value;
      this.ListCategorydata();
    },
    openUpdateGroup(val) {
      this.group_data = val;
      this.Update_group = true;
    },
    openDeleteGroup(val) {
      this.group_data = val;
      this.Delete_group = true;
    },
    openInsertCategoryGroup() {
      this.categorygroup.Insert_group = true;
    },
    ListCategorydata() {
      api.ListCategory(
        {
          id: null,
        },
        (result) => {
          this.CategoryList = result.data;
          console.log(result.data[0].id);
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
