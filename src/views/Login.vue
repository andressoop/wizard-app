<template>
  <div class="container">
    <AuthEmailLogin/>
    <AuthGithub/>
    <AuthGoogle/>
    <AuthEmailSignup/>
  </div>
</template>


<script>
import AuthGithub from "../components/AuthGithub.vue";
import AuthGoogle from "../components/AuthGoogle.vue";
import AuthEmailLogin from "../components/AuthEmailLogin.vue";
import AuthEmailSignup from "../components/AuthEmailSignup.vue";
const firebase = require("../helpers/firebaseConfig.js");

export default {
  name: "Login",
  components: {
    AuthGithub,
    AuthGoogle,
    AuthEmailLogin,
    AuthEmailSignup
  },
  data() {
    return {}
  },
  beforeCreate: function() {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.$router.push("/dashboard");

        if (user.providerData.providerId == 'google.com'){
          this.googleLoginResponse();
        }
        
      } else {
        this.$router.push("/login");
      }
    });
  },
  methods: {
    googleLoginResponse() {
      firebase.auth
        .getRedirectResult()
        .then(credential => {
          this.$store.commit("setCurrentUser", credential.user);

          firebase.usersCollection
            .doc(credential.user.uid)
            .set({})
            .then(() => {
              this.$store.dispatch("fetchUserProfile");
              this.updateGmailData();
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateGmailData() {
      this.user = firebase.auth.currentUser;
      firebase.usersCollection.doc(this.user.uid).set({
        name: this.user.displayName,
        email: this.user.email,
        photoURL: this.user.photoURL
      });
    }
  }
};
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
