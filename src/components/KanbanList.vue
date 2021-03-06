<template>
  <div class="card-deck">
    <div class="card mr-5 mb-5">
      <div class="card-header draggable-item">
        <div class="d-flex justify-content-between">
          <div class="d-flex justify-content-start full-width" @click="editList.inputActive = true">
            <h5 class="card-title" v-if="editList.inputActive === false">{{ listName }}</h5>
            <input
              class="form-control not-draggable-item"
              type="text"
              v-if="editList.inputActive === true"
              v-model.trim="editList.name"
              maxlength="20"
              v-focus="true"
              @keyup.enter="editListName()"
              @blur="editListName()"
              @keyup.esc="editList.name = listName; editList.inputActive = false"
            >
          </div>
          <div class="d-flex justify-content-start">
            <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteKanbanList(listId)"><i class="far fa-trash-alt"></i></button>
          </div>
        </div>
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
          maxlength="35"
          v-focus="true"
          @keydown.tab.prevent="createTask(listId)"
          @keyup.enter="createTask(listId)"
          @blur="createTask(listId)"
          @keyup.esc="newTask.name = ''; newTask.inputActive = false"
        >
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
        return this.$store.getters['projectTasks'](this.listId)
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
        confirmButtonColor: '#28A745!important',
        cancelButtonColor: '#D63031!important',
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
  max-height: 90vh;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.card-header {
  padding: .75rem .75rem .75rem 1.25rem;
  cursor: pointer;
}

.card-body {
  padding: 10px 10px 0 10px;
  overflow-y: auto;
  overflow-x: hidden;
}

.card-title {
  padding-top: 5px;
  margin-bottom: 0;
}

.card-footer {
  cursor: pointer;
}

.container {
  padding: 2px 16px;
}

.drag-area {
  min-height: 50px;
  min-width: 100%;
}

.btn-sm {
  border: 0;
}

.btn-dropdown {
  padding: 0 .5rem 0 .5rem;
}

.full-width {
  width: 100%;
}

.ghost {
  opacity: 0.5;
}

.fa-trash-alt {
  color: #6C757D;
}

.btn-sm:hover .fa-trash-alt {
  color: white;
  transition: 0.2s ease;
}

.swal2-styled.swal2-confirm {
  background-color: #6C63FF!important;
}
</style>
