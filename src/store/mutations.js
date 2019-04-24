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
  }
}