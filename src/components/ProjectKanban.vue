<template>
    <div class="container-fluid pl-5 mt-4">
        <h1>Project</h1>
        <p>Project object: {{project}}</p>
        <p>Project name: {{project.name}}</p>
        <p>Project author UID: {{project.uid}}</p>
        <button @click="load" type="button" class="btn btn-primary mr-2">UserProjects (clg)</button>
        <router-link to="/dashboard">
         <button type="button" class="btn btn-success">Back to Dashboard</button>
        </router-link>

        <hr>
        <input type="text" v-model.trim="newTask.name">
        <button @click="createTask" type="button" class="btn btn-sm btn-success">Create new task</button>

        <div v-for="task in getAllTasks" :key="task.id">
          {{task.name}}, {{task.createdOn}}
        </div>
    </div>
</template>

<script>
import firebase from '@/helpers/firebaseConfig'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProjectKanban',
  props: [
    'projectName',
    'projectId',
    'projectCreatedOn'
  ],
  data() {
    return {
        key: '',
        project: {},
        newTask: {
          name: '',
        }
    }
  },
  computed: {
    ...mapState(['userProfile', 'currentUser', 'userProjects']),
    ...mapGetters(['getAllTasks'])
  },
  methods: {
    ...mapActions(['fetchSelectedProjectTasks']),
      load() {
          console.log(this.userProjects);
      },
      createTask() {
      firebase.projectsCollection.doc(this.key).collection('tasks').add({
        createdOn: new Date(),
        name: this.newTask.name
      })
    }
  },
  
  created() {
      const ref = firebase.projectsCollection.doc(this.$route.params.id)
      ref.get().then((doc) => {
      if (doc.exists) {
        this.key = doc.id;
        this.project = doc.data();
      } else {
        alert("No such document!");
      }
    })
  },
  mounted() {
    this.fetchSelectedProjectTasks(this.$route.params.id)
  }
}
</script>

<style>

</style>
