const HomeView = () => import('../views/HomeView.vue')
const PingPong = () => import('@/phaser/ping-pong/PingPong.vue')
const FlappyDisc = () => import('@/phaser/flappy-disk/FlappyDisk.vue')
const SpaceInvaders = () => import('@/phaser/space-invaders/SpaceInvaders.vue')
const ShutDown = () => import('@/views/ShutDown.vue')
const StartingUp = () => import('@/views/StartingUp.vue')
const adminView = () => import('@/views/AdminView.vue')
const SalvatoreGame = () => import('@/phaser/salvatore/SalvatoreGame.vue')
const LoginView = () => import('@/views/LoginView.vue')
const TestStuff = () => import('@/phaser/test-stuff/TestStuff.vue')

export default [
  {
    path: '/',
    name: 'home',
    component: HomeView, 
    meta: {
      requiresAuth : true,
      roles: ['user', 'admin']
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView, 
    meta: {
      requiresAuth : false,
      roles: []
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
      requiresAuth: true,
      roles: ['user', 'admin']
    }
  },
  {
    path: '/flappydisk',
    name: 'flappydisk',
    component: FlappyDisc, 
    meta: {
      requiresAuth: true,
      roles: ['user', 'admin']
    }
  },
  {
    path: '/spaceinvaders',
    name: 'spaceinvaders',
    component: SpaceInvaders, 
    meta: {
      requiresAuth: true,
      roles: ['user', 'admin']
    }
  },
  {
    path: '/salvatore',
    name: 'platformer',
    component: SalvatoreGame, 
    meta: {
      requiresAuth: false,
      roles: ['user', 'admin']
    }
  },
  {
    path: '/teststuff',
    name: 'teststuff',
    component: TestStuff,
    meta: {
      requireAuth: false,
      roles: ['user', 'admin']
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: adminView, 
    meta: {
      requiresAuth : true,
      roles: ['admin']
    },
  }
]