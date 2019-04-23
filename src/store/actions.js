import firebase from '@/helpers/firebaseConfig'

export default {
  clearData({ commit }) {
    commit('setCurrentUser', null)
    commit('setUserProfile', {})
    commit('setUserProjects', [])
    commit('setProjectKanbanTasks', [])
    commit('setProjectKanbanLists', [])
  },
  fetchUserProfile({ commit, state }) {
    firebase.usersCollection.doc(state.currentUser.uid).get().then(res => {
      commit('setUserProfile', res.data())
    })
  },
  fetchProjects({ commit, state }) {
    firebase.projectsCollection.where('uid', '==', state.currentUser.uid).orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
      if(!querySnapshot.empty){
          let userProjectsArray = []

          querySnapshot.forEach(doc => {
              let project = doc.data()
              project.id = doc.id
              userProjectsArray.push(project)
          })
          commit('setUserProjects', userProjectsArray)
      } else {
          commit('setUserProjects', [])
      }
    })
  },
  fetchProjectKanbanTasks({ commit }, projectId) {
    firebase.db.collection('projects/' + projectId + '/tasks')
      .orderBy('listID').orderBy('taskOrder')
      .onSnapshot(tasksSnapshot => {
        if((!tasksSnapshot.empty)){
          let projectTasksArray = []
          tasksSnapshot.forEach(subDoc => {
            let task = subDoc.data()
            task.id = subDoc.id
            projectTasksArray.push(task)
          })
          commit('setProjectKanbanTasks', projectTasksArray)
        } else {
          commit('setProjectKanbanTasks', [])
        }        
      })
  },
  fetchProjectKanbanLists({ commit }, projectId) {
    firebase.db.collection('projects/' + projectId + '/lists').orderBy('listOrder').onSnapshot(listsSnapshot => {
      if(!listsSnapshot.empty) {
        let projectListsArray = []
        listsSnapshot.forEach(subDoc => {
          let list = subDoc.data()
          list.id = subDoc.id
          projectListsArray.push(list)
        })
        commit('setProjectKanbanLists', projectListsArray)
      } else {
        commit('setProjectKanbanLists', [])
      }      
    })
  },
}