import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import ManageAsset from '../views/admin/Asset/ManageAsset.vue'
import manageCategory from '../views/admin/Category/manageCategory.vue'
import listAssetitem from '../views/admin/Asset/listAssetitem.vue'
import manageAssetDamage from '../views/admin/AssetDamage/ManageAssetDamage.vue'
import listAssetitemDamage from '../views/admin/AssetDamage/listAssetitemDamage.vue'
import Dashboard from '../views/admin/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/ManageAsset',
    name: 'ManageAsset',
    component: ManageAsset
  },
  {
    path: '/manageCategory',
    name: 'manageCategory',
    component: manageCategory
  },
  {
    path: '/listAssetitem/:id',
    name: 'listAssetitem',
    component: listAssetitem
  },
    {
    path: '/manageAssetDamage/',
    name: 'manageAssetDamage',
    component: manageAssetDamage
  },
    {
    path: '/listAssetitemDamage/:id',
    name: 'listAssetitemDamage',
    component: listAssetitemDamage
  },
      {
    path: '/Dashboard/',
    name: 'Dashboard',
    component: Dashboard
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
