<template>
  <div class="container-fluid pl-5 mt-4">

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
</template>

<script>
import { mapGetters } from 'vuex'
import ClientsTable from '../components/ClientsTable'

export default {
  name: 'Clients',
  components: {
    ClientsTable
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
  },
   destroyed() {
    this.$store.commit('setClientList', {})
  }
}
</script>

<style>

</style>
