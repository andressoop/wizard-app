<template>
  <button @click="googleLogin" class="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="button">
    <img src="img/icons/google.svg" width="20" alt="Google Logo"> Google
  </button>
</template>

<script>
const firebase = require('../helpers/firebaseConfig.js')

export default {
  name: 'AuthGoogle',
  data() {
    return {}
  },
  methods: {
    googleLogin() {
      firebase.auth.signInWithRedirect(firebase.googleProvider);
    }
  }
};
</script>

<style scoped>

</style>

