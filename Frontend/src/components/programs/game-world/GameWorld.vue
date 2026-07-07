<template>
  <component :is="activeGame" />
</template>
<script setup lang="ts">
import Platformer from '@/phaser/first-game/Platformer.vue'
import Salvatore from '@/phaser/salvatore/SalvatoreGame.vue'
import TestStuff from '@/phaser/test-stuff/TestStuff.vue'
import LaCosaNostra from '@/phaser/la-cosa-nostra/LaCosaNostraGame.vue'
import Game from '@/phaser/space-invaders/SpaceInvaders.vue'
import PingPong from '@/phaser/ping-pong/PingPong.vue'
import Platformer2 from '@/phaser/ShooterPlatformer/ShooterPlatformer.vue'
import Pyrotechnics from '@/phaser/pawered-pyrotechnics/Pawered-Pyrotechnics.vue'

const activeGame = ref(Salvatore)

onMounted(() => {
  console.log('GameWorld mounted')
})

const setActiveGame = (gameName: string) => {
  switch (gameName) {
    case 'Platformer':
      activeGame.value = Platformer
      break
    case 'Salvatore':
      activeGame.value = Salvatore
      break
    case 'TestStuff':
      activeGame.value = TestStuff
      break
    case 'LaCosaNostra':
      activeGame.value = LaCosaNostra
      break
    case 'SpaceInvaders':
      activeGame.value = Game
      break
    case 'PingPong':
      activeGame.value = PingPong
      break
    case 'ShooterPlatformer':
      activeGame.value = Platformer2
      break
    case 'Pawered-Pyrotechnics':
      activeGame.value = Pyrotechnics
      break
    default:
      console.warn(`Unknown game: ${gameName}`)
  }
}
</script>
