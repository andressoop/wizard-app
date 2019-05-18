import _ from 'lodash'

export default {
  setCurrentUser(state, val) {
    state.currentUser = val
  },
  setUserProfile(state, val) {
    state.userProfile = val
  },
  setUserProjects(state, val) {
    state.userProjects = val
  },
  setProjectNotes(state, val) {
    state.projectNotes = val
  },
  setClientList(state, val) {
    state.clientList = val
  },
  setActiveProjectId(state, val) {
    state.activeProjectId = val
  },
  setProjectKanbanTasks(state, val) {
    state.projectKanbanTasks = val
  },
  setProjectKanbanLists(state, val) {
    state.projectKanbanLists = val
  },
  updateProjectName(state, editedProject) {
    state.userProjects[editedProject.index].name = editedProject.name
  },
  updateKanbanListName(state, editedList) {
    state.projectKanbanLists[editedList.index].name = editedList.name
  },
  updateKanbanListOrder(state, updatedList) {
    state.projectKanbanLists[updatedList.listOrder].listOrder = updatedList.index
  },
  updateKanbanTaskName(state, updatedTask) {
    const taskIndex = _.findIndex(state.projectKanbanTasks, function(o) { return o.id == updatedTask.id; })
    state.projectKanbanTasks[taskIndex].name = updatedTask.name
  },
  updateKanbanTaskDescription(state, updatedTask) {
    const taskIndex = _.findIndex(state.projectKanbanTasks, function(o) { return o.id == updatedTask.id; })
    state.projectKanbanTasks[taskIndex].description = updatedTask.description
  },
  updateKanbanTaskduration(state, updatedTask) {
    const taskIndex = _.findIndex(state.projectKanbanTasks, function(o) { return o.id == updatedTask.id; })
    state.projectKanbanTasks[taskIndex].duration = updatedTask.duration
  },
  updateKanbanTaskDifficulty(state, updatedTask) {
    const taskIndex = _.findIndex(state.projectKanbanTasks, function(o) { return o.id == updatedTask.id; })
    state.projectKanbanTasks[taskIndex].difficulty = updatedTask.difficulty
  },
  updateKanbanTaskLabelsList(state, newLabel) {
    const projectIndex = _.findIndex(state.userProjects, function(o) { return o.id == state.activeProjectId; });
    const projectToUpdate = state.userProjects[projectIndex]
    if(!projectToUpdate.labelsForTasks) { 
      projectToUpdate.labelsForTasks = [ {name: newLabel.name, code: newLabel.code} ] 
    } 
    projectToUpdate.labelsForTasks.push(newLabel)
  },
  updateKanbanTaskLabels(state, updatedTask) {
    const taskIndex = _.findIndex(state.projectKanbanTasks, function(o) { return o.id == updatedTask.id; })
    state.projectKanbanTasks[taskIndex].labels = updatedTask.labels
  },
  updateTaskTodos(state, updatedTask) {
    const taskIndex = _.findIndex(state.projectKanbanTasks, function(o) { return o.id == updatedTask.id; })
    state.projectKanbanTasks[taskIndex].todo = updatedTask.todo
  }
}