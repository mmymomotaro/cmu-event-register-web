<template>
 <v-container grid-list-xs style="height: 2000px">
  <div id="Category">
          <v-row no-gutters>
            <v-col cols md="4">
              <v-card-title primary-title style="font-size: 2rem"
                >จัดการหมวดหมู่
              </v-card-title>
            </v-col>
            <v-col cols md="3" offset-md="5">
              <v-btn
                block 
                class="white--text button" outlined @click="openInsertGroup()">
                เพิ่มหมวดหมู่
              </v-btn>
            </v-col>
          </v-row>

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
              <tr v-for="item in MoxCategoryList" :key="item.name">
                <!-- <tr v-for="item in CategoryList" :key="item.name"> -->
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

  </div>
  </v-container>
</template>

<script>
import FormUpdateCategory from "../../components/Category/FormUpdateCategory.vue"
import DeleteCatgory from "../../components/Category/DeleteCatgory.vue"
import FormInsertCategory from "../../components/Category/FormInsertCategory.vue"
import Swal from "sweetalert2"
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
      MoxCategoryList: [
        { id:1 , name:"couputer"},
        { id:2 , name:"paybox"},
        { id:3 , name:"Lan"},
      ],
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

    CheckCategoryData(){
      if (this.categoryname === "") {
        Swal.fire({
          icon: "error",
          title: "กรุณากรอกชื่อ",
        });
      } else {
        this.InsertCategoryData();
      }
    },

    InsertCategoryData() {
      api.InsertCategory(
        {
          name: this.categoryname,
        },
        (result) => {
          console.log(result.response);
          this.response = result.response;
          if (this.response === "false") {
            Swal.fire({
              icon: "error",
              title: "ชื่อหมวดหมู่ซ้ำ กรุณากรอกใหม่",
              showConfirmButton: false,
              timer: 2000,
            });
          } else {
              Swal.fire({
              icon: "success",
              title: "เพิ่มสำเร็จ",
              showConfirmButton: false,
              timer: 2000,
            });
            this.ListCategorydata()
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    
    ListCategorydata() {
      api.ListCategory(
        {
            id: "",
        },
      result => {
        this.CategoryList = result.data
        // console.log(result.data)
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
