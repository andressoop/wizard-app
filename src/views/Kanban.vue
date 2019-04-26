<template>
  <div class="container-fluid pl-5 mt-4">

    <draggable 
      tag="div" class="d-flex flex-row mr-5" 
      group="lists"
      v-model="projectLists" 
      handle=".draggable-item" 
      filter=".not-draggable-item"
      animation=200
      ghostClass="ghost"
    >
      <div v-for="(list, index) in projectLists" :key="list.id">
        <KanbanList :listIndex="index" :listName="list.name" :listId="list.id" />
      </div>

      <div slot="footer"> 
        <div class="card mr-5 mb-5">
          <div class="card-header" @click="newList.inputActive = true">
            <h5 class="card-title text-muted" v-if="newList.inputActive === false">Add new list</h5>
            <input type="text" class="form-control" placeholder="Insert list name"
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
import KanbanList from '../components/KanbanList.vue'
import Draggable from 'vuedraggable'

export default {
  name: 'Kanban',
  data() {
    return {
      newList: {
        inputActive: false,
        name: '',
        listOrder: '',
      }
    }
  },
  components: {
    KanbanList,
    Draggable
  },
  computed: {
    projectLists: {
      get() {
        return this.$store.state.projectKanbanLists
      },
      set(data) {
        this.$store.dispatch('editKanbanListOrder', data)
      }
    }
  },
  methods: {
    createList() {
      if (this.newList.name.length !== 0) {
        this.newList.listOrder = this.projectLists.length ? this.projectLists.length.toString() : '0'
        this.$store.dispatch('createNewKanbanList', this.newList)
        this.newList.name = ''
        this.newList.listOrder = ''
      } else {
        return
      } 
    }
  },
  created() {
    this.$store.commit('setActiveProjectId', this.$route.params.id)
    this.$store.dispatch('fetchKanbanLists', this.$route.params.id)
    this.$store.dispatch('fetchKanbanTasks', this.$route.params.id)
  },
  destroyed() {
    this.$store.commit('setActiveProjectId', '')
    this.$store.commit('setProjectKanbanLists', [])
    this.$store.commit('setProjectKanbanTasks', [])
  }
}
</script>

<style>
.ghost {
  opacity: 0.5;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 300px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
</style>
