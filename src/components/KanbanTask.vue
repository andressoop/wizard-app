<template>
    <div class="d-flex flex-column bg-light" style="padding: 10px; border-radius: 10px!important; margin-bottom: 10px;">
      <span class="text-muted small">#{{listTask.id}}</span>
      <p class="lead"> {{ listTask.name }}</p>
      <hr>
      <span class="text-muted small d-flex justify-content-end align-items-center"><i class="far fa-clock d-flex mr-1"></i> {{ listTask.createdOn | formatDate }} </span>
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
      let date = val.toDate()
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
  margin: 8px 0;
}

</style>
