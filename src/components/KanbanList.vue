<template>
  <div class="card-deck">
    
    <div class="card mr-5 mb-5">
      <div class="card-body">
        <h5 class="card-title">{{ listName }}</h5>
        <p class="small">List ID: {{ listId }}</p>
        <draggable class="drag-area" :id="listId" v-model="listTasks" group="tasks" :move="onTaskMove">
          <div class="bg-light" v-for="listTask in listTasks" :key="listTask.id">
            <KanbanTask :listTask="listTask"></KanbanTask>
          </div>
        </draggable>  
      </div>
      <div class="card-footer">
        <input type="text" v-model.trim="newTask.name">
        <button @click="createTask(listId)" type="button" class="btn btn-sm btn-success">Create new task</button>
        <hr>
        <button type="button" class="btn btn-outline-danger btn-sm mt-2" @click="deleteKanbanList(listId)" onclick="return confirm('Are you sure you want to delete this item?');">
          Delete List
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import firebase from '../helpers/firebaseConfig'
import { mapGetters } from 'vuex'
import Draggable from 'vuedraggable'
import KanbanTask from './KanbanTask.vue'

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
      set() {
        console.log(this.updateTask.taskId, this.updateTask.targetListId)
        firebase.projectsCollection.doc(this.$route.params.id).collection('tasks')
          .doc(this.updateTask.taskId)
          .update({listID: this.updateTask.targetListId})
      }
    }
  },
  methods: {
    onTaskMove(evt) {
      this.updateTask.taskId = evt.draggedContext.element.id
      this.updateTask.targetListId = evt.to.id
    },
    createTask(listId) {
      firebase.projectsCollection.doc(this.$route.params.id).collection('tasks').add({
        createdOn: new Date(),
        listID: listId,
        name: this.newTask.name
      })
    },
    deleteKanbanList(listId) {
      firebase.db.collection('projects/' + this.$route.params.id + '/lists').doc(listId).delete().then(function () {
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
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
