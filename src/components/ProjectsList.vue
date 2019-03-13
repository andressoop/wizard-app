<template>
  <div>
    <div class="row">
      <div class="col-sm-4" v-for="project in userProjects" :key="project.id">
        <ProjectCard :projectName="project.name" :projectId="project.id" :projectCreatedOn="project.createdOn" />
      </div>
    </div>
    
    <form @submit.prevent>
      <input type="text" v-model.trim="newProject.name">
      <button @click="createProject" type="button" class="btn btn-sm btn-success">Create new project</button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProjectCard from '../components/ProjectCard.vue'
const fb = require('../helpers/firebaseConfig.js');

export default {
  name: 'ProjectsList',
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
