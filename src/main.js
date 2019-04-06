import Vue from 'vue'
import App from './App.vue'
import Loading from 'vue-loading-overlay';
import Vuelidate from 'vuelidate'
import router from './router'
import { store } from './store.js'
const firebase = require('./helpers/firebaseConfig.js')

// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
// Init plugin
Vue.use(Loading);
Vue.use(Vuelidate)

Vue.config.productionTip = false

let app
firebase.auth.onAuthStateChanged(function() {
  if (!app){
    app = new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    })
  }
});