import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('./helpers/firebaseConfig.js')

Vue.use(Vuex)

fb.auth.onAuthStateChanged(user => {
    if (user) {
        store.commit('setCurrentUser', user)
        store.dispatch('fetchUserProfile')

        fb.usersCollection.doc(user.uid).onSnapshot(doc => {
            store.commit('setUserProfile', doc.data())
        })

        // Realtime updates from user projects collection
        fb.projectsCollection.where('uid', '==', user.uid).orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
            if(!querySnapshot.empty){
                let userProjectsArray = []

                querySnapshot.forEach(doc => {
                    let project = doc.data()
                    project.id = doc.id
                    userProjectsArray.push(project)
                })
                store.commit('setUserProjects', userProjectsArray)
            }
        })
    }
})

export const store = new Vuex.Store({
    state: {
        currentUser: null,
        userProfile: {},
        userProjects: []
    },
    actions: {
        clearData({ commit }) {
            commit('setCurrentUser', null)
            commit('setUserProfile', {})
            commit('setUserProjects', null)
        },
        fetchUserProfile({ commit, state }) {
            fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
                commit('setUserProfile', res.data())
            }).catch(err => {
                console.log(err)
            })
        }
    }, 
    mutations: {
        setCurrentUser(state, val) {
            state.currentUser = val
        },
        setUserProfile(state, val) {
            state.userProfile = val
        },
        setUserProjects(state, val) {
            state.userProjects = val
        }
    }
})