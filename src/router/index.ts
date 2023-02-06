import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PingPong from '@/phaser/ping-pong/components/Game.vue'
import FlappyDisc from '@/phaser/flappy-disk/components/Game.vue'
import SpaceInvaders from '@/phaser/space-invaders/components/Game.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
    }
  ]
})

export default router