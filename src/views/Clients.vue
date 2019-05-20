<template>
  <div class="container-fluid pl-5 mt-4">

    <LoadingSpinner v-if="!loaded"></LoadingSpinner>

    <div v-else>
      <div class="d-flex flex-wrap" v-if="!clientList">
        <button class="btn btn-confirm btn-success text-uppercase font-weight-bold mb-2" 
          type="button" 
          @click="createClientsList"
        >Initiate clients list</button>
      </div>
      <div v-else>
        <ClientsTable/>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ClientsTable from '../components/ClientsTable'
import LoadingSpinner from '../components/ui/LoadingSpinner'

export default {
  name: 'Clients',
  data() {
    return {
      loaded: false
    }
  },
  components: {
    ClientsTable,
    LoadingSpinner
  },
  computed: {
    ...mapGetters(['clientList']),
  },
  methods: {
    createClientsList() {
      this.$store.dispatch('createNewClientList')
    }
  },
  beforeCreate() {
    this.$store.dispatch('fetchClientList')

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
    var query = this.$store.state.clientList
    var interval = setInterval(checkReadiness, 500)
  },
   destroyed() {
    this.$store.commit('setClientList', {})
  }
}
</script>

<style>

</style>
