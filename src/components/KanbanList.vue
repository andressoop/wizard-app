<template>
  <div class="card-deck">
    <div class="card mr-5 mb-5">
      <div class="card-header draggable-item">
        <div class="d-flex justify-content-between">
          <div class="d-flex justify-content-start" @click="editList.inputActive = true">
            <h5 class="card-title" v-if="editList.inputActive === false">{{ listName }}</h5>
            <input
              class="form-control not-draggable-item"
              type="text"
              v-if="editList.inputActive === true"
              v-model.trim="editList.name"
              v-focus="true"
              @keyup.enter="editListName()"
              @keyup.esc="editList.name = listName; editList.inputActive = false"
              v-on:blur="editListName()">
          </div>
          <div class="d-flex justify-content-start">
            <div class="dropdown dropright">
              <button
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                class="btn btn-link btn-dropdown">
                <i class="fas fa-ellipsis-v text-muted h5 pt-1"></i>
              </button>

              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item text-danger" href="#" @click="deleteKanbanList(listId)">
                  <i class="far fa-trash-alt mr-1"></i> Delete
                </a>
              </div>
            </div>
          </div>
        </div>

        <p class="small">List ID: {{ listId }}</p>
      </div>
      <div class="card-body">
        <draggable
          class="drag-area"
          :id="listId"
          v-model="listTasks"
          group="tasks"
          :move="onTaskMove"
          animation=200
          ghostClass="ghost"
        >
          <div v-for="(listTask, index) in listTasks" :key="listTask.id" @click="$emit('showModal', { listTask: listTask, listTaskIndex: index})">
            <KanbanTask :listTask="listTask"></KanbanTask>
          </div>
        </draggable>
      </div>

      <div class="card-footer" @click="newTask.inputActive = true">
        <p class="small text-muted" v-if="newTask.inputActive === false">Add new task</p>
        <input
          type="text"
          class="form-control"
          placeholder="Insert task name"
          v-if="newTask.inputActive === true"
          v-model.trim="newTask.name"
          v-focus="true"
          @keyup.enter="createTask(listId)"
          @keyup.esc="newTask.name = ''; newTask.inputActive = false"
          v-on:blur="createTask(listId)">
      </div>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import KanbanTask from './KanbanTask.vue'
import Swal from 'sweetalert2'

export default {
  name: 'KanbanList',
  components: {
    KanbanTask,
    Draggable
  },
  props: [
    'listIndex',
    'listName',
    'listId',
  ],
  data() {
    return {
      editList: {
        inputActive: false,
        index: this.listIndex,
        listId: this.listId,
        name: this.listName
      },
      newTask: {
        inputActive: false,
        listId: this.listId,
        taskOrder: '',
        name: '',
      },
      updateTask: {
        taskId: '',
        currentListId: '',
        targetListId: '',
      }
    }
  },
  computed: {
    listTasks: {
      get() {
        return this.$store.state.projectKanbanTasks.filter(task => task.listID == this.listId)
      },
      set(data) {
        this.$store.dispatch('editTaskOrder', {data: data, listId: this.listId})
        this.updateTask = {taskId: '', currentListId: '', targetListId: ''}        
      }
    }
  },
  methods: {
    onTaskMove(event) {
      this.updateTask.taskId = event.draggedContext.element.id
      this.updateTask.currentListId = event.draggedContext.element.listID
      this.updateTask.targetListId = event.to.id
    },
    createTask() {
      if (this.newTask.name.length !== 0) {
        this.newTask.taskOrder = this.listTasks.length ? this.listTasks.length.toString() : '0'
        this.$store.dispatch('createNewTask', this.newTask)
        this.newTask.taskOrder = ''
        this.newTask.name = ''
      } else {
        this.newTask.inputActive = false
      }
    },
    editListName() {
      if (this.editList.name.length !== 0) {
        this.$store.dispatch('editKanbanListName', this.editList)
        this.editList.inputActive = false
      } else {
        return
      }
    },
    deleteKanbanList(listId) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#28A745',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('deleteKanbanList', listId)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    }
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 300px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.container {
  padding: 2px 16px;
}

.drag-area {
  min-height: 50px;
  min-width: 100%;
}

.btn-dropdown {
  padding: 0;
}
</style>
