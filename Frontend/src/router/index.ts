import { createRouter, createWebHistory } from 'vue-router'
const HomeView = () => import('../views/HomeView.vue')
const PingPong = () => import('@/phaser/ping-pong/PingPong.vue')
const FlappyDisc = () => import('@/phaser/flappy-disk/FlappyDisk.vue')
const SpaceInvaders = () => import('@/phaser/space-invaders/SpaceInvaders.vue')
const Platformer = () => import('@/phaser/first-game/Platformer.vue')
const ShutDownVue = () => import('@/views/ShutDown.vue')
const adminView = () => import('@/views/AdminView.vue')
const SalvatoreGame = () => import('@/phaser/salvatore/SalvatoreGame.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/shutdown',
      name: 'shutdown',
      component: ShutDownVue
    },
    {
      path: '/pingpong',
      name: 'pingpong',
      component: PingPong
    },
    {
      path: '/flappydisk',
      name: 'flappydisk',
      component: FlappyDisc
    },
    {
      path: '/spaceinvaders',
      name: 'spaceinvaders',
      component: SpaceInvaders
    },
    {
      path: '/platformer',
      name: 'platformer',
      component: Platformer
    },
    {
      path: '/salvatore',
      name: 'platformer',
      component: SalvatoreGame
    },
    {
      path: '/admin',
      name: 'admin',
      component: adminView
    }
  ]
})

export default router