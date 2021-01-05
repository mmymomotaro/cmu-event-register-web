import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Swal from 'sweetalert2';
import VueBarcode from '@chenfengyuan/vue-barcode';

Vue.component(VueBarcode.name, VueBarcode);

new Vue({
  router,
  store,
  vuetify,
  Swal,
  render: h => h(App)
}).$mount('#app')
