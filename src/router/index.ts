import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PingPong from '@/phaser/ping-pong/components/Game.vue'
import FlappyDisc from '@/phaser/flappy-disk/components/Game.vue'

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
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   // component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router