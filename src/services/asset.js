import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
const address = 'http://10.0.3.226:3000'
export default {
  // -------------------------  Category
  InsertCategory (obj, success, error) { // เพิ่ม Category//
    Vue.axios.post(address + '/asset_api/create/category', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  ListCategory (obj, success, error) { // แสดง Category ทั้งหมด//
    Vue.axios.post(address + '/asset_api/list/category', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  SelectCategory (obj, success, error) {  // เลือก Category ที่ ID//
    Vue.axios.post(address + '/asset_api/list/category/id', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  UpdateCategory (obj, success, error) { // แก้ไข Category ที่ ID //
    Vue.axios.post(address + '/asset_api/update/category', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },

// -------------------------  SubCategory
ListSubCategory (obj, success, error) {
    Vue.axios.post(address + '/asset_api/list/subcategory', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  
  InsertSubCategory (obj, success, error) {
    Vue.axios.post(address + '/asset_api/create/subcategory', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  UpdateSubCategory (obj, success, error) {
    Vue.axios.post(address + '/asset_api/update/subcategory', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },

  // --------------------------- Asset
ListAsset (obj, success, error) {
    Vue.axios.post(address + '/asset_api/list/asset', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
InsertAsset (obj, success, error) {
    Vue.axios.post(address + '/asset_api/create/asset', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
    // --------------------------- AssetItem
    ListAssetItem (obj, success, error) {
    Vue.axios.post(address + '/asset_api/list/asset/item', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
}



