<template>
  <div class="container-fluid pl-5 mt-4">
      <div class="">
        <form @submit.prevent>
          <input type="text" v-model.trim="newList.name" @keyup.enter="createList">
          <button @click="createList" type="button" class="btn btn-sm btn-success">Create new List</button>
        </form>
      </div>
      <hr>
        <draggable tag="div" class="d-flex flex-row mr-5" v-model="lists" group="lists" v-if="Object.keys(getAllLists).length > 0">
          <div v-for="list in getAllLists" :key="list.id">
            <KanbanList :listName="list.name" :listId="list.id" />
          </div>
        </draggable> 
      <div class="d-flex flex wrap" v-else>
        <h3 class="text-muted">You have no lists</h3>
      </div>
    </div>
</template>

<script>
import firebase from '@/helpers/firebaseConfig'
import KanbanList from '../components/KanbanList.vue'
import { mapGetters, mapActions } from 'vuex'
import Draggable from 'vuedraggable'

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
    KanbanList,
    Draggable
  },
  computed: {
    ...mapGetters(['getAllLists']),
    lists: {
      get() {
        return this.getAllLists
      },
      set(data) {
        this.updateListDoc(data)        
      }
    }
  },
  methods: {
    ...mapActions(['fetchProjectKanbanLists', 'fetchProjectKanbanTasks']),
    updateListDoc(data) {
      const firebaseCollection = firebase.projectsCollection.doc(this.key).collection('lists')

      data.forEach((element, index) => {
        firebaseCollection.doc(element.id).update({ listOrder: index })
      });
    },
    createList() {
      let getListOrder = this.getAllLists.length
      firebase.projectsCollection.doc(this.key).collection('lists').add({
        createdOn: new Date(),
        listOrder: getListOrder,
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
