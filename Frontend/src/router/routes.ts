export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      requiresAuth: true,
      roles: ['user', 'admin'],
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      requiresAuth: false,
      roles: [],
    },
  },
  {
    path: '/startup',
    name: 'startup',
    component: () => import('@/views/StartingUp.vue'),
  },
  {
    path: '/shutdown',
    name: 'shutdown',
    component: () => import('@/views/ShutDown.vue'),
  },
  {
    path: '/pingpong',
    name: 'pingpong',
    component: () => import('@/phaser/ping-pong/PingPong.vue'),
    meta: {
      requiresAuth: true,
      roles: ['user', 'admin'],
    },
  },
  {
    path: '/flappydisk',
    name: 'flappydisk',
    component: () => import('@/phaser/flappy-disk/FlappyDisk.vue'),
    meta: {
      requiresAuth: true,
      roles: ['user', 'admin'],
    },
  },
  {
    path: '/spaceinvaders',
    name: 'spaceinvaders',
    component: () => import('@/phaser/space-invaders/SpaceInvaders.vue'),
    meta: {
      requiresAuth: true,
      roles: ['user', 'admin'],
    },
  },
  {
    path: '/salvatore',
    name: 'platformer',
    component: () => import('@/phaser/salvatore/SalvatoreGame.vue'),
    meta: {
      requiresAuth: false,
      roles: ['user', 'admin'],
    },
  },
  {
    path: '/teststuff',
    name: 'teststuff',
    component: () => import('@/phaser/test-stuff/TestStuff.vue'),
    meta: {
      requireAuth: false,
      roles: ['user', 'admin'],
    },
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/AdminView.vue'),
    meta: {
      requiresAuth: true,
      roles: ['admin'],
    },
  },
]
