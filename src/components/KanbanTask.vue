<template>
    <p class="small">
      <span class="text-muted">#{{listTask.id}}</span>
      {{ listTask.name }} | {{ listTask.createdOn | formatDate }}
    </p>
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

</style>
