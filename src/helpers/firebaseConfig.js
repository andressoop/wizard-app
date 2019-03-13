import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
    apiKey: 'AIzaSyA2u-JcH_bFcXkvDq4eruRctwvV4nrbiO0',
    authDomain: 'wizard-app-678c1.firebaseapp.com',
    databaseURL: 'https://wizard-app-678c1.firebaseio.com',
    projectId: 'wizard-app-678c1',
    storageBucket: 'wizard-app-678c1.appspot.com',
    messagingSenderId: '966026594810'
}
firebase.initializeApp(config)

// firebase utils
const googleProvider = new firebase.auth.GoogleAuthProvider()
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// firebase collections
const usersCollection = db.collection('users')
const projectsCollection = db.collection('projects')

export {
    db,
    auth,
    currentUser,
    googleProvider,
    usersCollection,
    projectsCollection
}