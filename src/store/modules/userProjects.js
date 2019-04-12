import firebase from '../../helpers/firebaseConfig'

const state = {
  userProjects: []
}

const getters = {}

const actions = {
  fetchUserProjects({ commit, rootState }) {
    firebase.projectsCollection.where('uid', '==', rootState.currentUser.uid).orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
      if (!querySnapshot.empty) {
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
  clearUserProjects({ commit }) {
    commit('setUserProjects', [])
  },
}

const mutations = {
  setUserProjects(state, val) {
    state.userProjects = val
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}