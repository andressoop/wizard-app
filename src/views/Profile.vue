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
        <p>Account was created: <strong v-if="currentUser">{{currentUser.metadata.creationTime}}</strong></p>
      </div>
      <div>
        <p>Last login: <strong v-if="currentUser">{{currentUser.metadata.lastSignInTime}}</strong></p>
      </div>
      <div>
        <p>Number of projects: <strong v-if="userProjects">{{userProjects.length}}</strong></p>
      </div>
    </div>
    <hr>
    <div class="d-flex flex-column col-5 pl-0 pr-0">
      <div v-if="firebaseError" class="firebase-error">
      {{ firebaseError }}
    </div>
    <div v-if="firebaseSuccess" class="firebase-success">
      {{ firebaseSuccess }}
    </div>
    </div>
    <div class="d-flex flex-column col-6 pl-0">
      <div>
        <button
            @click="resetPassword"
            type="button"
            class="btn btn-confirm btn-primary text-uppercase font-weight-bold mb-2 mr-3"
          >Request password reset</button>
           <button
            @click="deleteAccount"
            type="button"
            class="btn btn-confirm btn-outline-danger text-uppercase font-weight-bold mb-2"
          >Delete Account</button>
      </div>
    </div>
   
    </div>
</template>

<script>
import firebase from '../helpers/firebaseConfig'
import { mapState } from 'vuex'
import Swal from 'sweetalert2'
import Avatars from '@dicebear/avatars'
import sprites from '@dicebear/avatars-gridy-sprites'


export default {
  name: 'Profile',
  data() {
    return {
        firebaseError: '',
        firebaseSuccess: '',
        confirmationStrign: null,
    }
  },
  computed: {
    ...mapState(['currentUser', 'userProfile', 'userProjects']),
    getUserPicture: function() {
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
        console.log(this.firebaseError);
        Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'error',
        html:
        'Please confirm the action by typing <span class="text-danger">Avada Kedavra</span> to the input below.<br/><br/>' +
        '<input class="form-control" id="deleteConfirmation">',
        showCancelButton: true,
        confirmButtonColor: '#20bf6b',
        cancelButtonColor: '#D63031',
        confirmButtonText: 'Yes, delete it!'
      }).then(() => {
        const deleteInput = document.getElementById("deleteConfirmation").value          

        if ( deleteInput === "Avada Kedavra" && this.delete(deleteInput)) {
                    
          Swal.fire(
            'Deleted!',
            'Your account has been deleted.',
            'success'
          )
        } else {
          Swal.fire(
            'Cannot delete!',
            'You did not provide a correct spell! <br><br> Also please be aware that this operation is sensitive and requires recent authentication. Log in again before retrying this request.',
            'warning'
          )
        }
      })
        
      },
      delete(confirmation) {
        if(confirmation != "Avada Kedavra") { return }
        var user = firebase.auth.currentUser;
            user.delete().then(function() {
              this.$store.dispatch('clearData')
              this.$router.push('/login')
            }).catch(err => {
              this.firebaseError = err.message
            });
            return true;     
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

.firebase-error, .firebase-success {
  margin-bottom: 12px;
  font-size: 12px;
  padding: 10px 18px;
  border-radius: 4px;
}

.firebase-error {
  color: #a94442;
  background: #F3DEDE;
}

</style>
