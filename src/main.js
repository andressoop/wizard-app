import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store.js'
import Argon from "./plugins/argon-kit";
const fb = require('./helpers/firebaseConfig.js')

Vue.config.productionTip = false
Vue.use(Argon);

let app
fb.auth.onAuthStateChanged(user => {
  if (!app){
    app = new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    })
  }
});