<template>
  <div class="container-fluid">
  <div class="row no-gutter">
    <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
    <div class="col-md-8 col-lg-6">
      <div class="login d-flex align-items-center py-5">
       <div class="container">
          <div class="row">
            <div class="col-md-9 col-lg-8 mx-auto">

              <div v-if="authComponent === 'AuthEmailSignup'">
                <h3 class="login-heading mb-4">Create new account</h3>
                <AuthEmailSignup/>
                <hr>
                <h3 class="login-heading mb-4">You can sign up via</h3>
                <AuthGoogle/>
                <div class="text-center mt-5">
                  <p class="font-weight-light clickable-text" @click="goToAuthComponent('AuthEmailLogin')">Back to login</p>
                </div>
              </div>

              <div v-else-if="authComponent === 'AuthResetPassword'">
                <h3 class="login-heading mb-4">Reset password</h3>
                <AuthResetPassword/>
                <div class="text-center mt-5">
                  <p class="font-weight-light clickable-text" @click="goToAuthComponent('AuthEmailLogin')">Back to login</p>
                </div>
              </div>

              <div v-else> <!-- authComponent === 'AuthEmailLogin' -->
                <h3 class="login-heading mb-4">Welcome back!</h3>
                <AuthEmailLogin/>
                <div class="text-center">
                  <p class="font-weight-light small clickable-text" @click="goToAuthComponent('AuthResetPassword')">Forgot password?</p>
                </div>
                <hr>
                <h3 class="login-heading mb-4">You can also login with</h3>
                <AuthGoogle/>
                <div class="text-center mt-5">
                  <p class="font-weight-light clickable-text" @click="goToAuthComponent('AuthEmailSignup')">Or create an account</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>


<script>
import AuthGoogle from '../components/AuthGoogle.vue'
import AuthEmailLogin from '../components/AuthEmailLogin.vue'
import AuthEmailSignup from '../components/AuthEmailSignup.vue'
import AuthResetPassword from '../components/AuthResetPassword.vue'
import firebase from '../helpers/firebaseConfig'

export default {
  name: 'Login',
  components: {
    AuthGoogle,
    AuthEmailLogin,
    AuthEmailSignup,
    AuthResetPassword,
  },
  data() {
    return {
      authComponent: '',
    }
  },
  beforeCreate() {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {

        if (user.providerData[0].providerId == 'google.com'){
          this.updateGmailData();
          this.$router.push('/projects');
        } else {
          this.$store.commit('setCurrentUser', user);
          this.$store.dispatch('fetchUserProfile', user)
          this.$router.push('/projects');
        }
        
      } else {
        this.$router.push('/login');
      }
    });
  },
  methods: {
    updateGmailData() {
      this.user = firebase.auth.currentUser;
      firebase.usersCollection.doc(this.user.uid).set({
        name: this.user.displayName,
        email: this.user.email,
        photoURL: this.user.photoURL
      });
    },
    goToAuthComponent(component) {
      this.authComponent = component
    }
  }
};
</script>

<style>
:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: 0.75rem;
}

.login,
.image {
  min-height: 100vh;
}

.bg-image {
  background-image: url('https://source.unsplash.com/WEQbe2jBg40/600x1200');
  background-size: cover;
  background-position: center;
}

.login-heading {
  font-weight: 300;
}

.clickable-text {
  cursor: pointer;
}

</style>
