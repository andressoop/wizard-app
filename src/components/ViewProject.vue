<template>
    <div>
        <h1>Project</h1>
        <p>Project object: {{project}}</p>
        <p>Project name: {{project.name}}</p>
        <p>Project author UID: {{project.uid}}</p>
        <button type="button" class="btn btn-primary mr-2" @click="load()">UserProjects (clg)</button>
        <router-link to="/dashboard">
         <button type="button" class="btn btn-success">Back to Dashboard</button>
        </router-link>
       
    </div>
</template>

<script>
import firebase from 'firebase';
import { mapState } from 'vuex'

export default {
  name: 'ViewProject',
  props: [
    'projectName',
    'projectId',
    'projectCreatedOn'
  ],
  data() {
    return {
        key: '',
        project: {}
    }
  },
  computed: {
    ...mapState(['userProfile', 'currentUser', 'userProjects'])
  },
  created () {
      const ref = firebase.firestore().collection('projects').doc(this.$route.params.id)
      ref.get().then((doc) => {
      if (doc.exists) {
        this.key = doc.id;
        this.project = doc.data();
      } else {
        alert("No such document!");
      }
    });
  },
  methods: {
      load() {
          console.log(this.userProjects);
      }
  }
}
</script>

<style>

</style>
