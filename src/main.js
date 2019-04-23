import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import store from './store'
import firebase from './helpers/firebaseConfig'
import Swal from 'sweetalert2'

// Global custom directives
Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})

// Init plugins
window.Swal = Swal;
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