const state = {
  sidebarCollapsed: false
}

const getters = {

}

const actions = {
  toggleSidebarCollapsed({ commit }, collapsed) {
    commit('setSidebarCollapsed', collapsed)
  }
}

const mutations = {
  setSidebarCollapsed(state, val) {
    state.sidebarCollapsed = val
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}