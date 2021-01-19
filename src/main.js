import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Swal from 'sweetalert2';
import VueBarcode from '@chenfengyuan/vue-barcode';
// import * as VueGoogleMaps from 'vue2-google-maps';
Vue.component(VueBarcode.name, VueBarcode);

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
