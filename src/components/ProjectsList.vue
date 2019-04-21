<template>
  <div class="container-fluid pl-5 mt-4">
    <div class="row">
    <div class="col-lg-6">
      <h1>Projects</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum autem magnam cumque, numquam sint distinctio aliquam dolores illo, libero placeat a et expedita iste. Quaerat, iusto quam? Alias, ullam possimus.Consectetur eos fuga deserunt a. Amet corrupti saepe reiciendis, doloremque eius aliquam rem, ipsum quaerat error odit fugit magnam sed modi alias nostrum quidem dolorem nobis nisi! Commodi, culpa repellat.</p>
    </div>
    </div>
    <div class="d-flex flex-row mr-5">
      <form @submit.prevent>
      <input type="text" v-model.trim="newProject.name" @keyup.enter="createProject">
      <button @click="createProject" type="button" class="btn btn-sm btn-success">Create new project</button>
    </form>
    </div>
    <hr>
    <div class="d-flex flex-wrap" v-if="Object.keys(userProjects).length > 0">
      <div class="" v-for="project in userProjects" :key="project.id">
        <ProjectCard :projectName="project.name" :projectId="project.id" :projectCreatedOn="project.createdOn" />
      </div>
    </div>
    <div class="d-flex flex wrap" v-else>
      <h3 class="text-muted">You have no projects</h3>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProjectCard from '../components/ProjectCard.vue'
import firebase from '../helpers/firebaseConfig'

export default {
  name: 'ProjectsList',
  components: {
    ProjectCard
  },
  data() {
    return {
      newProject: {
        name: '',
      }
    };
  },
  computed: {
    ...mapState(['userProfile', 'currentUser', 'userProjects'])
  },
  methods: {
    createProject() {
      firebase.projectsCollection.add({
        createdOn: new Date(),
        uid: this.currentUser.uid,
        name: this.newProject.name
      }).catch(err => {
        console.log(err)
      });
      this.newProject.name = ''
    }
  }
};
</script>

<style scoped>
h3 {
  margin: 20px 0 0;
}
a {
  color: #42b983;
}

</style>
