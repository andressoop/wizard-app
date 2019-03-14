import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store.js'
const firebase = require('./helpers/firebaseConfig.js')

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