<template>
  <div class="card-deck">    
    <div class="card mr-5 mb-5">

      <div class="card-header draggable-item" @dblclick="editList.inputActive = true">
        <h5 class="card-title" v-if="editList.inputActive === false">{{ listName }}</h5>        
        <input class="not-draggable-item" type="text" 
          v-if="editList.inputActive === true" 
          v-model.trim="editList.name" 
          v-focus="true"
          @keyup.enter="editKanbanListName()"
          @keyup.esc="editList.name = listName; editList.inputActive = false"
          v-on:blur="editList.inputActive = false"
        >
        <p class="small">List ID: {{ listId }}</p>
      </div>
      <div class="card-body">        
        <draggable class="drag-area" :id="listId" v-model="listTasks" group="tasks" :move="onTaskMove">
          <div v-for="listTask in listTasks" :key="listTask.id">
            <KanbanTask :listTask="listTask"></KanbanTask>
          </div>
        </draggable>
      </div>

      <div class="card-footer" @click="newTask.inputActive = true">
        <p class="small text-muted" v-if="newTask.inputActive === false">Add new task</p>
        <input type="text" placeholder="Insert task name"
          v-if="newTask.inputActive === true"
          v-model.trim="newTask.name"
          v-focus="true"
          @keyup.enter="createTask(listId)"
          @keyup.esc="newTask.name = ''; newTask.inputActive = false"
          v-on:blur="newTask.inputActive = false"
        >
      </div>
      <button class="btn btn-outline-danger btn-sm mt-2" @click="deleteKanbanList(listId)">Delete</button>
    
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
      editList: {
        inputActive: false,
        name: this.listName
      },
      newTask: {
        inputActive: false,
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
        firebaseCollection.doc(this.updateTask.taskId).update({
          listID: this.updateTask.targetListId
          })
      }
      this.updateTask.taskId = ''
      this.updateTask.currentListId = ''
      this.updateTask.targetListId = ''

      data.forEach((element, index) => {
        firebaseCollection.doc(element.id).update({ taskOrder: index })
      });
    },
    createTask(listId) {
      if (this.newTask.name.length !== 0) {
        let getTaskOrder = this.getListTasks(listId).length
        firebase.projectsCollection.doc(this.$route.params.id).collection('tasks').add({
          createdOn: new Date(),
          listID: listId,
          taskOrder: getTaskOrder,
          name: this.newTask.name
        }).catch(err => {
          console.error("Error creating new task: ", err);
        });
          this.newTask.name = '';
      } else {
        return
      }      
    },
    editKanbanListName() {
      if (this.editList.name.length !== 0) {
        firebase.projectsCollection.doc(this.$route.params.id).collection('lists').doc(this.listId).update({
        name: this.editList.name
        }).catch(err => {
          console.error("Error editing Kanban list name: ", err);
        });
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
