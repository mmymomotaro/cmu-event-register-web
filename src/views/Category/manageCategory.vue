<template>
  <div id="Category">
    <v-card class="pa-0 ma-0" elevation="1" tile color="white">
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
              @click="openInsertGroup()"
              >เพิ่มหมวดหมู่</v-btn>
              </v-hover>
              </v-col>
        </v-row>
      </v-container>
    </v-card>

 <v-container grid-list-xs >
      <template>
        <v-simple-table fixed-header >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left" style="font-size:1rem;">ชื่อหมวดหมู่</th>
                <th class="text-left" ></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in CategoryList" :key="item.name">
                <td @click="goManageSubCategory(item.id)">{{ item.name }}</td>
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
      </template>
      
    
    <v-dialog transition="dialog-top-transition" max-width="500" v-model="Insert_group">
      <FormInsertCategory /> 
    </v-dialog>

    <v-dialog transition="dialog-top-transition" max-width="500" v-model="Update_group">
      <FormUpdateCategory :categoryData="group_data" /> 
    </v-dialog>

    <v-dialog transition="dialog-top-transition" max-width="500" v-model="Delete_group">
      <DeleteCatgory :categoryData="group_data" /> 
    </v-dialog>

  </v-container>
</div>
</template>

<script>
import FormUpdateCategory from "../../components/Category/FormUpdateCategory.vue"
import DeleteCatgory from "../../components/Category/DeleteCatgory.vue"
import FormInsertCategory from "../../components/Category/FormInsertCategory.vue"
import api from "../../services/asset"
export default {
  name: "Category",
  data() {
    return {
      Update_group: false,
      Delete_group: false,
      Insert_group: false,
      group_data: {},
      name: "",
      categoryname: "",
      CategoryList: [],
      response: "",
    };
  },
  components: { 
    FormUpdateCategory,
    DeleteCatgory,
    FormInsertCategory,
  },
  methods: {

    openUpdateGroup(val){
      this.group_data = val
      this.Update_group = true
    },
    openDeleteGroup(val){
      this.group_data = val
      this.Delete_group = true
    },
    openInsertGroup(){
      this.Insert_group = true
    },
    goManageSubCategory(val){
      this.$router.push("manageSubCategory/"+val);
    },
    ListCategorydata() {
      api.ListCategory(
        {
            id: null,
        },
      result => {
        this.CategoryList = result.data
        console.log(result.data[0].id)
      },
      error=>{
        console.log(error) 
      })
    },
  },

  mounted() {
      this.ListCategorydata()
    },
};
</script>

<style lang="scss" scoped>
  .button{
        font-size: 1.25rem; 
        height: 2.5rem; 
        background: linear-gradient(90.75deg, #00b9f8 5.43%, #3780ee 84.26%), #c4c4c4;
  }
</style>
