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

    <div class="container shadow border-0 bg-secondary card" id="container-login">
      <div class="row row-grid align-items-top">
        <div class="col-md-6" id="col-left">
          <div class="card bg-default border-0" id="card-left">
            <img v-lazy="'img/theme/login-1200x1000.jpg'" class="card-img-top">
            <blockquote class="card-blockquote">
              <svg
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 583 95"
                class="svg-bg"
              >
                <polygon points="0,52 583,95 0,95" class="fill-default"></polygon>
                <polygon points="0,42 583,95 683,0 0,95" opacity=".2" class="fill-default"></polygon>
              </svg>
              <h4 class="display-3 font-weight-bold text-white">Are you a magician?</h4>
              <p class="lead text-white">
                It’s illegal in Queensland (Australia) to own a pet rabbit unless you can prove that you’re a magician. 
              </p>
            </blockquote>
          </div>
        </div>
        <div class="col-md-6" id="col-right">
          <card type="custom" body-classes="bg-secondary px-lg-5 py-lg-5" id="card-right">
            <div v-if="showLoginForm">
              <!-- Login -->
              <div class="text-center mb-3">
                <h4 class="display-3 font-weight-bold">Sign In</h4>
              </div>
              <div class="btn-wrapper text-center">
                <base-button type="neutral" class="mb-3 btn-block">
                  <img slot="icon" src="img/icons/github.svg">
                  Github
                </base-button>
                <base-button @click="googleLogin" type="neutral" class="mb-3 btn-block">
                  <img slot="icon" src="img/icons/google.svg">
                  Google
                </base-button>
              </div>
              <div class="text-center mb-3">
                <p class="lead text-muted">or use credentials</p>
              </div>
              <form role="form">
                <base-input
                  v-model.trim="loginForm.email"
                  alternative
                  class="mb-3"
                  placeholder="Email"
                  addon-left-icon="ni ni-email-83"
                ></base-input>
                <base-input
                  v-model.trim="loginForm.password"
                  alternative
                  type="password"
                  placeholder="Password"
                  addon-left-icon="ni ni-lock-circle-open"
                ></base-input>
                <p class="lead text-muted"><base-checkbox>Remember me</base-checkbox></p>
                <div class="text-center">
                  <base-button @click="login" type="primary" class="my-3 btn-block">Sign In</base-button>
                  <base-button
                    @click="toggleForm"
                    type="neutral"
                    class="my-3 btn-block"
                  >Create new account</base-button>
                </div>
              </form>
              <div class="row mt-3">
                <div class="col-6 text-left">
                  <a href="#" class="text-muted">
                    <small>Forgot password?</small>
                  </a>
                </div>
                <div class="col-6 text-right">
                  <a href="#" class="text-muted">
                    <small>Privacy Policy</small>
                  </a>
                </div>
              </div>
              <!-- //Login -->
            </div>
            <div v-else>
              <!-- Sign Up -->
              <div class="text-center mb-3">
                <h4 class="display-3 font-weight-bold">Create Account</h4>
              </div>
              <div class="btn-wrapper text-center">
                <base-button type="neutral" class="mb-3 btn-block">
                  <img slot="icon" src="img/icons/github.svg">
                  Github
                </base-button>
                <base-button @click="googleLogin" type="neutral" class="mb-3 btn-block">
                  <img slot="icon" src="img/icons/google.svg">
                  Google
                </base-button>
              </div>
              <div class="text-center mb-3">
                <p class="lead text-muted">or use credentials</p>
              </div>
              <form role="form">
                <base-input
                  v-model.trim="signupForm.name"
                  alternative
                  class="mb-3"
                  placeholder="Full Name"
                  addon-left-icon="ni ni-hat-3"
                ></base-input>
                <base-input
                  v-model.trim="signupForm.email"
                  alternative
                  class="mb-3"
                  placeholder="Email"
                  addon-left-icon="ni ni-email-83"
                ></base-input>
                <base-input
                  v-model.trim="signupForm.password"
                  alternative
                  type="password"
                  placeholder="Password"
                  addon-left-icon="ni ni-lock-circle-open"
                ></base-input>
                <p class="lead text-muted"><base-checkbox>I agree with the <a href="#">Privacy Policy</a></base-checkbox></p>
                <div class="text-center">
                  <base-button
                    @click="signup"
                    type="primary"
                    class="my-3 btn-block"
                  >Create new account</base-button>
                  <base-button @click="toggleForm" type="neutral" class="my-3 btn-block">Sign In</base-button>
                </div>
              </form>
              <div class="row mt-3">
                <div class="col-6 text-left">
                  <a href="#" class="text-muted">
                    <small>Forgot password?</small>
                  </a>
                </div>
                <div class="col-6 text-right">
                  <a href="#" class="text-muted">
                    <small>Privacy Policy</small>
                  </a>
                </div>
              </div>
              <!-- //Sign Up -->
            </div>
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
      },
      signupForm: {
        name: "",
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
    signup() {
      fb.auth
        .createUserWithEmailAndPassword(
          this.signupForm.email,
          this.signupForm.password
        )
        .then(credential => {
          this.$store.commit("setCurrentUser", credential.user);

          // create user object
          fb.usersCollection
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
    },
    googleLogin() {
      fb.auth
        .signInWithPopup(fb.googleProvider)
        .then(credential => {
          this.$store.commit("setCurrentUser", credential.user)

          fb.usersCollection.doc(credential.user.uid).set({

          }).then(() => {
            this.$store.dispatch("fetchUserProfile")
            this.updateGmailData()
            this.$router.push("/dashboard")
          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err);
        });
    },
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
    },
    updateGmailData() {
      this.user = fb.auth.currentUser
      fb.usersCollection.doc(this.user.uid).set({
        "name": this.user.displayName,
        "email": this.user.email,
        "photoURL": this.user.photoURL
      })
    }
  }
};
</script>

<style scoped>
.section {
  min-height: 100vh;
}

.section-lg {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

#card-left,
#card-right {
  height: 100%;
  border-radius: 0;
  border-style: none;
}

#container-login {
  padding: 0;
}

#col-left,
#col-right {
  padding: 0;
} 
</style>
