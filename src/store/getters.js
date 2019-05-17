import _ from 'lodash'

export default {
  isLoggedIn: state => !!state.currentUser,
  hasActiveProject: state => !!state.activeProjectId,
  projectLabels: (state) => {
    const currentProject = _.find(state.userProjects, function(o) { return o.id == state.activeProjectId })
    if(!currentProject || !currentProject.labelsForTasks) { return [] }
    return currentProject.labelsForTasks
  },
  activeProjectName: (state) => {
    let currentProject = _.find(state.userProjects, function(o) { return o.id == state.activeProjectId })
    if(!currentProject || !currentProject.name) {return ""}
    return currentProject.name
  },
  projectLists: (state) => {
    return _.orderBy(state.projectKanbanLists, function (o) { return new Number(o.listOrder); }, ['asc'])
  },
  projectTasks: (state) => (listId) => {
    const allTasks = _.orderBy(state.projectKanbanTasks, function (o) { return new Number(o.taskOrder); }, ['asc'])
    return allTasks.filter(task => task.listID == listId)
  },
  projectNotes: (state) => {
    if(!state.projectNotes.id) { 
      return null
    } else {
      return state.projectNotes
    }    
  },
  clientList: (state) => {
    if(!state.clientList.id) { 
      return null
    } else {
      return state.clientList
    }    
  }
}