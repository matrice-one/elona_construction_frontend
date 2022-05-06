import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import Prospecting from '../views/Prospecting.vue'
import DataFetching from '../views/DataFetching.vue'
import TableauDeBord from '../views/TableauDeBord.vue'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  {
    path: '/log-in',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/prospecting',
    name: 'Prospecting',
    component: Prospecting,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/data-fetching',
    name: 'DataFetching',
    component: DataFetching,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/tableau-de-bord',
    name: 'TableauDeBord',
    component: TableauDeBord,
    meta: {
      requireLogin: true
    }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next({ name: 'LogIn', query: { to: to.path } });
  } else {
    next()
  }
})

export default router