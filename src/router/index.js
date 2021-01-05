import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import manageAsset from '../views/Asset/manageAsset.vue'
import manageCategory from '../views/Category/manageCategory.vue'
import manageSubCategory from '../views/Sub_Category/manageSubCategory.vue'
import manageLocation from '../views/Location/manageLocation.vue'
import listAssetitem from '../views/Asset/listAssetitem.vue'


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
    path: '/manageSubCategory/:id',
    name: 'manageSubCategory',
    component: manageSubCategory
  },  
  {
    path: '/manageLocation',
    name: 'manageLocation',
    component: manageLocation
  },
  {
    path: '/listAssetitem/:id',
    name: 'listAssetitem',
    component: listAssetitem
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
