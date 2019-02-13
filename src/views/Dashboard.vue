<template>
  <div class="dashboard">
    <ProjectsList/>
  </div>
</template>

<script>
// @ is an alias to /src
import ProjectsList from '@/components/ProjectsList.vue'

export default {
  name: 'dashboard',
  components: {
    ProjectsList
  }
}
</script>
