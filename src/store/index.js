import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import userProjects from './modules/userProjects'
import settings from './modules/settings'


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    userProjects,
    settings
  }
})