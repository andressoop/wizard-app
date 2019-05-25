<template>
  <div class="d-flex flex-column bg-light task-card">
    <p class="lead"> {{ listTask.name }}</p>
    <div class="d-inline-flex flex-row flex-wrap">
      <span class="badge badge-light text-muted" v-for="label in listTask.labels" :key="label.code">{{ label.name }}</span>
    </div>
    <hr>
    <div class="text-muted small d-flex justify-content-between align-items-center">
      <div>
        <span class="badge badge-success float-left py-1 px-2 mr-2" v-if="listTask.difficulty != 0">{{ listTask.difficulty }}</span>
        <span v-if="listTask.duration">{{ listTask.duration }} min</span>
      </div>
      <div>
        <i class="far fa-clock mr-1" v-if="listTask.dueDate"></i> <span v-if="listTask.dueDate"> {{ listTask.dueDate | formatDate }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'KanbanTask',
  props: [
    'listTask'
  ],
  filters: {
    formatDate(val) {
      if (!val) { return '-' }
      let date
      if (val instanceof Date) {
          date = val
        } else {
          date = val.toDate()
      }
      return moment(date).fromNow()
    }
  }
}
</script>

<style scoped>
hr {
  margin: 4px 0;
}

.lead {
  margin-bottom: 10px
}

.task-card {
  padding: 10px; 
  border-radius: 10px!important; 
  margin-bottom: 10px;
  cursor: pointer;
}

</style>
