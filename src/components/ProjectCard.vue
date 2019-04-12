<template>
  <div class="card-deck">
    <div class="card mr-5 mb-5">
      <img class="card-img-top" src="../assets/images/placeholder.png" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">{{ projectName }}</h5>
        <p class="small">Project ID: {{ projectId }}</p>
        <p
          class="card-text"
        >This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
      <div class="card-footer">
        <small class="text-muted">Project created {{ projectCreatedOn | formatDate }}</small>
        <br>
        <button
          type="button"
          class="btn btn-primary btn-sm mt-2 mr-2"
          @click="loadProject(projectId)"
        >View Project</button>
        <button type="button" class="btn btn-outline-danger btn-sm mt-2" data-toggle="modal" data-target="#deleteConfirmModal">
  Delete Project
</button>
      </div>
    </div>

    <!-- Modal -->
<div class="modal fade" id="deleteConfirmModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalTitle">Delete project</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Your project will be deleted from the database.</p>
        <small class="muted">Please note that project cannot be restored.</small>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-danger" @click="deleteProject(projectId)" data-dismiss="modal">Yes, I'm sure</button>
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import firebase from '../helpers/firebaseConfig'

export default {
  name: 'ProjectCard',
  props: [
    'projectName',
    'projectId',
    'projectCreatedOn'
  ],
  data() {
    return {}
  },
  computed: {
    ...mapState(['userProfile', 'currentUser', 'userProjects'])
  },
  methods: {
    loadProject(projectId) {
      this.$router.push('/project/' + projectId)
    },
    deleteProject() {
      firebase.projectsCollection.doc(this.projectId).delete().then(function () {
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
