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
        <div v-if="showLoginForm" class="col-lg-5">
          <!-- Login -->
          <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-5" class="border-0">
            <div class="text-center mb-3">
              <h1>Sign in with</h1>
            </div>
            <div class="btn-wrapper text-center">
              <base-button type="neutral" class="mb-3 login-button">
                <img slot="icon" src="img/icons/github.svg">
                Github
              </base-button>
              <base-button @click="googleLogin" type="neutral" class="mb-3 login-button">
                <img slot="icon" src="img/icons/google.svg">
                Google
              </base-button>
            </div>
            <div class="text-center text-muted mb-4">
              <p class="lead">or use credentials</p>
            </div>
            <form role="form">
              <base-input v-model.trim="loginForm.email" alternative class="mb-3" placeholder="Email" addon-left-icon="ni ni-email-83"></base-input>
              <base-input v-model.trim="loginForm.password" alternative type="password" placeholder="Password" addon-left-icon="ni ni-lock-circle-open"></base-input>
              <base-checkbox>Remember me</base-checkbox>
              <div class="text-center">
                <base-button @click="login" type="primary" class="my-4 btn-block">Sign In</base-button>
              </div>
            </form>
            <div class="text-center mb-4">
              <a href="#" class="text-light">
                <small>Privacy Policy</small>
              </a>
            </div>
          </card>
          <div class="row mt-3">
            <div class="col-6 text-left">
              <a href="#" class="text-light">
                <small>Forgot password?</small>
              </a>
            </div>
            <div class="col-6 text-right">
              <a @click="toggleForm" class="text-light">
                <small>Create new account</small>
              </a>
            </div>
          </div>
          <!-- //Login -->
        </div>
        <div v-else class="col-lg-5">
          <!-- Sign up -->
          <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-5" class="border-0">
            <div class="text-muted text-center mb-3">
              <small>Sign up with</small>
            </div>
            <div class="btn-wrapper text-center">
              <base-button type="neutral" class="mb-3 login-button">
                <img slot="icon" src="img/icons/github.svg">
                Github
              </base-button>
              <base-button @click="googleLogin" type="neutral" class="mb-3 login-button">
                <img slot="icon" src="img/icons/google.svg">
                Google
              </base-button>
            </div>
            <div class="text-center text-muted mb-4">
              <small>Or sign up with credentials</small>
            </div>
            <form role="form">
              <base-input alternative class="mb-3" placeholder="Name" addon-left-icon="ni ni-hat-3"></base-input>
              <base-input alternative class="mb-3" placeholder="Email" addon-left-icon="ni ni-email-83"></base-input>
              <base-input alternative type="password" placeholder="Password" addon-left-icon="ni ni-lock-circle-open"></base-input>
              <base-checkbox>
                <span>
                  I agree with the <a href="#">Privacy Policy</a>
                </span>
              </base-checkbox>
              <div class="text-center">
                <base-button type="primary" class="my-4 login-button">Create account</base-button>
              </div>
            </form>
          </card>
          <div class="row mt-3">
            <div class="col-6 text-left">
              <a href="#" class="text-light">
                <small>Forgot password?</small>
              </a>
            </div>
            <div class="col-6 text-right">
              <a @click="toggleForm" class="text-light">
                <small>Sign in</small>
              </a>
            </div>
          </div>
          <!-- //Sign up -->
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
      },
      showLoginForm: true
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
    },
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
    }
  }
};
</script>

<style scoped>
.login-button {
  width: 100%;
}

.section {
  min-height: 100vh;
}

.section-lg {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
</style>
