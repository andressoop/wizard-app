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
        userProjects: [],
        projectKanbanLists: [],
        projectKanbanTasks: [],
    },
    getters: {
        isLoggedIn: state => !!state.currentUser,
        getAllTasks(state) {
            return state.projectKanbanTasks
        },
        getListTasks: (state) => (listId) => {
            return state.projectKanbanTasks.filter(task => task.listID === listId)
        },
        getAllLists(state) {
            return state.projectKanbanLists
        }
    },
    actions: {
        clearData({ commit }) {
            commit('setCurrentUser', null)
            commit('setUserProfile', {})
            commit('setUserProjects', null)
            commit('projectKanbanLists', [])
            commit('projectKanbanTasks', [])
        },
        fetchUserProfile({ commit }, user) {
            firebase.usersCollection.doc(user.uid).get().then(res => {
                commit('setUserProfile', res.data())
            }).catch(err => {
                console.log(err)
            })
        },
        fetchProjectKanbanTasks({ commit }, projectId) {
            firebase.db.collection('projects/' + projectId + '/tasks')
                .orderBy('listID').orderBy('taskOrder')
                .onSnapshot(tasksSnapshot => {
                    let projectTasksArray = []
                    tasksSnapshot.forEach(subDoc => {
                        let task = subDoc.data()
                        task.id = subDoc.id
                        projectTasksArray.push(task)
                    })
                    commit('setProjectKanbanTasks', projectTasksArray)
          })
        },
        fetchProjectKanbanLists({ commit }, projectId){
            firebase.db.collection('projects/' + projectId + '/lists').orderBy('listOrder').onSnapshot(listsSnapshot => {
                let projectListsArray = []
                listsSnapshot.forEach(subDoc => {
                    let list = subDoc.data()
                    list.id = subDoc.id
                    projectListsArray.push(list)
                })
                commit('setProjectKanbanLists', projectListsArray)
            })
        },
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
        setProjectKanbanTasks(state, val) {
            state.projectKanbanTasks = val
        },
        setProjectKanbanLists(state, val) {
            state.projectKanbanLists = val
        }
    },
    
})