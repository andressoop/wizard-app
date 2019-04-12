import firebase from '../../helpers/firebaseConfig'

const state = {
  currentUser: null,
  userProfile: {}
}

const getters = {
  
}

const actions = {
  fetchCurrentUser({ commit }) {
    firebase.auth
      .onAuthStateChanged(user => {
        console.log(user)
        if (user) {
          commit('setCurrentUser', user)
        }
      })
  },
  fetchUserProfile({ commit, state }) {
    firebase.usersCollection.doc(state.currentUser.uid).get().then(res => {
      commit('setUserProfile', res.data())
    }).catch(err => {
      console.log(err)
    })
  },
  clearUserData({ commit }) {
    commit('setCurrentUser', null)
    commit('setUserProfile', {})
  }
}

const mutations = {
  setCurrentUser(state, user) {
    state.currentUser = user
  },
  setUserProfile(state, val) {
    state.userProfile = val
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}