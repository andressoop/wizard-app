<template>
  <div class="container-fluid pl-5 mt-4">

    <draggable 
      tag="div" class="d-flex flex-row mr-5" 
      group="lists"
      v-model="lists" 
      handle=".draggable-item" 
      filter=".not-draggable-item"
    >
      <div v-for="list in getAllLists" :key="list.id">
        <KanbanList :listName="list.name" :listId="list.id" />
      </div>

      <div slot="footer"> 
        <div class="card mr-5 mb-5">
          <div class="card-header" @click="newList.inputActive = true">
            <h5 class="card-title text-muted" v-if="newList.inputActive === false">Add new list</h5>
            <input type="text" placeholder="Insert list name"
              v-if="newList.inputActive === true" 
              v-model.trim="newList.name" 
              v-focus="true"
              @keyup.enter="createList()"
              @keyup.esc="newList.name = ''; newList.inputActive = false"
              v-on:blur="newList.inputActive = false"
            >
          </div>
        </div>        
      </div>

    </draggable>
        

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
        inputActive: false,
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
      if (this.newList.name.length !== 0) {
        let getListOrder = this.getAllLists.length
        firebase.projectsCollection.doc(this.key).collection('lists').add({
          createdOn: new Date(),
          listOrder: getListOrder,
          name: this.newList.name
        }).catch(err => {
          console.error("Error creating new list: ", err);
        });
        this.newList.name = ''
      } else {
        return
      } 
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
    });
  },
  mounted() {
    this.fetchProjectKanbanLists(this.$route.params.id);
    this.fetchProjectKanbanTasks(this.$route.params.id);
  },
}
</script>

<style>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 300px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
</style>
