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
  projectNotes: (state) => {
    return state.projectNotes
  }
}