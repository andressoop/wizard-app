<template>
  <div class="card-deck">
    <div class="card mr-5 mb-5">

      <div class="card-header p-0">
        <div class="wrapper m-0 col-10">
          <h4 class="card-title mt-4 w-100" v-if="editProject.inputField !== 'editName'" @click="editProject.inputField = 'editName'">{{ projectName }}</h4>
          <input type="text" class="form-control" style="width: 104%;"
            v-if="editProject.inputField === 'editName'"
            maxlength="50"
            v-model.trim="editProject.data.name"
            v-focus="true"
            @keyup.enter="editProjectName()"
            @blur="editProjectName()"
            @keyup.esc="clearInputFields()"
          >
        </div>
        <jazzicon class="jazzicon" :seed="projectCreatedOn.seconds" :diameter="300" :colors="jazziconColors" />
      </div>

      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
          <p class="small mt-3"># {{ projectId }}</p>
          <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteProject(projectId)"><i class="far fa-trash-alt"></i></button>
        </div>
        <p class="card-text text-muted small" v-if="!projectDescription">Add description...</p>
        <p class="card-text" v-else>{{ projectDescription }}</p>
        <input type="text-field" class="form-control" style="width: 104%; height: 100%"
            v-if="editProject.inputField === 'editDescription'"
            maxlength="120"
            v-model.trim="editProject.data.description"
            v-focus="true"
            @keyup.enter="editProjectDescription()"
            @blur="editProjectDescription()"
            @keyup.esc="clearInputFields()"
          >
      </div>

      <div class="card-footer">
        <small class="text-muted">Project created {{ projectCreatedOn | formatDate }}</small>
        <br>
        <button type="button" class="btn btn-primary btn-block mt-2 mr-2" @click="viewProject(projectId)">VIEW PROJECT</button>
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
        inputField: null,
        data: {
          index: this.projectIndex,
          id: this.projectId,
          name: this.projectName,
          description: this.projectDescription
        }
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
    'projectIndex',
    'projectId',
    'projectCreatedOn',
    'projectName',
    'projectDescription'
  ],
  components: {
    Jazzicon
  },  
  methods: {
    viewProject(projectId) {
      this.$router.push('/project/' + projectId)
    },
    editProjectName() {
      if ( this.editProject.data.name.length < 3 ) { return }

      this.$store.dispatch('editProjectName', this.editProject.data)
      this.editProject.inputField = null
    },
    // editProjectDescription() {
    //   console.log('edit description')
    // },
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
    },
    clearInputFields() {
      this.editProject.inputField = null
      this.editProject.data.name = this.projectName
      this.editProject.data.description = this.projectDescription
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
.wrapper {
  padding: 0 1.25rem;
}

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

.card-body {
  padding-top: 10px;
}

.card-text {
  height: 120px;
  overflow: hidden;
}

.card-title {
  position: absolute;
  color: white;
  font-weight: 600;
  text-shadow: 0 0 11px rgba(33,33,33,.4);
}

.fa-trash-alt {
  color: #6C757D;
}

.btn-sm {
  border: 0;
}

.btn-sm:hover .fa-trash-alt {
  color: white;
  transition: 0.2s ease;
}

.container {
  padding: 2px 16px;
}
</style>
