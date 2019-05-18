import Vue from 'vue'
import firebase from 'firebase'
import Router from 'vue-router'
import Landing from './views/Landing'
import Projects from './views/Projects'
import Kanban from './views/Kanban'
import Login from './views/Login'
import Profile from './views/Profile'
import Notes from './views/Notes'
import Clients from './views/Clients'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/landing',
    redirect: '/'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/clients',
    name: 'Clients',
    component: Clients,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/project/notes/:id',
    name: 'Notes',
    component: Notes,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/project/:id',
    name: 'Project',
    component: Kanban,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '*',
    redirect: '/login'
  }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})


export default router;