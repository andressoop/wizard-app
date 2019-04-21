<template>
  <div class="container-fluid pl-5 mt-4">
      <div class="">
        <form @submit.prevent>
          <input type="text" v-model.trim="newList.name" @keyup.enter="createList">
          <button @click="createList" type="button" class="btn btn-sm btn-success">Create new List</button>
        </form>
      </div>
      <hr>
      <div class="d-flex flex-row mr-5" v-if="Object.keys(getAllLists).length > 0">
        <div v-for="list in getAllLists" :key="list.id">
          <KanbanList :listName="list.name" :listId="list.id" />
        </div>
      </div>
      <div class="d-flex flex wrap" v-else>
        <h3 class="text-muted">You have no lists</h3>
      </div>
    </div>
</template>

<script>
import firebase from '@/helpers/firebaseConfig'
import KanbanList from '../components/KanbanList.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Kanban',
  data() {
    return {
      newList: {
        name: '',
      }
    }
  },
  components: {
    KanbanList
  },
  computed: {
    ...mapGetters(['getAllLists'])
  },
  methods: {
    ...mapActions(['fetchProjectKanbanLists', 'fetchProjectKanbanTasks']),
    createList() {
      firebase.projectsCollection.doc(this.key).collection('lists').add({
        createdOn: new Date(),
        name: this.newList.name
      }).catch(err => {
        console.log(err)
      });
      this.newList.name = ''
    }
  },
  created() {
    const ref = firebase.projectsCollection.doc(this.$route.params.id)
    ref.get().then((doc) => {
      if (doc.exists) {
        this.key = doc.id;
        this.project = doc.data();
      } else {
        alert("No such document!");
      }
    })
  },
  mounted() {
    this.fetchProjectKanbanLists(this.$route.params.id)
    this.fetchProjectKanbanTasks(this.$route.params.id)
  }
}
</script>

<style>

</style>
