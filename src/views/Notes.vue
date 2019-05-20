<template>
  <div class="container-fluid pl-5 mt-4">
    
    <LoadingSpinner v-if="!loaded"></LoadingSpinner>

    <div v-else>
      <div class="row pl-1">
        <div class="col-lg-12">
          <h3>{{ activeProjectName }}</h3>
        </div>
      </div>
      <hr>

      <div class="d-flex flex-wrap" v-if="!projectNotes">
        <button class="btn btn-confirm btn-success text-uppercase font-weight-bold mb-2" 
          type="button" 
          @click="createNote"
        >Start taking notes</button>
      </div>
      <div v-else>
        <Note></Note>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Note from '../components/Note'
import LoadingSpinner from '../components/ui/LoadingSpinner'

export default {
  name: 'Notes',
  components: {
    Note,
    LoadingSpinner
  },
  data() {
    return {
      loaded: false
    }
  },
  computed: {
    ...mapGetters(['activeProjectName', 'projectNotes']),
  },
  methods: {
    createNote() {
      this.$store.dispatch('createNewNote')
    }
  },
  beforeCreate() {
    this.$store.commit('setActiveProjectId', this.$route.params.id)
    this.$store.dispatch('fetchProjectNotes', this.$route.params.id)

    var that = this
    var ready = false

    function checkReadiness() {
      if (ready) {
        return
      }
      try {
        if(query) {
          that.loaded = true
          ready = true
        } else {
          throw 'Not loaded'
        }
      } catch(e) {
        e
      }
      if (ready) {
        clearInterval(interval)
      }
    }    
    var query = this.$store.state.projectNotes
    var interval = setInterval(checkReadiness, 500)
  },
  destroyed() {
    this.$store.commit('setProjectNotes', {})
  }
}
</script>

<style>

</style>
