import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import ManageAsset from '../views/admin/Asset/ManageAsset.vue'
import ManageCategory from '../views/admin/Category/ManageCategory.vue'
import ListAssetitem from '../views/admin/Asset/listAssetitem.vue'
import ManageAssetDamage from '../views/admin/AssetDamage/ManageAssetDamage.vue'
import ListAssetitemDamage from '../views/admin/AssetDamage/listAssetitemDamage.vue'
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
    path: '/ManageCategory',
    name: 'ManageCategory',
    component: ManageCategory
  },
  {
    path: '/ListAssetitem/:id',
    name: 'ListAssetitem',
    component: ListAssetitem
  },
    {
    path: '/ManageAssetDamage/',
    name: 'ManageAssetDamage',
    component: ManageAssetDamage
  },
    {
    path: '/ListAssetitemDamage/:id',
    name: 'ListAssetitemDamage',
    component: ListAssetitemDamage
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
