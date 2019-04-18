<template>
  <form autocomplete="off">
    <div v-if="firebaseError" class="firebase-error">
      {{ firebaseError }}
    </div>
    <div class="form-label-group" :class="{invalid: $v.name.$error}">
      <input
        v-model.trim="name"
        @blur="$v.name.$touch()" 
        name="inputFullName"
        type="text" 
        class="form-control" 
        placeholder="Full name"
        id="name" 
      >
      <label for="inputFullName">Full name <span>*</span></label>
      <p class="small text-danger ml-1 mt-2" v-if="!$v.name.minLength">Name must be at least 4 characters</p>
    </div>

    <div class="form-label-group" :class="{invalid: $v.email.$error}">
      <input
        v-model.trim="email" 
        @blur="$v.email.$touch()" 
        name="inputEmail"
        type="email" 
        class="form-control" 
        id="email" 
        placeholder="Email address"
        autocomplete="new-email"
      >
      <label for="inputEmail">Email address <span>*</span></label>
      <p class="small text-danger ml-1 mt-2" v-if="!$v.email.email">Please provide valid email address.</p>
    </div>

    <div class="form-label-group" :class="{invalid: $v.password.$error}">
      <input
        v-model.trim="password" 
        @blur="$v.password.$touch()" 
        name="inputPassword"
        type="password" 
        class="form-control" 
        id="password" 
        placeholder="Password"
        autocomplete="new-password"
      >
      <label for="inputPassword">Password <span>*</span></label>
      <p class="small text-danger ml-1 mt-2" v-if="!$v.password.minLength">Password should be at least 6 characters</p>
    </div>

    <div class="form-label-group" :class="{invalid: $v.confirmPassword.$error}">
      <input
        v-model.trim="confirmPassword"
        @blur="$v.confirmPassword.$touch()"
        name="inputConfirmPassword"
        type="password"
        class="form-control"
        id="confirm-password"
        placeholder="Confirm password"
        autocomplete="new-password"
      >
      <label for="inputConfirmPassword">Confirm password <span>*</span></label>
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
import firebase from '../helpers/firebaseConfig'

export default {
  name: "AuthEmailSignup",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
      firebaseError: "",
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
              this.$store.dispatch("fetchUserProfile", credential.user);
              this.$router.push("/dashboard");
            })
            .catch(err => {
              this.firebaseError = err.message
            });
        })
        .catch(err => {
          this.firebaseError = err.message
        });
    }
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

#name {
  text-transform: capitalize;
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

button:disabled {
  cursor: not-allowed;
}

</style>

