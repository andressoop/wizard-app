<template>
  <form>
    <div v-if="firebaseError" class="firebase-error">
      {{ firebaseError }}
    </div>
    <div class="form-label-group" :class="{invalid: $v.email.$error}">
      <input
        v-model.trim="email"
        @blur="$v.email.$touch()"
        name="inputEmail"
        type="email"
        class="form-control"
        placeholder="Email address"
        required autofocus
      >
      <label for="inputEmail" class="text-danger" v-if="!$v.email.email">Please provide valid email address.</label>
      <label for="inputEmail" v-else>Email address</label>
    </div>

    <div class="form-label-group" :class="{invalid: $v.password.$error}">
      <input
        v-model.trim="password"
        @blur="$v.password.$touch()"
        name="inputPassword"
        type="password"
        class="form-control"
        placeholder="Password"
      >
      <label for="inputPassword" class="text-danger" v-if="!$v.password.minLength">Password should be at least 6 characters</label>
      <label for="inputPassword">Password</label>
    </div>

    <div class="custom-control custom-checkbox mb-3">
      <input type="checkbox" class="custom-control-input" id="customCheck1" v-model="rememberPassword">
      <label class="custom-control-label small" for="customCheck1">Stay signed in</label>
    </div>
    <button
      @click="login"
      class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
      type="button"
    >Sign in</button>
  </form>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import firebase from '../helpers/firebaseConfig'

export default {
  name: 'AuthEmailLogin',
  data() {
    return {
        email: '',
        password: '',
        firebaseError: '',
        rememberPassword: false,
    }
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6)
    },
  },
  methods: {
    login() {
      let authSession = this.rememberPassword ? firebase.persistenceState.LOCAL : firebase.persistenceState.SESSION;
      firebase.auth.setPersistence(authSession)
        .then( () => {
          firebase.auth
            .signInWithEmailAndPassword(
              this.email,
              this.password
            ).catch(err => {
              this.firebaseError = err.message
            })
        }).catch(err => {
          this.firebaseError = err.message
        })
    },
  }
};
</script>

<style scoped>
.invalid label {
  color: red!important;
}

.invalid input {
  border: 1px solid red;
  background-color: #f1f2f6;
}

.firebase-error {
  margin-bottom: 12px;
  font-size: 12px;
  padding: 10px 16px;
  color: #a94442;
  background: #F3DEDE;
  border-radius: 4px;
}

.form-label-group > label {
  pointer-events: none;
}

label {
  padding-top: 2px;
}
</style>
