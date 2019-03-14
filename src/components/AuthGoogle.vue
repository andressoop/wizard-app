<template>
  <button @click="googleLogin" class="btn btn-lg btn-primary btn-block" type="button">
    <img src="img/icons/google.svg" alt="Google Logo"> Google
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

