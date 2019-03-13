<template>
  <div class="container">
  <SidebarMain/>
    <div class="container-main">
      <ProjectsList/> 
    </div>
  </div>
</template>

<script>
import SidebarMain from '../components/SidebarMain.vue'
import ProjectsList from '../components/ProjectsList.vue'

export default {
  name: 'dashboard',
  components: {
    SidebarMain,
    ProjectsList
  }
}
</script>

<style scoped>

.container-main {
  margin-left: 250px;
}
</style>

