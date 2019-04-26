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
          _.remove(userProjectsArray, function(i, index) {
            return [index] == change.oldIndex;
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
  fetchKanbanLists({ commit, state }, projectId) {
    firebase.projectsCollection.doc(projectId).collection('lists').orderBy('listOrder').onSnapshot(querySnapshot => {
      let kanbanListsArray = state.projectKanbanLists
      
      querySnapshot.docChanges().forEach(change => {
        let list = {}

        if (change.type === "added") {
          list = change.doc.data()
          list.id = change.doc.id
          kanbanListsArray.push(list)
        }
        if (change.type === "modified") {
          list = change.doc.data()
          list.id = change.doc.id
          _.remove(kanbanListsArray, function(i) {
            return i.id == list.id
          });
          kanbanListsArray.push(list)
        }
        if (change.type === "removed") {
          _.remove(kanbanListsArray, function(i, index) {
            return [index] == change.oldIndex
          });
        }
      })
      
      let orderedKanbanListsArray = _.orderBy(kanbanListsArray, ['listOrder'], ['asc']);
      commit('setProjectKanbanLists', orderedKanbanListsArray)        
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
  editKanbanListName({ commit, state }, editedList) {
    commit('updateKanbanListName', editedList)
    firebase.projectsCollection.doc(state.activeProjectId).collection('lists').doc(editedList.listId).update({
      name: editedList.name
    }).catch(err => {
      console.error("Error editing Kanban list name: ", err);
    })
  },
  editKanbanListOrder({ commit, state }, data) {
    let updatedList = []
    data.forEach((element, index) => {
      element.listOrder = index.toString()
      updatedList.push(element)
      firebase.projectsCollection.doc(state.activeProjectId).collection('lists').doc(element.id).update({ listOrder: element.listOrder })
    })
    commit('setProjectKanbanLists', updatedList)
  },
  fetchKanbanTasks({ commit, state }, projectId) {
    firebase.projectsCollection.doc(projectId).collection('tasks').orderBy('listID').orderBy('taskOrder').onSnapshot(querySnapshot => {
      let kanbanTasksArray = state.projectKanbanTasks

      querySnapshot.docChanges().forEach(change => {
          let task = {}

          if (change.type === "added") {
            task = change.doc.data()
            task.id = change.doc.id
            kanbanTasksArray.push(task)
          }
          if (change.type === "modified") {
            task = change.doc.data()
            task.id = change.doc.id
            _.remove(kanbanTasksArray, function(i) {
              return i.id == task.id
            });
            kanbanTasksArray.push(task)
          }
          if (change.type === "removed") {
            _.remove(kanbanTasksArray, function(i, index) {
              return [index] == change.oldIndex
            });
          }
      })
      
      let orderedKanbanTasksArray = _.orderBy(kanbanTasksArray, ['taskOrder'], ['asc']);
      commit('setProjectKanbanTasks', orderedKanbanTasksArray)        
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
  editTaskOrder({ commit, state }, {data, listId}) {
    let updatedtasksArray = state.projectKanbanTasks
    let batch = firebase.db.batch()

    data.forEach((element, index) => {
      element.taskOrder = index.toString()
      element.listID = listId.toString()
      _.remove(updatedtasksArray, function(i) {
        return i.id == element.id
      })
      updatedtasksArray.push(element)
      batch.update(firebase.projectsCollection.doc(state.activeProjectId).collection('tasks').doc(element.id), { taskOrder: element.taskOrder, listID: element.listID })
    })
    batch.commit()
    commit('setProjectKanbanTasks', updatedtasksArray)
  }
}