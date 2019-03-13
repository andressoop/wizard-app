<template>
  <div class="sidenav">
    <div class="profileInfo">
      <img :src="this.userProfile.photoURL">
      <h5>Welcome, {{ this.userProfile.name }}!</h5>
    </div>
    <hr>
    <a href="#">Projects</a>
    <a href="#">##</a>
    <a href="#">##</a>
    <a href="#">Settings</a>
    <button @click="logout" type="button" class="btn btn-sm btn-danger">Sign out</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import logout from '../helpers/logout.js'

export default {
  name: 'SidebarMain',
  data() {
    return {}
  },
  computed: {
    ...mapState(['userProfile', 'currentUser', 'userProjects']),
  },
  methods: {
    logout: logout,
  },
}
</script>

<style scoped>
.sidenav {
  height: 100%;
  width: 250px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  color: #fff;
  overflow-x: hidden;
  padding-top: 20px;
}

.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #fff;
  display: block;
}

.sidenav a:hover {
  color: #fff;
}

.profileInfo {
  text-align: center;
}

.btn {
  margin-left: 10px;
  bottom: 20px;
  position: fixed;
}

hr {
  color: #fff;
  font-size: 40px;
  z-index: 2;
}

img {
  width: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
}
</style>
