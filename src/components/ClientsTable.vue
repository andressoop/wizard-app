<template>
  <div>
    <div class="row pl-1">
      <div class="col-lg-12">
        <div class="form-row">

          <div class="col-lg-3">
            <div class="form-label-group mr-2" :class="{invalid: $v.newClient.name.$error}">
              <input
                name="newClientName"
                maxlength="50"
                type="text"
                class="form-control"
                placeholder="Client name"
                v-model.trim="newClient.name" 
              >
              <label for="newClientName" class="text-danger" v-if="!$v.newClient.name.minLength">Minumum 2 characters</label>
              <label for="newClientName" v-else>Client name <span class="text-danger">*</span> </label>
            </div>
          </div>

          <div class="col-lg-3">
            <div class="form-label-group mr-2">
              <input
                name="newClientContactPerson"
                maxlength="50"
                type="text"
                class="form-control"
                placeholder="Contact person"
                v-model.trim="newClient.contactPerson" 
              >
              <label for="newClientContactPerson">Contact person</label>
            </div>
          </div>

          <div class="col-lg-3">
            <div class="form-label-group mr-2">
              <input
                name="newClientEmail"
                maxlength="50"
                type="text"
                class="form-control"
                placeholder="Email"
                v-model.trim="newClient.email" 
              >
              <label for="newClientEmail">Email</label>
            </div>
          </div>

          <div class="col-lg-3">
            <div class="form-group">
              <button
                @click="createClient"
                type="button"
                class="btn btn-confirm btn-success text-uppercase font-weight-bold mb-2" :disabled="$v.$invalid"
              >Create new client</button>
            </div>
          </div>

        </div>
      </div>
    </div>
    <hr>

    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Contact Person</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(client, index) in clientList.clients" :key="index">
          <td>{{ client.name }}</td>
          <td>{{ client.contactPerson }}</td>
          <td>{{ client.email }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, minLength  } from 'vuelidate/lib/validators'

export default {
  name: 'ClientsTable',
  data() {
    return {
      newClient: {
        name: '',
        contactPerson: '',
        email: '',
      }
    };
  },
  validations: {
    newClient: {
      name: {
        required,
        minLength: minLength(2)
      }
    },
  },
  computed: {
    ...mapGetters(['clientList']),
  },
  methods: {
    createClient() {
      this.$store.dispatch('createNewClient', this.newClient)
      this.newClient.name = ''
      this.newClient.contactPerson = ''
      this.newClient.email = ''
    }
  }
}
</script>

<style>

</style>
