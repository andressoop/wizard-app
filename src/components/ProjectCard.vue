<template>
  <div class="card">
    <img src="../assets/images/placeholder.png" alt="Avatar" style="width:100%">
    <div class="container">
      <h4>
        <b>{{ projectName }}</b>
        
      </h4>
      <p>id: {{ projectId }}</p>
      <p>Created {{ projectCreatedOn | formatDate }}</p>
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
  margin: 20px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.container {
  padding: 2px 16px;
}
</style>
