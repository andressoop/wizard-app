<template>
  <div id="dashboard" :class="[{'collapsed' : sidebarCollapsed}]">
    <div class="dashboard">
      <div class="container-main">
      <ProjectKanban/> 
      </div>
      <Navigation/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProjectKanban from '../components/ProjectKanban.vue'
import Navigation from '../components/Navigation.vue'

export default {
  name: 'Kanban',
  components: {
    ProjectKanban,
    Navigation
  },
  computed: {
    ...mapState(['sidebarCollapsed'])
  }
}

</script>

<style scoped>

</style>

