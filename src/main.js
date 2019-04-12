import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import { store } from './store.js'
import firebase from './helpers/firebaseConfig'

// Init plugin
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