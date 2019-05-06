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
    <div class="d-flex flex-column col-6 pl-0">
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
    <div class="d-flex flex-column col-6 pl-0">
      <div>
        <button
            type="button"
            class="btn btn-confirm btn-primary text-uppercase font-weight-bold mb-2"
          >Request new password</button>
           <button
            type="button"
            class="btn btn-confirm btn-outline-danger text-uppercase font-weight-bold mb-2 ml-2"
          >Request account closure</button>
      </div>
    </div>
   
    </div>
</template>

<script>

import { mapState } from 'vuex'
import Avatars from '@dicebear/avatars'
import sprites from '@dicebear/avatars-gridy-sprites'


export default {
  name: 'Profile',
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

</style>
