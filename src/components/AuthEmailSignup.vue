<template>
  <form autocomplete="off">
    <div class="form-label-group" :class="{invalid: $v.name.$error}">
      <input
        type="text" class="form-control" id="name" @blur="$v.name.$touch()" v-model.trim="name"
      >
      <label for="inputEmail">Full name <span>*</span></label>
      <p class="small text-danger ml-1 mt-2" v-if="!$v.name.minLength">Name must be at least 4 characters</p>
      <p class="small text-muted ml-1 mt-2" v-if="!$v.name.required">This field must not be empty</p>
    </div>

    <div class="form-label-group" :class="{invalid: $v.email.$error}">
      <input
        type="email" class="form-control" id="email" @blur="$v.email.$touch()" v-model.trim="email" autocomplete="new-email"
      >
      <label for="inputEmail">Email address <span>*</span></label>
      <p class="small text-danger ml-1 mt-2" v-if="!$v.email.email">Please provide valid email address.</p>
      <p class="small text-muted ml-1 mt-2" v-if="!$v.email.required">This field must not be empty</p>
    </div>

    <div class="form-label-group" :class="{invalid: $v.password.$error}">
      <input
        type="password" class="form-control" id="password" @blur="$v.password.$touch()" v-model.trim="password" autocomplete="new-password"
      >
      <label for="inputPassword">Password <span>*</span></label>
      <p class="small text-danger ml-1 mt-2" v-if="!$v.password.minLength">Password should be at least 6 characters</p>
    </div>

    <div class="form-label-group" :class="{invalid: $v.confirmPassword.$error}">
      <input
        type="password"
        class="form-control"
        id="confirm-password"
        @blur="$v.confirmPassword.$touch()"
        v-model.trim="confirmPassword"
        autocomplete="new-password"
      >
      <label for="inputPassword">Confirm password <span>*</span></label>
      <p class="small text-danger ml-1 mt-2" v-if="!$v.confirmPassword.sameAs">Passwords don't match.</p>
    </div>

    <div class="custom-control custom-checkbox mb-3" :class="{invalid: $v.terms.$invalid}">
      <input type="checkbox" class="custom-control-input" id="terms" @change="$v.terms.$touch()" v-model="terms">
      <label class="custom-control-label small" for="terms">I agree to the terms of service and privacy policy</label>
    </div>
    <button
      @click="signup"
      class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
      type="button" :disabled="$v.$invalid"
    >Create account</button>
  </form>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
const firebase = require('../helpers/firebaseConfig.js')

export default {
  name: "AuthEmailSignup",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6)
    },
    confirmPassword: {
      sameAs: sameAs('password')
    },
    terms: {
      sameAs: sameAs(() => true)
    }
  },
  methods: {
    signup() {
      firebase.auth
        .createUserWithEmailAndPassword(
          this.email,
          this.password
        )
        .then(credential => {
          this.$store.commit("setCurrentUser", credential.user);

          // create user object
          firebase.usersCollection
            .doc(credential.user.uid)
            .set({
              name: this.name,
              email: this.email
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

<style>

.invalid label {
  color: red!important;
}

.invalid input {
  border: 1px solid red;
  background-color: #f1f2f6;
}

#name {
  text-transform: capitalize;
}

</style>

