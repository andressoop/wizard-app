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
  props: {
    sidebarCollapsed: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    ...mapState(['userProfile']),
    getUserPicture: function() {
      if (this.userProfile.photoURL) {
        let photoURL = this.userProfile.photoURL
        return `<img src="${photoURL}" height="40", width="40">`
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
  max-width: 40px;
  max-height: 40px;
  overflow: hidden;
  margin-bottom: 6px;
  margin-right: 10px;
}

#avatar-title {
  display:inline-block;
  color: #FFF;
}
</style>


