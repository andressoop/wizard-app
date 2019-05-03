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
  updateKanbanTaskDueDate(state, updatedTask) {
    state.projectKanbanTasks[updatedTask.index].dueDate = updatedTask.dueDate
  }
}