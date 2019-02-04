<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template>
              <div class="text-muted text-center mb-3">
                <small>Sign in with</small>
              </div>
              <div class="btn-wrapper text-center">
                <!-- <base-button type="neutral" class="mb-3 login-button">
                  <img slot="icon" src="img/icons/github.svg">
                  Github
                </base-button> -->

                <base-button @click="googleLogin" type="neutral" class="mb-3 login-button">
                  <img slot="icon" src="img/icons/google.svg">
                  Google
                </base-button>
              </div>
            </template>
            <template>
              <div class="text-center text-muted mb-4">
                <small>Or sign in with credentials</small>
              </div>
              <!-- <form role="form">
                <base-input
                  alternative
                  class="mb-3"
                  placeholder="Email"
                  addon-left-icon="ni ni-email-83"
                ></base-input>
                <base-input
                  alternative
                  type="password"
                  placeholder="Password"
                  addon-left-icon="ni ni-lock-circle-open"
                ></base-input>
                <base-checkbox>Remember me</base-checkbox>
                <div class="text-center">
                  <base-button @click="login" type="primary" class="my-4">Sign In</base-button>
                </div>
              </form>-->
              <form @submit.prevent>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <input
                        v-model.trim="loginForm.email"
                        type="email"
                        class="form-control"
                        placeholder="1@gmail.com"
                      >
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <input
                        v-model.trim="loginForm.password"
                        type="password"
                        class="form-control"
                        placeholder="123456"
                      >
                    </div>
                  </div>
                </div>
                <div class="text-center">
                  <button @click="login" class="btn btn-primary" type="button">Log In</button>
                </div>
              </form>
            </template>
            <template>
              <div class="text-center text-muted mb-4">
                <small>
                  <a href="#">Privacy Policy</a>
                </small>
              </div>
            </template>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
const fb = require("../helpers/firebaseConfig.js");

export default {
  name: "login",
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      fb.auth
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        )
        .then(user => {
          this.$store.commit("setCurrentUser", user.user);
          this.$store.dispatch("fetchUserProfile");
          this.$router.push("/dashboard");
        })
        .catch(err => {
          console.log(err);
        });
    },
    googleLogin() {
      fb.auth
        .signInWithPopup(fb.google_provider)
        .then(user => {
          this.$store.commit("setCurrentUser", user.user);
          this.$store.dispatch("fetchUserProfile");
          this.$router.push("/dashboard");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.login-button {
  width: 100%;
}

.section {
  height: 100vh;
}
</style>
