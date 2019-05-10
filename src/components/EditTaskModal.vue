<template>
  <form class="text-left">
    <div class="form-row">
      <div class="form-group col-md-12">
        <h3 class="modal-h3" v-if="task.inputField !== 'editName'" @click="task.inputField = 'editName'; task.data = openTask">{{ openTask.name }}</h3>
        <input type="text" class="form-control" id="taskName" 
          placeholder="Task name" 
          v-if="task.inputField === 'editName'"
          v-model.trim="task.data.name"
          v-focus="true"
          @keyup.enter="editTaskName()"
          @keyup.esc="task.data = openTask; task.inputField = null"
          @blur="editTaskName()">
          <p class="text-muted small"># {{ openTask.id }}</p>
      </div>
    </div>
    <div class="form-group">
      <label for="taskDescription">Description</label>
      <textarea class="form-control" id="taskDescription" rows="3" 
        v-model="openTask.description" 
        @click="task.inputField = 'editDescription'; task.data = openTask"
        @blur="editTaskDescription()"
      ></textarea>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="createdOn">Created on</label>
        <input type="text" class="date-field form-control text-muted" id="createdOn" disabled v-model="createdOn">
      </div>
      <div class="form-group col-md-6">
        <label for="dueDate">Due date</label>
        <datepicker name="dueDate" input-class="date-field date-input text-muted"
          placeholder="no deadline" 
          format="dd.MM.yyyy"
          monday-first 
          bootstrap-styling
          clear-button
          clear-button-icon="far fa-trash-alt"
          :value="dueDate"
          @selected="editDueDate"
        ></datepicker>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="difficulty">Difficulty</label>
        <div id="difficulty" class="input-group">
          <div class="custom-control custom-radio custom-control-inline">
            <input type="radio" id="difficulty1" name="difficulty" class="custom-control-input" value="1" v-model="taskDifficulty">
            <label class="custom-control-label" for="difficulty1">1</label>
          </div>
          <div class="custom-control custom-radio custom-control-inline">
            <input type="radio" id="difficulty2" name="difficulty" class="custom-control-input" value="2" v-model="taskDifficulty">
            <label class="custom-control-label" for="difficulty2">2</label>
          </div>
          <div class="custom-control custom-radio custom-control-inline">
            <input type="radio" id="difficulty3" name="difficulty" class="custom-control-input" value="3" v-model="taskDifficulty">
            <label class="custom-control-label" for="difficulty3">3</label>
          </div>
          <div class="custom-control custom-radio custom-control-inline">
            <input type="radio" id="difficulty4" name="difficulty" class="custom-control-input" value="4" v-model="taskDifficulty">
            <label class="custom-control-label" for="difficulty4">4</label>
          </div>
          <div class="custom-control custom-radio custom-control-inline">
            <input type="radio" id="difficulty5" name="difficulty" class="custom-control-input" value="5" v-model="taskDifficulty">
            <label class="custom-control-label" for="difficulty5">5</label>
          </div>
          <div>
            <i class="far fa-trash-alt" @click="taskDifficulty = '0'"></i>           
          </div>
        </div>
      </div>
      <div class="form-group col-md-6">
        <label for="duration">Duration</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">minutes</div>
          </div>
          <input type="text" class="form-control" id="duration" 
            v-on:keypress="isNumber"
            v-model.trim="openTask.duration"
            @click="task.inputField = 'editDuration'; task.data = openTask"
            @blur="editTaskDuration()"
          >
          <div class="input-group-append" @click="deleteTaskDuration()">
            <div class="input-group-text"><i class="far fa-trash-alt"></i></div>            
          </div>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-12">
        <label for="taskLabels">Labels</label>
        <multiselect 
          v-model="taskLabels" 
          tag-placeholder="Add this as new tag" 
          placeholder="Search or add a tag" 
          label="name" 
          track-by="code" 
          :options="projectLabels" 
          :multiple="true" 
          :taggable="true" 
          @tag="addLabel"
        ></multiselect>
      </div>
    </div>
    <hr>
    <div class="form-row">
      <div class="form-group">
        <label for="taskTodo">Todo</label>
      </div>
    </div>
    <div class="form-row d-flex flex-row">
      <div class="d-flex justify-content-start col-md-12">
        <input type="text" name="add-todo" id="add-todo" class="form-control" placeholder="Add new todo" v-model.trim="newTodo" @keyup.enter="createTodoItem">
      </div>
    </div>
    <div class="form-row d-flex flex-row todo-list">
      <div class="d-flex flex-column bg-light col-md-12">
        <draggable
          class="drag-area"
          v-model="openTask.todo"
          group="todo"
          @change="changeTodoList"
          animation=200
          ghostClass="ghost"
          handle=".draggable-item" 
        >        
          <div class="input-group todo-item" v-for="(todo, index) in openTask.todo" v-bind:key="index">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fa fa-grip-vertical todo-handle draggable-item"></i>
                <input type="checkbox" class="todo-checkbox" v-model="todo.checked" @click="changeTodoList">
              </div>
            </div>          
            <input type="text" class="form-control text-muted" :class="[{'line-through' : todo.checked}]" disabled v-model="todo.name">
            <div class="input-group-append">
              <div class="input-group-text" @click="deleteTodoItem(index)"><i class="far fa-trash-alt"></i></div>
            </div>
          </div>
        </draggable>

      </div>
    </div>
    
      <!-- <button type="submit" class="btn btn-primary mr-2"><i class="fas fa-save"></i> Save</button>
      <button type="submit" class="btn btn-outline-warning mr-2"><i class="fas fa-archive"></i> Archive</button>
      <button type="submit" class="btn btn-outline-danger mr-2"><i class="fas fa-trash-alt"></i> Delete</button>
      <button type="submit" class="btn btn-outline-secondary mr-2"><i class="fas fa-window-close"></i> Cancel</button> -->
    
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import Draggable from 'vuedraggable'
import Multiselect from 'vue-multiselect'
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'

