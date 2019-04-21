<template>
  <div class="card-deck">
    
    <div class="card mr-5 mb-5">
      <div class="card-body">
        <h5 class="card-title">{{ listName }}</h5>
        <p class="small">List ID: {{ listId }}</p>
        <draggable class="drag-area" :id="listId" v-model="listTasks" group="tasks" :move="onTaskMove">
          <div v-for="listTask in listTasks" :key="listTask.id">
            <KanbanTask :listTask="listTask"></KanbanTask>
          </div>
        </draggable>  
      </div>
      <div class="card-footer">
        <input type="text" v-model.trim="newTask.name" @keyup.enter="createTask(listId)">
        <button @click="createTask(listId)" type="button" class="btn btn-sm btn-success">Create new task</button>
        <hr>
        <button class="btn btn-outline-danger btn-sm mt-2" @click="deleteKanbanList(listId)">Delete</button>
      </div>
    </div>

  </div>
</template>

<script>
import firebase from '../helpers/firebaseConfig'
import { mapGetters } from 'vuex'
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
    'listName',
    'listId',
  ],
  data() {
    return {
      newTask: {
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
    ...mapGetters(['getListTasks']),
    listTasks: {
      get() {
        return this.getListTasks(this.listId)
      },
      set(data) {
        this.updateTaskDoc(data)        
      }
    }
  },
  methods: {
    onTaskMove(event) {
      this.updateTask.taskId = event.draggedContext.element.id
      this.updateTask.currentListId = event.draggedContext.element.listID
      this.updateTask.targetListId = event.to.id
    },
    updateTaskDoc(data) {
      const firebaseCollection = firebase.projectsCollection.doc(this.$route.params.id).collection('tasks')

      if(this.updateTask.currentListId != this.updateTask.targetListId) {
        firebaseCollection.doc(this.updateTask.taskId).update({listID: this.updateTask.targetListId})
      }
      this.updateTask.taskId = ''
      this.updateTask.currentListId = ''
      this.updateTask.targetListId = ''

      data.forEach((element, index) => {
        firebaseCollection.doc(element.id).update({ taskOrder: index })
      });
    },
    createTask(listId) {
      let getTaskOrder = this.getListTasks(listId).length
      firebase.projectsCollection.doc(this.$route.params.id).collection('tasks').add({
        createdOn: new Date(),
        listID: listId,
        taskOrder: getTaskOrder,
        name: this.newTask.name
      })
        this.newTask.name = ''
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
          firebase.db.collection('projects/' + this.$route.params.id + '/lists').doc(listId).delete().then(function () {
            console.log("Document successfully deleted!");
          }).catch(function (error) {
            console.error("Error removing document: ", error);
          });
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
  /* margin: 20px; */
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
</style>
