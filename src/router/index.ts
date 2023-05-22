import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard/dashboard.vue'
import Signup from '../views/Signup/signup.vue'
import Login from '../views/Login/login.vue'
import store from '../store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: Dashboard
        }
      ],
      meta: { requiresAuth: true }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresAuth: false }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { requiresAuth } = to.meta
  if (requiresAuth) {
    const isLoggedIn = store.getters.isLoggedIn
    if (!isLoggedIn) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
