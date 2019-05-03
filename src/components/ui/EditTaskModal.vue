<template>
  <form class="text-left">
    <div class="form-row">
      <div class="form-group col-md-12">
        <h3 class="modal-h3" v-if="task.inputField !== 'editName'" @click="task.inputField = 'editName'; task.data = openTask">{{ openTask.name }}</h3>
        <input type="text" class="form-control" id="taskName" 
          placeholder="Task name" 
          v-if="task.inputField === 'editName'"
          v-model.trim="task.data.name"
          v-focus="true"
          @keyup.enter="editTaskName()"
          @keyup.esc="task.data = openTask; task.inputField = null"
          @blur="editTaskName()">
          <p class="text-muted small"># {{ openTask.id }}</p>
      </div>
    </div>
    <div class="form-group">
      <label for="taskDescription">Description</label>
      <textarea class="form-control" id="taskDescription" rows="3" 
        v-model="openTask.description" 
        @click="task.inputField = 'editDescription'; task.data = openTask"
        @blur="editTaskDescription()"
      ></textarea>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="createdOn">Created on</label>
        <input type="text" class="date-field form-control text-muted" id="createdOn" disabled v-model="createdOn">
      </div>
      <div class="form-group col-md-6">
        <label for="dueDate">Due date</label>
        <datepicker name="dueDate" input-class="date-field date-input text-muted"
          placeholder="no deadline" 
          format="dd.MM.yy"
          monday-first 
          bootstrap-styling
          clear-button
          clear-button-icon="far fa-trash-alt"
          v-model="dueDate"
          @selected="task.inputField = 'editDueDate'; task.data = openTask"
          @closed="editTaskDueDate()"
        ></datepicker>
        {{ openTask.dueDate }}
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-12">
        <label for="taskLabels">Labels</label>
        <input type="text" class="form-control">
      </div>
    </div>
    <hr>
    <div class="form-row">
      <div class="form-group">
        <label for="taskTodo">Todo</label>
      </div>
    </div>
    <div class="form-row d-flex flex-row">
      <div class="d-flex justify-content-start">
        <h1>1</h1>
      </div>
      <div class="d-flex justify-content-end">
        <h2>2</h2>
      </div>
      <!-- <button type="submit" class="btn btn-primary mr-2"><i class="fas fa-save"></i> Save</button>
      <button type="submit" class="btn btn-outline-warning mr-2"><i class="fas fa-archive"></i> Archive</button>
      <button type="submit" class="btn btn-outline-danger mr-2"><i class="fas fa-trash-alt"></i> Delete</button>
      <button type="submit" class="btn btn-outline-secondary mr-2"><i class="fas fa-window-close"></i> Cancel</button> -->
    </div>
    
    
  </form>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'

export default {
  name: 'EditTaskModal',
  props: [
    'openTask'
  ],
  components: {
    Datepicker
  },
  data() {
    return {
      task: {
        inputField: null,
        data: {}
      }      
    }
  },
  computed: {
    createdOn() {
      const val = this.openTask.createdOn
      if (!val) { return '-' }
      let date = val.toDate()
      return moment(date).format("DD.MM.YYYY - HH:mm")
    },
    dueDate() {
      const val = this.openTask.dueDate
      if (!val) { return }
      let date = val.toDate()
      return moment(date).format("DD.MM.YYYY")
    }
  },
  methods: {
    editTaskName() {
      if (this.task.data.name.length !== 0) {
        this.$store.dispatch('editTaskName', this.task.data)
        this.task.inputField = null
      } else {
        return
      }
    },
    editTaskDescription() {
      if (this.task.data.description.length !== 0) {
        this.$store.dispatch('editTaskDescription', this.task.data)
      } else {
        return
      }
    },
    editTaskDueDate() {
      this.$store.dispatch('editTaskDueDate', this.task.data)
    }
  },
  filters: {
    formatDate(val) {
      if (!val) { return '-' }
      let date = val.toDate()
      return moment(date).format("DD.MM.YYYY - HH:mm")
    }
  }
}
</script>

<style>
.modal-h3, .date-input {
  cursor: pointer;
}

.date-field {
  border: 0;
  background-color: #fff !important;
  padding: 0;
}

.vdp-datepicker__clear-button > .input-group-text {
  background-color: #fff;
  border: 0;
}
</style>
