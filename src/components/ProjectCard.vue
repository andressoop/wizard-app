<template>
  <div class="card-deck">
    <div class="card mr-5 mb-5">
      <div class="card-header p-0">
        <div class="wrapper m-0 col-10" style="padding: 0 1.25rem">
          <h4 class="card-title mt-4" v-if="editProject.inputField !== 'editName'">{{ projectName }}</h4>
          <input type="text" class="form-control" style="width: 104%;"
            v-if="editProject.inputField === 'editName'"  
          >
        </div>
        <jazzicon class="jazzicon" :seed="projectCreatedOn.seconds" :diameter="300" :colors="jazziconColors" />
      </div>
      <div class="card-body">
        <!-- <h5 class="card-title">{{ projectName }}</h5> -->
        <p class="small text-muted"># {{ projectId }}</p>
        <p class="card-text"
        >This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
      <div class="card-footer">
        <small class="text-muted">Project created {{ projectCreatedOn | formatDate }}</small>
        <br>
        <button type="button" class="btn btn-primary btn-block mt-2 mr-2" @click="viewProject(projectId)">View Project</button>
        <button class="btn btn-outline-danger btn-block mt-2" @click="deleteProject(projectId)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Swal from 'sweetalert2'
import Jazzicon from 'vue-jazzicon'

export default {
  name: 'ProjectCard',
  data() {
    return {
      editProject: {
        inputField: null
      },
      jazziconColors: [
        '#20bf6b', 
        '#FC7500', 
        '#485460', 
        '#ff5e57', 
        '#FC1960',
        '#ff3f34',
        '#ffdd59',
        '#a29bfe',
        '#6C63FF',
        '#ffc048' 
      ]
    }
  },
  props: [
    'projectName',
    'projectId',
    'projectCreatedOn'
  ],
  components: {
    Jazzicon
  },
  
  methods: {
    viewProject(projectId) {
      this.$router.push('/project/' + projectId)
    },
    deleteProject(projectId) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success mr-2',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false,
      })


      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#20bf6b',
        cancelButtonColor: '#D63031',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('deleteProject', projectId)
          Swal.fire(
            'Deleted!',
            'Project has been deleted.',
            'success',
          )
        }
      })
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
  transition: 0.3s;
  width: 300px;
}

.card-header {
  height: 150px;
  overflow: hidden;
}

.card-header input[type=text] {
  position: absolute;
  margin: 1.25rem auto;
}

.card-title {
  position: absolute;
  color: white;
  font-weight: 600;
  text-shadow: 0 0 11px rgba(33,33,33,.4);
}

.container {
  padding: 2px 16px;
}
</style>
