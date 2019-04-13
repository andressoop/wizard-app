import Vue from 'vue'
import Vuex from 'vuex'
import firebase from './helpers/firebaseConfig'
import moment from 'moment'

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
        userProjects: [],
        SelectedProjectTasks: [],
    },
    getters: {
        isLoggedIn: state => !!state.currentUser,
        getAllTasks(state) {
            let allTasks = state.SelectedProjectTasks;
            allTasks.forEach( task => {
                if (!task.createdOn) { task.createdOn = '-' } else {
                    let date = task.createdOn.toDate()
                    task.createdOn = moment(date).fromNow()
                }                
            })
            return allTasks
        }
    },
    actions: {
        clearData({ commit }) {
            commit('setCurrentUser', null)
            commit('setUserProfile', {})
            commit('setUserProjects', null)
        },
        fetchUserProfile({ commit }, user) {
            firebase.usersCollection.doc(user.uid).get().then(res => {
                commit('setUserProfile', res.data())
            }).catch(err => {
                console.log(err)
            })
        },
        fetchSelectedProjectTasks({ commit }, projectId) {
            firebase.db.collection('projects/' + projectId + '/tasks').onSnapshot(tasksSnapshot => {
                let projectTasksArray = []
                tasksSnapshot.forEach((subDoc) => {
                    let task = subDoc.data()
                    task.id = subDoc.id
                    projectTasksArray.push(task)
                    console.log(subDoc.data());
                })
                commit('setSelectedProjectTasks', projectTasksArray)
          })
        },
        toggleSidebarCollapsed({ commit }, collapsed) {
            commit('setSidebarCollapsed', collapsed)
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
        },
        setSelectedProjectTasks(state, val) {
            state.SelectedProjectTasks = val
        }
    },
    
})