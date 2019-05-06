<template>
  <div class="container-fluid pl-5 mt-4">
    <div class="row">
      <div class="col-lg-6">
        <h1>Projects</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum autem magnam cumque, numquam sint distinctio aliquam dolores illo, libero placeat a et expedita iste. Quaerat, iusto quam? Alias, ullam possimus.Consectetur eos fuga deserunt a. Amet corrupti saepe reiciendis, doloremque eius aliquam rem, ipsum quaerat error odit fugit magnam sed modi alias nostrum quidem dolorem nobis nisi! Commodi, culpa repellat.</p>
      </div>
    </div>

    <div class="row pl-1">
      <div class="col-lg-8">
        <div class="form-row">
        <div class="form-label-group mr-2" :class="{invalid: $v.newProject.name.$error}">
          <input
            name="newProjectName"
            type="text"
            class="form-control"
            placeholder="Project name"
            v-model.trim="newProject.name" 
            @keyup.enter="createProject"
          >
          <label for="newProjectName small">Project name <span class="text-danger">*</span> </label>
          <p class="small text-danger ml-1 mt-2" v-if="!$v.newProject.name.minLength">Project name must be at least 3 characters</p>
        </div>
        <div class="form-group">
          <button
            @click="createProject"
            type="button"
            class="btn btn-confirm btn-success text-uppercase font-weight-bold mb-2" :disabled="$v.$invalid"
          >Create new project</button>
        </div>
      </div>
      </div>
    </div>
    <hr>
    <div class="d-flex flex-wrap" v-if="Object.keys(userProjects).length > 0">
      <div v-for="project in userProjects" :key="project.id">
        <ProjectCard
          :projectName="project.name"
          :projectId="project.id"
          :projectCreatedOn="project.createdOn"
        />
      </div>
    </div>
    <div class="d-flex flex wrap" v-else>
      <h3 class="text-muted">You have no projects</h3>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { required, minLength  } from 'vuelidate/lib/validators'
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
  validations: {
    newProject: {
      name: {
        required,
        minLength: minLength(3)
      }
    },
  },
  computed: {
    ...mapState(['userProjects'])
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

input {
  min-width: 400px;
}

</style>
