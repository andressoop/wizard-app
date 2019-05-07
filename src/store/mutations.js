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
  setActiveProjectId(state, val) {
    state.activeProjectId = val
  },
  setProjectKanbanTasks(state, val) {
    state.projectKanbanTasks = val
  },
  setProjectKanbanLists(state, val) {
    state.projectKanbanLists = val
  },
  updateKanbanListName(state, editedList) {
    state.projectKanbanLists[editedList.index].name = editedList.name
  },
  updateKanbanListOrder(state, updatedList) {
    state.projectKanbanLists[updatedList.listOrder].listOrder = updatedList.index
  },
  updateKanbanTaskName(state, updatedTask) {
    state.projectKanbanTasks[updatedTask.index].name = updatedTask.name
  },
  updateKanbanTaskDescription(state, updatedTask) {
    state.projectKanbanTasks[updatedTask.index].description = updatedTask.description
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
    state.projectKanbanTasks[updatedTask.index].labels = updatedTask.labels
  },
}