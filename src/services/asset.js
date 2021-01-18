import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
const address = 'http://10.0.3.226:3000'
export default {
  // -------------------------  Category
  InsertCategory(obj, success, error) { // เพิ่ม Category//
    Vue.axios.post(address + '/asset_api/create/category', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  ListCategory(obj, success, error) { // แสดง Category ทั้งหมด//
    Vue.axios.post(address + '/asset_api/list/category', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  SelectCategory(obj, success, error) {  // เลือก Category ที่ ID//
    Vue.axios.post(address + '/asset_api/list/category/id', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  UpdateCategory(obj, success, error) { // แก้ไข Category ที่ ID //
    Vue.axios.post(address + '/asset_api/update/category', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  DeleteCategory(obj, success, error) { 
    Vue.axios.post(address + '/asset_api/delete/category/id', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },

// -------------------------  SubCategory
ListSubCategory(obj, success, error) {
    Vue.axios.post(address + '/asset_api/list/subcategory', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  
  InsertSubCategory(obj, success, error) {
    Vue.axios.post(address + '/asset_api/create/subcategory', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  UpdateSubCategory(obj, success, error) {
    Vue.axios.post(address + '/asset_api/update/subcategory', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  SelectSubCategory(obj, success, error) {
    Vue.axios.post(address + '/asset_api/list/subcategory/id', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  DeleteSubCategory(obj, success, error) {
    Vue.axios.post(address + '/asset_api/delete/subcategory/id', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  
  // --------------------------- Asset
  
  SerachAssetBycat(obj, success, error) {
    Vue.axios.post(address + '/asset_api/search/asset/category', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
SerachAsset(obj, success, error) {
    Vue.axios.post(address + '/asset_api/search/asset', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
ListAsset(obj, success, error) {
    Vue.axios.post(address + '/asset_api/list/asset', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
InsertAsset(obj, success, error) {
    Vue.axios.post(address + '/asset_api/create/asset', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },

genItem(header, obj, success, error) {
    Vue.axios.post(address + '/upload/asset', obj, header).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
HaederAsset(obj, success, error) {
    Vue.axios.post(address + '/asset_api/list/asset/id', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  UpdateAsset(obj, success, error) {
    Vue.axios.post(address + '/asset_api/update/asset', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  DeleteAsset(obj, success, error) {
    Vue.axios.post(address + '/asset_api/delete/asset/id', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },

    // --------------------------- AssetItem
    ListAssetItem(obj, success, error) {
    Vue.axios.post(address + '/asset_api/list/asset/item', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
    LocationAssetItem(obj, success, error) {
    Vue.axios.post(address + '/asset_api/list/location', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
    SelectLocationAssetItem(obj, success, error) {
    Vue.axios.post(address + '/asset_api/list/location/id', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  InsertAssetItem(obj, success, error) {
    Vue.axios.post(address + '/asset_api/create/asset/item', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
    ListAssetItemAvailable(obj, success, error) {
    Vue.axios.post(address + '/asset_api/list/asset/item/available', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  ListAssetItemUnavailable(obj, success, error) {
    Vue.axios.post(address + '/asset_api/list/asset/item/unavailable', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  ListAssetItemDetail(obj, success, error) {
    Vue.axios.post(address + '/asset_api/list/asset/item/id', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  UpdateAssetItem(obj, success, error) {
    Vue.axios.post(address + '/asset_api/update/item', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
    DeleteAssetItem(obj, success, error) {
    Vue.axios.post(address + '/asset_api/delete/asset/item/id', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  //____________ Asset Damage________________
    ListAssetDamage(obj, success, error) {
    Vue.axios.post(address + '/asset_api/list/asset/damage', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },

    //____________ AssetItem Damage________________
    ListAssetItemDamage(obj, success, error) {
    Vue.axios.post(address + '/asset_api/list/asset/item/damage', obj).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },

}



