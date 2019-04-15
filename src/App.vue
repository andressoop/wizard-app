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
import { mapGetters } from 'vuex'
import { FadeTransition } from 'vue2-transitions'
import Navigation from './components/Navigation'

export default {
  components: {
    FadeTransition,
    Navigation
  },
  data() {
    return {
      sidebarCollapsed: false
    }
  },
  computed: mapGetters(['isLoggedIn']),
  methods: {
    onCollapse(collapsed) {
      this.sidebarCollapsed = collapsed
    }
  }
}
</script>

<style>
.content-area {
  padding-left: 250px;
  transition: all 0.4s ease;
}

.content-area.collapsed {
  padding-left: 50px;
  transition: all 0.4s ease;
}

.container-main {
  max-width: 600px;
}
</style>
