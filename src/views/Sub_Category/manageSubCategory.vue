<template>
  <div id="manageSubCategory">
    <v-card class="pa-0 ma-0" elevation="1" tile color="white">
      <v-container grid-list-xs>
        <v-row>
          <v-col cols="12" md="9" style="font-size: 1.5rem">
            <v-tooltip bottom>
            <v-icon dark left color="black" @click="$router.push('/manageCategory')" slot="activator" >
              mdi-arrow-left
            </v-icon>
            <span>ย้อนกลับ</span>
            </v-tooltip>
            {{ SubCategoryList[0].name }}
          </v-col>

          <v-col cols="12" md="3" class="pa-2">
            <v-hover>
              <v-btn
                block
                justify-center
                large
                text
                class="button white--text"
                @click="openInsertGroup()"
                >เพิ่มหมวดหมู่</v-btn
              >
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-container grid-list-xs>
      <v-simple-table fixed-header>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left" style="font-size: 1rem">ชื่อประเภท</th>
              <th class="text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in SubCategoryList" :key="item.name">
              <td>{{ item.sname }}</td>
              <td class="text-right">
                <v-btn color="blue" class="ma-1" @click="openUpdateGroup(item)">
                  <v-icon color="white">edit</v-icon>
                </v-btn>
                <v-btn color="red" class="ma-1" @click="openDeleteGroup(item)">
                  <v-icon color="white">delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <v-dialog transition="dialog-top-transition" max-width="500" v-model="Insert_group">
        <FormInsertSubCategory :category_ID="group_data" />
      </v-dialog>

      <v-dialog transition="dialog-top-transition" max-width="500" v-model="Update_group">
        <FormUpdateSubCategory :SubcategoryData="group_data" />
      </v-dialog>

      <v-dialog transition="dialog-top-transition" max-width="500" v-model="Delete_group">
        <DeleteSubCatgory :SubcategoryData="group_data" />
      </v-dialog>

    </v-container>
  </div>
</template>

<script>
import FormUpdateSubCategory from "../../components/SubCategory/FormUpdateSubCategory.vue";
import DeleteSubCatgory from "../../components/SubCategory/DeleteSubCatgory.vue";
import FormInsertSubCategory from "../../components/SubCategory/FormInsertSubCategory.vue";
import api from "../../services/asset";
export default {
  name: "manageSubCategory",
  data() {
    return {
      cat_id: this.$route.params.id,
      Update_group: false,
      Delete_group: false,
      Insert_group: false,
      group_data: {},
      SubCategoryList: [],
      response: "",
      // MoxSubCategoryList: [
      //   { id: 1, category_id: 1, name: "couputer", sname: "Asus" },
      //   { id: 2, category_id: 1, name: "couputer", sname: "Acer" },
      //   { id: 3, category_id: 1, name: "couputer", sname: "Lenovo" },
      //   { id: 4, category_id: 2, name: "paybox", sname: "ตู้เก็บเงิน" },
      //   { id: 5, category_id: 2, name: "paybox", sname: "ตู้เติมเงิน" },
      //   { id: 6, category_id: 2, name: "paybox", sname: "ตู้แลกเงิน" },
      //   { id: 7, category_id: 3, name: "Lan", sname: "W14-1A" },
      //   { id: 8, category_id: 3, name: "Lan", sname: "W12-G3A" },
      //   { id: 9, category_id: 3, name: "Lan", sname: "K12W21" },
      //   { id: 10, category_id: 2, name: "paybox", sname: "ตู้ฝากของ" },
      // ],
    };
  },
  components: {
    FormInsertSubCategory,
    DeleteSubCatgory,
    FormUpdateSubCategory,
  },
  methods: {
    openUpdateGroup(val) {
      this.group_data = val;
      this.Update_group = true;
    },
    openDeleteGroup(val) {
      this.group_data = val;
      this.Delete_group = true;
    },
    openInsertGroup(val) {
      this.group_data = val;
      this.Insert_group = true;
    },

    ListSubCategorydata() {
      api.ListSubCategory(
        {
          id: parseInt(this.cat_id),
        },
        (result) => {
          this.SubCategoryList = result.data;
          // console.log(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  mounted() {
    this.ListSubCategorydata();
    console.log(this.cat_id);
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
