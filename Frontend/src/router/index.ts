import { authStore } from '@/stores/authStore'
import { userStore } from '@/stores/userStore'
import { createRouter, createWebHistory } from 'vue-router'
const HomeView = () => import('../views/HomeView.vue')
const PingPong = () => import('@/phaser/ping-pong/PingPong.vue')
const FlappyDisc = () => import('@/phaser/flappy-disk/FlappyDisk.vue')
const SpaceInvaders = () => import('@/phaser/space-invaders/SpaceInvaders.vue')
const Platformer = () => import('@/phaser/first-game/Platformer.vue')
const ShutDown = () => import('@/views/ShutDown.vue')
const StartingUp = () => import('@/views/StartingUp.vue')
const adminView = () => import('@/views/AdminView.vue')
const SalvatoreGame = () => import('@/phaser/salvatore/SalvatoreGame.vue')
const Maze = () => import('@/components/programs/pc-settings/3DMaze.vue')
const LoginView = () => import('@/views/LoginView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView, 
      meta: {
        requiresAuth : true,
        role: ['user', 'admin']
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView, 
      meta: {
        requiresAuth : false,
        role: []
      }
    },
    {
      path: '/startup',
      name: 'startup',
      component: StartingUp
    },
    {
      path: '/shutdown',
      name: 'shutdown',
      component: ShutDown
    },
    {
      path: '/pingpong',
      name: 'pingpong',
      component: PingPong, 
      meta: {
        requiresAuth : true,
        role: ['user', 'admin']
      }
    },
    {
      path: '/flappydisk',
      name: 'flappydisk',
      component: FlappyDisc, 
      meta: {
        requiresAuth : true,
        role: ['user', 'admin']
      }
    },
    {
      path: '/spaceinvaders',
      name: 'spaceinvaders',
      component: SpaceInvaders, 
      meta: {
        requiresAuth : true,
        role: ['user', 'admin']
      }
    },
    {
      path: '/platformer',
      name: 'platformer',
      component: Platformer, 
      meta: {
        requiresAuth : true,
        role: ['user', 'admin']
      }
    },
    {
      path: '/salvatore',
      name: 'platformer',
      component: SalvatoreGame, 
      meta: {
        requiresAuth : true,
        role: ['user', 'admin']
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: adminView, 
      meta: {
        requiresAuth : true,
        role: ['admin']
      }
    },
    {
      path: '/maze',
      name: 'maze',
      component: Maze, 
      meta: {
        requiresAuth : true,
        role: ['user', 'admin']
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const isAuthendicated = await checkAuthendication()

  if (!isAuthendicated && to.meta.requiresAuth === true) next({ name: 'login' })
  else if (to.name === 'admin' && checkUserRole('admin')) next()
  else next()
})

const checkAuthendication = async () => {
  const authstore = await authStore()
  return authstore.isLoggedIn
}

const checkUserRole = (role: string) => {
  const userstore = userStore()
  return userstore.userData?.type === role ?? false
}

export default router