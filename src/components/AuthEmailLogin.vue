<template>
  <form class="form-signin">
    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
    <label for="inputEmail" class="sr-only">Email address</label>
    <input
      v-model.trim="loginForm.email"
      type="email"
      class="form-control"
      placeholder="Email address"
    >
    <label for="inputPassword" class="sr-only">Password</label>
    <input
      v-model.trim="loginForm.password"
      type="password"
      class="form-control"
      placeholder="Password"
    >
    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"> Remember me
      </label>
    </div>
    <button @click="login" class="btn btn-lg btn-primary btn-block" type="button">Sign in</button>
  </form>
</template>

<script>
const firebase = require('../helpers/firebaseConfig.js');

export default {
  name: 'AuthEmailLogin',
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      firebase.auth
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        )
        .then(user => {
          this.$store.commit('setCurrentUser', user.user);
          this.$store.dispatch('fetchUserProfile');
          this.$router.push('/dashboard');
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>

</style>
