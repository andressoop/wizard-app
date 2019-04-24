import firebase from '@/helpers/firebaseConfig'
import _ from 'lodash'

export default {
  clearData({ commit }) {
    commit('setCurrentUser', null)
    commit('setUserProfile', {})
    commit('setUserProjects', [])
    commit('setProjectKanbanTasks', [])
    commit('setProjectKanbanLists', [])
  },
  fetchUserProfile({ commit }, user) {
    firebase.usersCollection.doc(user.uid).get().then(res => {
      commit('setUserProfile', res.data())
    })
  },
  fetchProjects({ commit, state }) {
    firebase.projectsCollection.where('uid', '==', state.currentUser.uid).orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
      let userProjectsArray = state.userProjects

      querySnapshot.docChanges().forEach(change => {
        let project = {}

        if (change.type === "added") {
          project = change.doc.data()
          project.id = change.doc.id
          userProjectsArray.push(project)
        }
        if (change.type === "modified") {
          project = change.doc.data()
          project.id = change.doc.id
          _.remove(userProjectsArray, function(i) {
            return i.id == project.id;
          });
          userProjectsArray.push(project)
        }
        if (change.type === "removed") {
          project = change.doc.data()
          project.id = change.doc.id
          _.remove(userProjectsArray, function(i) {
            return i.id == project.id;
          });
        }
      })

      let orderedProjectsArray = _.orderBy(userProjectsArray, ['createdOn'], ['desc']);
      commit('setUserProjects', orderedProjectsArray)
    })
  },
  createNewProject({state}, newProject) {
    firebase.projectsCollection.add({
      createdOn: new Date(),
      uid: state.currentUser.uid,
      name: newProject.name
    }).catch(err => {
      console.error("Error creating new project: ",err)
    })
  },
  deleteProject(context, projectId) {
    firebase.projectsCollection.doc(projectId).delete()
    .catch(err => {
      console.error("Error deleting project: ", err);
    })
  },
  fetchKanbanLists({ commit }, projectId) {
    firebase.projectsCollection.doc(projectId).collection('lists').orderBy('listOrder').onSnapshot(querySnapshot => {
      let listsArray = []
      querySnapshot.forEach(subDoc => {
        let list = subDoc.data()
        list.id = subDoc.id
        listsArray.push(list)
      })
      commit('setProjectKanbanLists', listsArray)        
    })
  },
  createNewKanbanList({ state }, newList) {
    firebase.projectsCollection.doc(state.activeProjectId).collection('lists').add({
      createdOn: new Date(),
      listOrder: newList.listOrder,
      name: newList.name
    }).catch(err => {
      console.error("Error creating new list: ", err)
    })
  },
  deleteKanbanList({ state }, listId) {
    firebase.projectsCollection.doc(state.activeProjectId).collection('lists').doc(listId).delete()
    .catch(err => {
      console.error("Error deleting Kanban list: ", err);
    })
  },
  updateKanbanListOrder({ state }, data) {
    data.forEach((element, index) => {
      firebase.projectsCollection.doc(state.activeProjectId).collection('lists').doc(element.id).update({ listOrder: index })
    })
  },
  editKanbanListName({ state }, editList) {
    firebase.projectsCollection.doc(state.activeProjectId).collection('lists').doc(editList.listId).update({
      name: editList.name
    }).catch(err => {
      console.error("Error editing Kanban list name: ", err);
    })
  },
  fetchKanbanTasks({ commit }, projectId) {
    firebase.projectsCollection.doc(projectId).collection('tasks').orderBy('listID').orderBy('taskOrder').onSnapshot(querySnapshot => {
      let tasksArray = []
      querySnapshot.forEach(subDoc => {
        let task = subDoc.data()
        task.id = subDoc.id
        tasksArray.push(task)
      })
      commit('setProjectKanbanTasks', tasksArray)        
    })
  },
  createNewTask({ state }, newTask) {
    firebase.projectsCollection.doc(state.activeProjectId).collection('tasks').add({
      createdOn: new Date(),
      listID: newTask.listId,
      taskOrder: newTask.taskOrder,
      name: newTask.name
    }).catch(err => {
      console.error("Error creating new task: ", err)
    });
  },
  changeTaskListId({ state }, updateTask) {
    firebase.projectsCollection.doc(state.activeProjectId).collection('tasks').doc(updateTask.taskId).update({
      listID: updateTask.targetListId
    })
  },
  updateTaskOrder({ state }, data) {
    data.forEach((element, index) => {
      firebase.projectsCollection.doc(state.activeProjectId).collection('tasks').doc(element.id).update({ taskOrder: index })
    })
  }
}