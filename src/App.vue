<template>
  <div id="app">

    <navigation v-if="isLoggedIn" @onCollapse="onCollapse"></navigation>

    <fade-transition origin="center" mode="out-in" :duration="250">
      <div :class="[{'collapsed' : sidebarCollapsed}, {'content-area' : isLoggedIn}]">
        <router-view/>
      </div>
    </fade-transition>

  </div>
</template>

<script>
import { FadeTransition } from 'vue2-transitions'
import Navigation from './components/Navigation'
import firebase from '@/helpers/firebaseConfig'

export default {
  components: {
    FadeTransition,
    Navigation
  },
  data() {
    return {
      sidebarCollapsed: false,
      isLoggedIn: false
    }
  },
  methods: {
    onCollapse(collapsed) {
      this.sidebarCollapsed = collapsed
    }
  },
  created() {
    firebase.auth.onAuthStateChanged(user => {
      if (user) { 
        this.isLoggedIn = true;
        this.$store.commit('setCurrentUser', user);
        this.$store.dispatch('fetchUserProfile', user);
        this.$store.dispatch('fetchProjects');
      } else {
        this.isLoggedIn = false;
      }
    })
  }
}
</script>

<style lang="scss">
@import './assets/styles/custom.scss';
@import '../node_modules/bootstrap/scss/bootstrap.scss';

* {
  font-family: 'Montserrat', sans-serif;
}

html, body {
  overflow-x: hidden;
  margin: 0;
  background: #F1F2F6;
}

.content-area {
  padding-left: 250px;
  transition: all 0.4s ease;
  height: calc(100vh - 24px); 
}

.content-area.collapsed {
  padding-left: 50px;
  transition: all 0.4s ease;
}

.container-main {
  max-width: 600px;
}
</style>
