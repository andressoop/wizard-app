<template>
  <div id="dashboard" :class="[{'collapsed' : collapsed}]">
    <div class="dashboard">
      <div class="container-main">
      <ProjectKanban/> 
      </div>
      <sidebar-menu @collapse="onCollapse" :menu="menu"/>
    </div>
  </div>
</template>

<script>
import ProjectKanban from '../components/ProjectKanban.vue'
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import "@fortawesome/fontawesome-free/css/all.css";

export default {
  name: 'Kanban',
  components: {
    ProjectKanban,
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
        }
      ],
      collapsed: false,
    };
  },
  methods: {
    onCollapse (collapsed) {
      this.collapsed = collapsed
    }
  }
}

</script>

<style scoped>

</style>

