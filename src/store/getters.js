import _ from 'lodash'

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
    const listArray = _.orderBy(state.projectKanbanLists, ['listOrder'], ['asc']) 
    return listArray
  }
}