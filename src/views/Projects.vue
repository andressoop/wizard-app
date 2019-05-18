<template>
  <div class="container-fluid pl-5 mt-4">

    <div class="row pl-1">
      <div class="col-lg-12">
        <div class="form-row">
        <div class="form-label-group mr-2" :class="{invalid: $v.newProject.name.$error}">
          <input
            name="newProjectName"
            maxlength="50"
            type="text"
            class="form-control"
            placeholder="Project name"
            v-model.trim="newProject.name" 
            @keyup.enter="createProject"
          >
          <label for="newProjectName" class="text-danger" v-if="!$v.newProject.name.minLength">Project name must be at least 3 characters</label>
          <label for="newProjectName" v-else>Project name <span class="text-danger">*</span> </label>
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
      <div v-for="(project, index) in userProjects" :key="project.id">
        <ProjectCard
          :projectIndex="index"
          :projectId="project.id"
          :projectCreatedOn="project.createdOn"
          :projectName="project.name"
          :projectDescription="project.description"
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
import ProjectCard from '@/components/ProjectCard.vue'

export default {
  name: 'Projects',
  components: {
    ProjectCard
  },
  data() {
    return {
      newProject: {
        name: ''
      }
    }
  },
  validations: {
    newProject: {
      name: {
        required,
        minLength: minLength(3)
      }
    }
  },
  computed: {
    ...mapState(['userProjects'])
  },
  methods: {
    createProject() {
      if ( this.newProject.name.length < 3 ) { return }

      this.$store.dispatch('createNewProject', this.newProject)
      this.clearInputFields()
    },
    clearInputFields() {
      this.newProject.name = ''
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 20px 0 0;
}

input {
  min-width: 400px;
}
</style>
