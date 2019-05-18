<template>
  <div class="avatar-wrapper">
    <div class="avatar-icon" v-html="getUserPicture"></div>
    <span id="avatar-title">{{ userProfile.name }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Avatars from '@dicebear/avatars'
import sprites from '@dicebear/avatars-gridy-sprites'

export default {
  name: 'MenuProfilePicture',
  computed: {
    ...mapState(['userProfile']),
    getUserPicture: function() {
      if (this.userProfile.photoURL) {
        let photoURL = this.userProfile.photoURL
        return `<img src="${photoURL}" height="30", width="30" style="border-radius: 3px">`
      } else {
        let options = {};
        let avatar = new Avatars(sprites(options))
        let photoSVG = avatar.create(this.userProfile.name)
        return photoSVG
      }
    }
  }
}
</script>

<style scoped>
.avatar-wrapper {
  display: flex;
  align-items: center;
}

.avatar-icon {
  display: inline-block;
  width: 30px;
  height: 30px;
  overflow: hidden;
  margin: 10px;
}

#avatar-title {
  position: relative;
  display: inline-block;
  white-space: nowrap;
  color: #FFF;
}
</style>


