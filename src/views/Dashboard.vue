<template>
  <div id="dashboard" :class="[{'collapsed' : sidebarCollapsed}]">
    <div>
      <div>
      <ProjectsList/> 
      </div>
      <Navigation/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProjectsList from '../components/ProjectsList.vue'
import Navigation from '../components/Navigation.vue'

export default {
  name: 'Dashboard',
  components: {
    ProjectsList,
    Navigation
  },
  computed: {
    ...mapState(['sidebarCollapsed'])
  }
}

</script>

<style scoped>

</style>

