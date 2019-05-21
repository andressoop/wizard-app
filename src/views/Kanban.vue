<template>
  <div class="container-fluid pl-5 mt-4">

    <LoadingSpinner v-if="!loaded"></LoadingSpinner>

    <div v-else>
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
          <KanbanList :listIndex="index" :listName="list.name" :listId="list.id" @showModal="showModal" />
        </div>

        <div slot="footer"> 
          <div class="card mr-5 mb-5">
            <div class="card-header" @click="newList.inputActive = true">
              <h5 class="card-title text-muted" v-if="newList.inputActive === false">Add new list</h5>
              <input type="text" class="form-control" placeholder="Insert list name"
                v-if="newList.inputActive === true" 
                v-model.trim="newList.name" 
                v-focus="true"
                maxlength="20"
                @keydown.tab.prevent="createList()"
                @keyup.enter="createList()"
                @blur="createList()"
                @keyup.esc="newList.name = ''; newList.inputActive = false"
              >
            </div>
          </div>        
        </div>

      </draggable>
          
      <sweet-modal ref="modal" blocking @close="closeModal()">
        <EditTaskModal :openTask="openTask" ref="closeModal"></EditTaskModal>
      </sweet-modal>
    </div>

  </div>
</template>

<script>
import { SweetModal } from 'sweet-modal-vue'
import KanbanList from '../components/KanbanList.vue'
import Draggable from 'vuedraggable'
import EditTaskModal from '@/components/EditTaskModal'
import LoadingSpinner from '../components/ui/LoadingSpinner'

export default {
  name: 'Kanban',
  data() {
    return {
      loaded: false,
      openTask: {},
      newList: {
        inputActive: false,
        name: '',
        listOrder: '',
      }
    }
  },
  components: {
    KanbanList,
    Draggable,
    SweetModal,
    EditTaskModal,
    LoadingSpinner
  },
  computed: {
    projectLists: {
      get() {
        return this.$store.getters.projectLists
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
        this.newList.inputActive = false
      } 
    },
    showModal({listTask, listTaskIndex}) {
      this.openTask = listTask
      this.openTask.index = listTaskIndex
      this.$refs.modal.open()
    },
    closeModal() {
     this.$refs.closeModal.closeModal()
   }
  },
  beforeCreate() {
    var that = this
    var ready = false

    function checkReadiness() {
      if (ready) {
        return
      }
      try {
        if(query) {
          that.loaded = true
          ready = true
        } else {
          throw 'Not loaded'
        }
      } catch(e) {
        e
      }
      if (ready) {
        clearInterval(interval)
      }
    }    
    var query = this.$store.state.projectKanbanTasks
    var interval = setInterval(checkReadiness, 500)
  },
  created() {
    this.$store.commit('setActiveProjectId', this.$route.params.id)
    this.$store.dispatch('fetchKanbanLists', this.$route.params.id)
    this.$store.dispatch('fetchKanbanTasks', this.$route.params.id)
  },
  destroyed() {
    this.$store.commit('setProjectKanbanLists', [])
    this.$store.commit('setProjectKanbanTasks', [])
  }
}
</script>

<style scoped>
.container-fluid {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}

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

.card-header {
  cursor: pointer;
}

</style>
