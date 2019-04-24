export default {
  isLoggedIn: state => !!state.currentUser,
  getAllProjects(state) {
    return state.userProjects
  },
  getAllTasks(state) {
    return state.projectKanbanTasks
  },
  getListTasks: (state) => (listId) => {
    return state.projectKanbanTasks.filter(task => task.listID === listId)
  },
  getAllLists(state) {
    return state.projectKanbanLists
  }
}