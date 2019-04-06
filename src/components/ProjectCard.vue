<template>
<div class="card-deck">
<div class="card mr-5 mb-5">
    <img class="card-img-top" src="../assets/images/placeholder.png" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">{{ projectName }}</h5>
      <p class="small">Project ID: {{ projectId }}</p>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">Project created {{ projectCreatedOn | formatDate }}</small>
      <br>
      <button type="button" class="btn btn-primary btn-sm mt-2 mr-2" @click="loadProject(projectId)">View Project</button>
      <button type="button" class="btn btn-outline-danger btn-sm mt-2">Delete Project</button>
    </div>
  </div>
</div>
  
</template>

<script>
import moment from 'moment'

export default {
  name: 'ProjectCard',
  props: [
    'projectName',
    'projectId',
    'projectCreatedOn'
  ],
  data() {
    return {}
  },
  methods: {
    loadProject(projectId) {
      this.$router.push('/project/' + projectId)
    }
  },
  filters: {
    formatDate(val) {
      if(!val) {return '-'}
      let date = val.toDate()
      return moment(date).fromNow()
    }
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  /* margin: 20px; */
  width: 300px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.container {
  padding: 2px 16px;
}
</style>
