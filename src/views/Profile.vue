<template>
  <div class="container-fluid pl-5 mt-4 pl-0">
    <div class="row">
      <div class="col-lg-6">
        <h1>Your Account</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, fugiat modi ex ipsum eos, architecto, eligendi dolores voluptatum doloribus veniam deserunt iure quisquam sunt assumenda totam culpa enim temporibus incidunt?</p>
      </div>
    </div>
    <div class="d-flex justify-content-start mb-4 pl-0">
      <div class="avatar-icon ml-0" v-html="getUserPicture"></div>
      <h4 class="ml-3 mt-4">{{userProfile.name}}</h4>
    </div>
    <div class="d-flex flex-column col-12 pl-0">
      <div>
        <p>
          Account was created:
          <strong v-if="currentUser">{{currentUser.metadata.creationTime}}</strong>
        </p>
      </div>
      <div>
        <p>
          Last login:
          <strong v-if="currentUser">{{currentUser.metadata.lastSignInTime}}</strong>
        </p>
      </div>
      <div>
        <p>
          Number of projects:
          <strong v-if="userProjects">{{userProjects.length}}</strong>
        </p>
      </div>
    </div>
    <hr>
    <div class="d-flex flex-column col-4 pl-0 pr-0">
      <div v-if="firebaseError" class="firebase-error">{{ firebaseError }}</div>
      <div v-if="firebaseSuccess" class="firebase-success">{{ firebaseSuccess }}</div>
    </div>
    <div class="d-flex flex-column col-6 pl-0">
      <h4 class="mb-4">Password Reset</h4>
      <div>
        <button
          @click="resetPassword"
          type="button"
          class="btn btn-confirm btn-primary text-uppercase font-weight-bold mb-2 mr-3"
        >Request password reset</button>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-lg-6">
        <h4 class="mb-4">Delete Account</h4>
        <p>
          Please note that this is a permanent action that cannot be restored.
          <span class="clickable-text text-danger" @click="show = !show">Click here to proceed</span>.
        </p>
        <transition name="fade">
          <div class="deleteAccountForm" v-if="show">
            <p>
              In order to delete your account, please write
              <span class="text-highlighted">Avada Kedavra</span> to the input below.
            </p>
            <div class="form-row">
              <div class="form-label-group mr-2" :class="{invalid: $v.confirmInput.$error}">
                <input
                  v-model="confirmInput"
                  @input="$v.confirmInput.$touch()"
                  name="confirmInput"
                  type="text"
                  class="form-control"
                  placeholder="Confirmation"
                  autocomplete="off"
                >
                <label for="deleteAccount small">
                  Confirmation
                  <span class="text-danger">*</span>
                </label>
                <ul>
                  <li class="small text-danger ml-1 mt-2" v-if="!$v.confirmInput.required">
                    Magic spell is required.
                  </li>
                  <li class="small text-danger ml-1 mt-2" v-if="$v.confirmInput.$error">
                    Magic spells don't match.
                  </li>
                </ul>
              </div>
              <div class="form-group">
                <button
                  @click="deleteAccount"
                  type="button"
                  class="btn btn-confirm btn-outline-danger text-uppercase font-weight-bold mb-2" :disabled="$v.$invalid"
                >Delete Account</button>
              </div>
              <div v-if="firebaseDeleteError" class="firebase-error">{{ firebaseDeleteError }}</div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '../helpers/firebaseConfig'
import { mapState } from 'vuex'
import Avatars from '@dicebear/avatars'
import sprites from '@dicebear/avatars-gridy-sprites'
import { required, sameAs } from 'vuelidate/lib/validators'


export default {
  name: 'Profile',
  data() {
    return {
      firebaseError: '',
      firebaseDeleteError: '',
      firebaseSuccess: '',
      confirmationStrign: null,
      show: false,
      confirmStr: 'Avada Kedavra',
      confirmInput: '',
    }
  },
  validations: {
    confirmInput: {
      required,
      sameAs: sameAs('confirmStr')
    },
  },
  computed: {
    ...mapState(['currentUser', 'userProfile', 'userProjects']),
    getUserPicture: function () {
      if (this.userProfile.photoURL) {
        let photoURL = this.userProfile.photoURL
        return `<img src="${photoURL}" height="50", width="50" style="border-radius: 3px">`
      } else {
        let options = {};
        let avatar = new Avatars(sprites(options))
        let photoSVG = avatar.create(this.userProfile.name)
        return photoSVG
      }
    }
  },
  methods: {
    resetPassword() {
      firebase.auth.sendPasswordResetEmail(this.userProfile.email)
        .then(() => {
          this.firebaseError = ''
          this.firebaseSuccess = 'In a few moments, you will receive an email with a link to reset your password.'
        }).catch(err => {
          this.firebaseSuccess = ''
          this.firebaseError = err.message
        });
    },
    deleteAccount() {
      var user = firebase.auth.currentUser;
      user.delete().then(function () {
        // this.$store.dispatch('clearData')
        // window.location.reload(true); 
        this.$router.replace('/login')
        return true;
      }).catch(err => {
        this.firebaseDeleteError = err.message
      });
    }
  }
}
</script>

<style scoped>
img {
  width: 50px;
  height: 50px;
}

.avatar-icon {
  display: inline-block;
  width: 50px;
  height: 50px;
  overflow: hidden;
  margin: 10px;
}

.firebase-error,
.firebase-success {
  margin-bottom: 12px;
  font-size: 12px;
  padding: 10px 18px;
  border-radius: 4px;
}

.firebase-error {
  color: #a94442;
  background: #f3dede;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
