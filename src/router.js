import Vue from 'vue'
import firebase from 'firebase'
import Router from 'vue-router'
import Landing from './views/Landing'
import Dashboard from './views/Dashboard'
import Kanban from './views/Kanban'
import Login from './views/Login'
import Profile from './views/Profile'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
  {
    path: '/',
    redirect: '/landing'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/landing',
    name: 'Landing',
    component: Landing
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
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/project/:id',
    name: 'project',
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