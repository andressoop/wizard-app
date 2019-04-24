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
    <div class="d-flex flex-wrap" v-if="Object.keys(getAllProjects).length > 0">
      <div v-for="project in getAllProjects" :key="project.id">
        <ProjectCard :projectName="project.name" :projectId="project.id" :projectCreatedOn="project.createdOn" />
      </div>
    </div>
    <div class="d-flex flex wrap" v-else>
      <h3 class="text-muted">You have no projects</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProjectCard from '../components/ProjectCard.vue'

export default {
  name: 'Dashboard',
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
    ...mapGetters(['getAllProjects'])
  },
  methods: {
    createProject() {
      this.$store.dispatch('createNewProject', this.newProject)
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
