import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PingPong from '@/phaser/ping-pong/PingPong.vue'
import FlappyDisc from '@/phaser/flappy-disk/FlappyDisk.vue'
import SpaceInvaders from '@/phaser/space-invaders/SpaceInvaders.vue'
import Platformer from '@/phaser/first-game/Platformer.vue'
import ShutDownVue from '@/views/ShutDown.vue'

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
    }
  ]
})

export default router