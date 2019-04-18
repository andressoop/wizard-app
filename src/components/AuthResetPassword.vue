<template>
  <form>
    <div v-if="firebaseError" class="firebase-error">
      {{ firebaseError }}
    </div>
    <div v-if="firebaseSuccess" class="firebase-success">
      {{ firebaseSuccess }}
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
      <label for="inputEmail small">Email address</label>
      <p class="small text-danger ml-1 mt-2" v-if="!$v.email.email">Please provide valid email address.</p>
    </div>

    <button
      @click="resetPassword"
      class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
      type="button"
    >Reset password</button>
  </form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import firebase from '../helpers/firebaseConfig'

export default {
  name: 'AuthResetPassword',
  data() {
    return {
        email: '',
        firebaseError: '',
        firebaseSuccess: '',
    }
  },
  validations: {
    email: {
      required,
      email,
    },
  },
  methods: {
    resetPassword() {
      firebase.auth.sendPasswordResetEmail(this.email)
        .then(() => {
          this.firebaseError = ''
          this.firebaseSuccess = 'In a few moments, you will receive an email with a link to reset your password.'
        }).catch(err => {
          this.firebaseSuccess = ''
          this.firebaseError = err.message
        });
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

.firebase-error, .firebase-success {
  margin-bottom: 12px;
  font-size: 12px;
  padding: 10px 16px;
  border-radius: 4px;
}

.firebase-error {
  color: #a94442;
  background: #F3DEDE;
}

.firebase-success {
  color: #3c763d;
  background: #DEF3DE;
}

.form-label-group > label {
  pointer-events: none;
}
</style>
