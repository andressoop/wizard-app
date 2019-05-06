<template>
    <SidebarMenu 
      @collapse="onCollapse" 
      @itemClick="onItemClick" 
      :menu="menu" 
      width="250px"
    />
</template>

<script>
import firebase from '../helpers/firebaseConfig'
import { mapState } from 'vuex'
import { SidebarMenu } from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import '@fortawesome/fontawesome-free/css/all.css'
import MenuSeparator from '../components/ui/MenuSeparator'
import MenuProfilePicture from '../components/ui/MenuProfilePicture'
import { setTimeout } from 'timers'

export default {
  name: 'Navigation',
  components: {
    SidebarMenu,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['userProfile']),
    menu: function() {
      return [
        {
          header: true,
          component: MenuProfilePicture,
          visibleOnCollapse: true
        },
        {
          href: "/dashboard",
          title: "Dashboard",
          icon: "fa fa-home"
        },
        {
          header: true,
          component: MenuSeparator,
          visibleOnCollapse: true
        },
        {
          href: "/profile",
          title: "Your Account",
          icon: "fa fa-user-edit"
        },
        {
          href: "/settings",
          title: "Settings",
          icon: "fa fa-cog"
        },
        {
          title: "Sign Out",
          icon: "fa fa-sign-out-alt"
        },
      ]
    }
  },
  methods: {
    onCollapse (collapsed) {
      this.$emit('onCollapse', collapsed)
      let avatarTitleElement = document.getElementById('avatar-title')
      if(collapsed === true) {
        avatarTitleElement.style.display = 'none'
      } else {
        setTimeout(() => {avatarTitleElement.style.display = 'inline-block'}, 100)
        avatarTitleElement.style.display = 'inline-block'
      }
    },
    onItemClick (event, item) {
      if (item.title === 'Sign Out') {
        this.logout()
      }
    },
    logout() {
      firebase.auth
        .signOut()
        .then(() => {
          this.$store.dispatch('clearData')
          this.$router.push('/login')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
.v-sidebar-menu {
  z-index: 10;
  background: #1E272E;
}

.v-sidebar-menu .router-link-active {
  box-shadow: inset 3px 0 0 0 #6C63FF!important;
}

.v-sidebar-menu .vsm-mobile-bg {
  background: #6C63FF;
}

.v-sidebar-menu .collapse-btn {
  outline: none;
}
</style>
