<template>
  <div>

    <ul>
      <li
        v-for="project in userProjects"
        v-bind:key="project.id"
      >{{project.id}} | {{project.name}} | {{project.uid}} | {{project.createdOn | formatDate}}</li>
    </ul>
    <ul>
      <form>
        <input type="text" v-model.trim="newProject.name">
        <a @click="createProject" class="btn btn-success">Uus projekt</a>
        </form>
      <li>
        <a @click="logout" class="btn btn-danger">logout</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
const fb = require("../helpers/firebaseConfig.js");

export default {
  name: "ProjectsList",
  data() {
    return {
      newProject: {
        name: null
      }
    };
  },
  computed: {
    ...mapState(['userProfile', 'currentUser', 'userProjects'])
  },
  methods: {
    logout() {
      fb.auth
        .signOut()
        .then(() => {
          this.$store.dispatch("clearData");
          this.$router.push("/login");
        })
        .catch(err => {
          console.log(err);
        });
    },
    createProject() {
      fb.projectsCollection.add({
        createdOn: new Date(),
        uid: this.currentUser.uid,
        name: this.newProject.name
      }).catch(err => {
        console.log(err)
      });
    }
  },
  filters: {
    formatDate(val) {
      if(!val) {return '-'}
      let date = val.toDate()
      return moment(date).fromNow()
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
