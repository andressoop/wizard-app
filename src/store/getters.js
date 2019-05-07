import _ from 'lodash'

export default {
  isLoggedIn: state => !!state.currentUser,
  projectLabels: (state) => {
    let currentProject = _.find(state.userProjects, function(o) { return o.id == state.activeProjectId; })
    if(!currentProject || !currentProject.labelsForTasks) { return [] }
    return currentProject.labelsForTasks
  }
}