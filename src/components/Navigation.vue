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
const firebase = require('../helpers/firebaseConfig.js')
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
      menu: [
        {
          header: true,
          title: "Welcome"
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
          title: "Sign Out",
          icon: "fa fa-sign-out-alt"
        },
      ]
    };
  },
  computed: {
    ...mapActions(['toggleSidebarCollapsed']),
    ...mapState(['sidebarCollapsed'])
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
