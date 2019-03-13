<template>
  <div>
    <!-- <ul>
      <li
        v-for="project in userProjects"
        v-bind:key="project.id"
      >{{project.id}} | {{project.name}} | {{project.uid}} | {{project.createdOn | formatDate}}</li>
    </ul> -->
    <div v-for="project in userProjects" v-bind:key="project.id" v-bind:ProjectName="project.name"><projectCard/></div>
    
      <form>
        <input type="text" v-model.trim="newProject.name">
        <a @click="createProject" class="btn btn-success">Uus projekt</a>
      </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import ProjectCard from '../components/ProjectCard.vue'
const fb = require("../helpers/firebaseConfig.js");

export default {
  name: "ProjectsList",
  components: {
    ProjectCard
  },
  data() {
    return {
      newProject: {
        name: null
      }
    };
  },
  computed: {
    ...mapState(['userProfile', 'currentUser', 'userProjects'])
  },
  methods: {
    createProject() {
      fb.projectsCollection.add({
        createdOn: new Date(),
        uid: this.currentUser.uid,
        name: this.newProject.name
      }).catch(err => {
        console.log(err)
      });
    }
  },
  filters: {
    formatDate(val) {
      if(!val) {return '-'}
      let date = val.toDate()
      return moment(date).fromNow()
    }
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
</style>
