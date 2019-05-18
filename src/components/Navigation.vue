<template>
    <SidebarMenu 
      @collapse="onCollapse" 
      @itemClick="onItemClick" 
      :menu="menu" 
      width="250px"
    />
</template>

<script>
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import '@fortawesome/fontawesome-free/css/all.css'
import _ from 'lodash'
import { mapState } from 'vuex'
import { SidebarMenu } from 'vue-sidebar-menu'
import firebase from '../helpers/firebaseConfig'
import MenuSeparator from '../components/ui/MenuSeparator'
import MenuProfilePicture from '../components/ui/MenuProfilePicture'

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
          href: "/clients",
          title: "Clients",
          icon: "fas fa-user-friends"
        },
        {
          href: "/projects",
          title: "Projects",
          icon: "fa fa-home"
        },
        {
          header: true,
          component: MenuSeparator,
          visibleOnCollapse: true
        },
        {
          header: true,
          title: _.truncate(this.$store.getters.activeProjectName, {'length': 25, 'omission': ' . . .'})
        },
        {
          href: `/project/${this.$store.state.activeProjectId}`,
          title: "Kanban board",
          icon: "fa fa-clipboard-check",
          disabled: !this.$store.getters.hasActiveProject
        },
        {
          href: `/project/notes/${this.$store.state.activeProjectId}`,
          title: "Notes",
          icon: "fa fa-sticky-note",
          disabled: !this.$store.getters.hasActiveProject
        },
        {
          header: true,
          component: MenuSeparator,
          visibleOnCollapse: true
        },
        {
          href: "/landing",
          title: "Wizard App",
          icon: "fas fa-info"
        },
        {
          href: "/profile",
          title: "Your Account",
          icon: "fa fa-user-edit"
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
