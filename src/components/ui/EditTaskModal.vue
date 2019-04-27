<template>
  <form class="text-left">
    <div class="form-row">
      <div class="form-group col-md-12">
        <h3 v-if="task.inputField !== 'editName'" @click="task.inputField = 'editName'; task.data = openTask">{{ openTask.name }}</h3>
        <input type="text" class="form-control" id="taskName" 
          placeholder="Task name" 
          v-if="task.inputField === 'editName'"
          v-model.trim="task.data.name"
          v-focus="true"
          @keyup.enter="editTaskName()"
          @keyup.esc="task.data = openTask; task.inputField = null"
          v-on:blur="editTaskName()">
          <p class="text-muted small"># {{ openTask.id }}</p>
      </div>
    </div>
    <div class="form-group">
      <label for="taskDescription">Description</label>
      <textarea class="form-control" id="taskDescription" rows="3" v-model="openTask.description"></textarea>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="createdOn">Created on</label>
        <input type="text" class="form-control" id="createdOn" v-model="openTask.createdOn" readonly>
      </div>
      <div class="form-group col-md-6">
        <label for="dueDate">Due date</label>
        <input type="text" class="form-control" id="dueDate" placeholder="Due date" v-model="openTask.dueDate">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-12">
        <label for="taskLabels">Labels</label>
        <input type="text" class="form-control" id="dueDate" placeholder="Start typing..." v-model="openTask.dueDate">
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

export default {
  name: 'EditTaskModal',
  props: [
    'openTask'
  ],
  data() {
    return {
      task: {
        inputField: null,
        data: {}
      }      
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
    }
  }
}
</script>

<style>
</style>
