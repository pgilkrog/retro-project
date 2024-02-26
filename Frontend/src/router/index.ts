import { useAuthStore } from '@/stores/authStore'
import { userStore } from '@/stores/userStore'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach(async (to, from, next) => {
  const isAuthendicated = await checkAuthendication()
  const rolesToCheck = to.meta.roles as string[]

  if (!isAuthendicated && to.meta.requiresAuth === true) {
    next({ name: 'login' })
    return
  }

  if (to.name === 'admin' && rolesToCheck && !checkUserRole(rolesToCheck))
    return
 
  next()
})

const checkAuthendication = () => {
  const authstore = useAuthStore()
  return authstore.isLoggedIn
}

const checkedAuth = () => {
  const authstore = useAuthStore()
  return authstore.checkedAuth
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