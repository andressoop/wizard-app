<template>
  <form class="form-signin">
    <h1 class="h3 mb-3 font-weight-normal">Sign Up</h1>
    <label for="inputName" class="sr-only">Name</label>
    <input v-model.trim="signupForm.name" type="text" class="form-control" placeholder="Full Name">
    <label for="inputEmail" class="sr-only">Email address</label>
    <input
      v-model.trim="signupForm.email"
      type="email"
      class="form-control"
      placeholder="Email address"
    >
    <label for="inputPassword" class="sr-only">Password</label>
    <input
      v-model.trim="signupForm.password"
      type="password"
      class="form-control"
      placeholder="Password"
    >
    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"> Privacy Policy
      </label>
    </div>
    <button @click="signup" class="btn btn-lg btn-primary btn-block" type="button">Sign Up</button>
  </form>
</template>

<script>
const firebase = require('../helpers/firebaseConfig.js');

export default {
  name: "AuthEmailSignup",
  data() {
    return {
      signupForm: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    signup() {
      firebase.auth
        .createUserWithEmailAndPassword(
          this.signupForm.email,
          this.signupForm.password
        )
        .then(credential => {
          this.$store.commit("setCurrentUser", credential.user);

          // create user object
          firebase.usersCollection
            .doc(credential.user.uid)
            .set({
              name: this.signupForm.name,
              email: this.signupForm.email
            })
            .then(() => {
              this.$store.dispatch("fetchUserProfile");
              this.$router.push("/dashboard");
            })
            .catch(err => {
              console.log(err);
            });
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

