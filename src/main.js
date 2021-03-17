import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Swal from 'sweetalert2';
import VueBarcode from '@chenfengyuan/vue-barcode';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue } from 'bootstrap-vue'
import { Datetime } from 'vue-datetime'
import VueSweetalert2 from 'vue-sweetalert2';
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'
Vue.use(Datetime)
Vue.component('datetime', Datetime);
Vue.use(VueSweetalert2);
// import * as VueGoogleMaps from 'vue2-google-maps';
Vue.component(VueBarcode.name, VueBarcode);
Vue.use(BootstrapVue)

import VueHtml2pdf from 'vue-html2pdf'
Vue.use(VueHtml2pdf)
// Vue.use(VueGoogleMaps, {
//   load: {
//     key: 'AIzaSyA1VRCYRmLKIy_sEcDdHsrIjnljRpIXyxA',
//   },
// });

new Vue({
  router,
  store,
  vuetify,
  Swal,
  // VueGoogleMaps,
  render: h => h(App),
}).$mount('#app');
