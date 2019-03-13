<template>
  <div class="container">
    <!-- Sign in -->
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
      <button class="btn btn-lg btn-primary btn-block" type="button">
        <img src="img/icons/github.svg" alt="Github Logo"> Github
      </button>
      <button @click="googleLogin" class="btn btn-lg btn-primary btn-block" type="button">
        <img src="img/icons/google.svg" alt="Google Logo"> Google
      </button>
    </form>
    <!-- Sign up -->
    <form class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Sign Up</h1>
      <label for="inputName" class="sr-only">Name</label>
      <input
        v-model.trim="signupForm.name"
        type="text"
        class="form-control"
        placeholder="Full Name"
        
      >
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
  </div>
</template>


<script>
const fb = require('../helpers/firebaseConfig.js');

export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        name: '',
        email: '',
        password: ''
      },
      showLoginForm: true
    };
  },
  beforeCreate: function() {
    fb.auth.onAuthStateChanged(user => {
      if (user) {
        this.$router.push('/dashboard');
        this.googleLoginResponse();
      } else {
        this.$router.push('/login');
      }
    });
  },
  methods: {
    login() {
      fb.auth
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
    },
    signup() {
      fb.auth
        .createUserWithEmailAndPassword(
          this.signupForm.email,
          this.signupForm.password
        )
        .then(credential => {
          this.$store.commit('setCurrentUser', credential.user);

          // create user object
          fb.usersCollection
            .doc(credential.user.uid)
            .set({
              name: this.signupForm.name,
              email: this.signupForm.email
            })
            .then(() => {
              this.$store.dispatch('fetchUserProfile');
              this.$router.push('/dashboard');
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
      fb.auth.signInWithRedirect(fb.googleProvider);
    },
    googleLoginResponse() {
      fb.auth
        .getRedirectResult()
        .then(credential => {
          this.$store.commit('setCurrentUser', credential.user);

          fb.usersCollection
            .doc(credential.user.uid)
            .set({})
            .then(() => {
              this.$store.dispatch('fetchUserProfile');
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
      this.user = fb.auth.currentUser;
      fb.usersCollection.doc(this.user.uid).set({
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
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
