<template>
  <window-frame :program="program">
    <div class="bg-black text-white flex flex-col space-y-2 p-4 grow">
      <div class="bg-blue-800 p-2">
        <div class="border border-white p-1">
          <div class="border border-white p-4">
            <h1>
              <span class="text-green-400">Welcome to the game vault.</span>
              <br />
              <br />
              You are now entering the arcade vault of
              <span class="text-yellow-400">DOSBOX.</span>
              <br />
              Choose your destiny carefully, for each game holds its own mystery, challenge, and
              glory.
              <br />
              <br />
              Press
              <span class="text-red-600">ENTER</span>
              to begin your mission
            </h1>
          </div>
        </div>
      </div>
      <div
        v-for="(game, key) in disGames"
        :key
        :class="{ 'bg-white text-black animate-blink': activeInList === key }"
      >
        {{ key + 1 }}: {{ game.name }}
      </div>
    </div>
  </window-frame>
  <component :is="activeGame" />
</template>
<script setup lang="ts">
import { shallowRef } from 'vue'
import type { Component } from 'vue'
import Platformer from '@/phaser/first-game/Platformer.vue'
import Salvatore from '@/phaser/salvatore/SalvatoreGame.vue'
import TestStuff from '@/phaser/test-stuff/TestStuff.vue'
import SpaceInvaders from '@/phaser/space-invaders/SpaceInvaders.vue'
import PingPong from '@/phaser/ping-pong/PingPong.vue'
import ShooterPlatformer from '@/phaser/ShooterPlatformer/ShooterPlatformer.vue'
import Pyrotechnics from '@/phaser/pawered-pyrotechnics/Pawered-Pyrotechnics.vue'
import WindowFrame from '@/components/windowframe/WindowFrame.vue'
import type { IProgram } from '@/models'

const { program } = defineProps<{
  program: IProgram
}>()

const gameComponents: Record<string, Component> = {
  Platformer: Platformer as Component,
  Salvatore: Salvatore as Component,
  TestStuff: TestStuff as Component,
  SpaceInvaders: SpaceInvaders as Component,
  PingPong: PingPong as Component,
  ShooterPlatformer: ShooterPlatformer as Component,
  'Pawered-Pyrotechnics': Pyrotechnics as Component,
}

const disGames = Object.keys(gameComponents).map((key) => ({
  name: key,
  component: gameComponents[key],
}))

const activeGame = shallowRef<Component | null>(null)
const activeInList = ref<number>(0)

onMounted(() => {
  setActiveGame('')
})

const setActiveGame = (gameName: string) => {
  if (gameName in gameComponents) {
    activeGame.value = gameComponents[gameName]
    return
  }

  console.warn(`Unknown game: ${gameName}`)
}

addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
    activeInList.value = Math.max(0, activeInList.value - 1)
  } else if (event.key === 'ArrowDown') {
    activeInList.value = Math.min(disGames.length - 1, activeInList.value + 1)
  } else if (event.key === 'Enter') {
    const selectedGame = disGames[activeInList.value]
    setActiveGame(selectedGame.name)
  }
})
</script>
