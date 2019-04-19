<template>
  <div class="card-deck">
    
    <div class="card mr-5 mb-5">
      <div class="card-body">
        <h5 class="card-title">{{ listName }}</h5>
        <p class="small">List ID: {{ listId }}</p>
        <p class="card-text" v-for="listTask in getListTasks(listId)" :key="listTask.id">
          {{ listTask.name }} | {{ listTask.createdOn | formatDate }}
          </p>
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
import moment from 'moment'

export default {
  name: 'KanbanList',
  props: [
    'listName',
    'listId',
  ],
  data() {
    return {
      newTask: {
        name: '',
      }
    }
  },
  computed: {
    ...mapGetters(['getListTasks'])
  },
  methods: {
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
  },
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
</style>
