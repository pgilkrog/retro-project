import { useAuthStore } from '@/stores/authStore'
import { userStore } from '@/stores/userStore'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach(async (to, from, next) => {
  const isAuthendicated = checkAuthendication()
  const rolesToCheck = to.meta.roles as string[]
  const userstore = userStore()

  if (userstore.userData == undefined) {
    await userstore.getUserById()
  }

  if (isAuthendicated === false && to.meta.requiresAuth === true) {
    next({ name: 'login' })
    return
  }

  if (rolesToCheck.length > 0 && checkUserRole(rolesToCheck) === false) {
    return
  }

  next()
})

const checkAuthendication = () => {
  const authstore = useAuthStore()
  return authstore.isLoggedIn
}

const checkUserRole = (roles: string[]) => {
  const userstore = userStore()
  const userType = userstore.userData?.type

  if (typeof userType === 'undefined') {
    return false
  }

  return roles.includes(userType)
}

export default router
