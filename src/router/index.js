import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import manageAsset from '../views/Asset/manageAsset.vue'
import manageCategory from '../views/Category/manageCategory.vue'
import listAssetitem from '../views/Asset/listAssetitem.vue'
import manageAssetDamage from '../views/AssetDamage/manageAssetDamage.vue'

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/manageAsset',
    name: 'manageAsset',
    component: manageAsset
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
