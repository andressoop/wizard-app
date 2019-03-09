<template>
  <div class="container">
    <ProjectsList/> 
  </div>
</template>

<script>
// @ is an alias to /src
import NavbarMain from '@/components/NavbarMain.vue'
import ProjectsList from '@/components/ProjectsList.vue'

export default {
  name: 'dashboard',
  components: {
    NavbarMain,
    ProjectsList
  }
}
</script>
