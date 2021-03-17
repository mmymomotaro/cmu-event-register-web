import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// User=====================================
import register from '../views/admin/Asset/register.vue'
// User=====================================
import listevent from '../views/admin/Asset/listevent.vue'
import chackmember from '../views/admin/Asset/chackmember.vue'
import Scanqrcode from '../views/admin/Scanqrcode.vue'

Vue.use(VueRouter)

const routes = [

  //=========================Admin=========================//
  {
    path: '/',
    name: 'listevent',
    component: listevent
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },

  {
    path: '/register',
    name: 'Register',
    component: register
  },

  {
    path: '/Scanqrcode/',
    component: Scanqrcode, 
    children:[
      {
        path:':id',
      },
    ]
  },

  {
    path: '/listevent',
    name: 'listevent',
    component: listevent
  },
  {
    path: '/chackmember/',
    // name: 'chackmember',
    component: chackmember, 
    children:[
      {
        path:':id',
      },
    ]
  },
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
