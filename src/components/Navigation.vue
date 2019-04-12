<template>
    <SidebarMenu 
      @collapse="onCollapse" 
      @itemClick="onItemClick" 
      :menu="menu" 
      :collapsed="sidebarCollapsed"
      width="250px"
    />
</template>

<script>
import firebase from '../helpers/firebaseConfig'
import { mapActions, mapState } from 'vuex'
import { SidebarMenu } from "vue-sidebar-menu"
import "vue-sidebar-menu/dist/vue-sidebar-menu.css"
import "@fortawesome/fontawesome-free/css/all.css"
import MenuSeparator from '../components/ui/MenuSeparator.vue'

export default {
  name: 'Navigation',
  components: {
    SidebarMenu
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapActions(['toggleSidebarCollapsed']),
    ...mapState(['sidebarCollapsed', 'currentUser', 'userProfile']),
    menu: function(){
      return [
        {
          /* header: true, */
          title: this.userProfile.name,
          icon: "fa fa-user"
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
      this.$store.dispatch('toggleSidebarCollapsed', collapsed)
    },
    onItemClick (event, item) {
      if (item.title === "Sign Out") {
        this.logout()
      }
    },
    logout() {
      firebase.auth
        .signOut()
        .then(() => {
          this.$store.dispatch("clearData");
          this.$router.push("/login");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
</script>

<style>

</style>
