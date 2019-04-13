import Vue from 'vue'
import Vuex from 'vuex'
import firebase from './helpers/firebaseConfig'

Vue.use(Vuex)

firebase.auth.onAuthStateChanged(user => {
    if (user) {
        store.commit('setCurrentUser', user)

        firebase.usersCollection.doc(user.uid).onSnapshot(doc => {
            store.commit('setUserProfile', doc.data())
        })

        // Realtime updates from user projects collection
        firebase.projectsCollection.where('uid', '==', user.uid).orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
            if(!querySnapshot.empty){
                let userProjectsArray = []

                querySnapshot.forEach(doc => {
                    let project = doc.data()
                    project.id = doc.id
                    userProjectsArray.push(project)
                })
                store.commit('setUserProjects', userProjectsArray)
            } else {
                store.commit('setUserProjects', [])
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
    getters: {
        isLoggedin: state => !!state.currentUser
    },
    actions: {
        clearData({ commit }) {
            commit('setCurrentUser', null)
            commit('setUserProfile', {})
            commit('setUserProjects', null)
        },
        fetchUserProfile({ commit, state }) {
            firebase.usersCollection.doc(state.currentUser.uid).get().then(res => {
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