export default {
  name: 'EditTaskModal',
  props: [
    'openTask'
  ],
  components: {
    Datepicker,
    Multiselect,
    Draggable
  },
  data() {
    return {
      newTodo: '',
      task: {
        inputField: null,
        data: {}
      }
    }
  },
  computed: {
    ...mapGetters(['projectLabels']),
    taskDifficulty: {
      get() {
        return this.openTask.difficulty
      },
      set(data) {
        this.openTask.difficulty = data
        this.$store.dispatch('editDifficultyOnTask', this.openTask)
      }
    },
    taskLabels: {
      get() {
        return this.openTask.labels
      }, 
      set(data) {
        this.openTask.labels = data 
        this.$store.dispatch('editLabelsOnTask', this.openTask)
      }
    },
    createdOn() {
      const val = this.openTask.createdOn
      if (!val) { return '-' }
      let date = val.toDate()
      return moment(date).format("DD.MM.YYYY - HH:mm")
    },
    dueDate() {
        const val = this.openTask.dueDate
        if (!val) { return }
        let date
        if (val instanceof Date) {
          date = val
        } else {
          date = val.toDate()
        }
        let year = moment(date).format("YYYY")
        let month = parseInt( moment(date).format("M") ) - 1
        let day = parseInt( moment(date).format("D") )
        return new Date(year, month,  day)
    }
  },
  methods: {
    addLabel (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.$store.dispatch('addNewTaskLabel', tag)

      this.openTask.labels.push(tag)
      this.$store.dispatch('editLabelsOnTask', this.openTask)
    },
    editTaskName() {
      if (this.task.data.name.length !== 0) {
        this.$store.dispatch('editTaskName', this.task.data)
        this.task.inputField = null
      } else {
        return
      }
    },
    editTaskDescription() {
      if (this.task.data.description) {
        this.$store.dispatch('editTaskDescription', this.task.data)
      } else {
        return
      }
    },
    editTaskDuration() {
      if (this.task.data.duration) {
        this.$store.dispatch('editTaskDuration', this.task.data)
      } else {
        return
      }
    },
    deleteTaskDuration() {
      let data = this.openTask
      data.duration = null
      this.$store.dispatch('editTaskDuration', data)
    },
    editDueDate(data) {
      let newDate = null
      if(data) { 
        newDate = new Date(data) 
      }
      this.task.inputField = 'editDueDate'
      this.task.data = this.openTask
      this.task.data.dueDate = newDate
      this.$store.dispatch('editTaskDueDate', this.task.data)
    },
    createTodoItem() {
      if(this.newTodo == '') { return }
      this.task.data = this.openTask      
      this.task.data.todo.push( {checked: false, name: this.newTodo} )
      this.$store.dispatch('editTaskTodos', this.task.data)
      this.newTodo = ''
    },
    changeTodoList() {
      this.task.data = this.openTask
      this.$store.dispatch('editTaskTodos', this.task.data)
    },
    deleteTodoItem(todoIndex) {
      this.task.data = this.openTask
      this.task.data.todo.splice(todoIndex, 1)
      this.$store.dispatch('editTaskTodos', this.task.data)
    },
    isNumber: function(evt) {
      evt = (evt) ? evt : window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true;
      }
    }
  },
  filters: {
    formatDate(val) {
      if (!val) { return '-' }
      let date
      if (val instanceof Date) {
          date = val
        } else {
          date = val.toDate()
      }
      return moment(date).format("DD.MM.YYYY - HH:mm")
    }
  }
}
</script>

<style>
@import '../../node_modules/vue-multiselect/dist/vue-multiselect.min.css';
.modal-h3, .date-input {
  cursor: pointer;
}

.date-field {
  border: 0;
  background-color: #fff !important;
  padding: 0;
}

.vdp-datepicker__clear-button > .input-group-text {
  background-color: #fff;
  border: 0;
}

.todo-item {
  margin-top: 5px;
}

.todo-handle {
  cursor: move;
}

.todo-checkbox {
  margin-left: 10px;
}

.line-through {
  text-decoration: line-through;
}

.ghost {
  opacity: 0.5;
}
</style>
