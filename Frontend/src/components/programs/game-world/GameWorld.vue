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
      <div class="grid grid-cols-6 gap-4">
        <div class="col-span-2">
          <div
            v-for="(game, key) in mappedGames"
            :key
            :class="{ 'bg-white text-black animate-blink': activeInList === key }"
          >
            {{ key + 1 }}: {{ game.name }}
          </div>
        </div>
        <div class="bg-teal-400 text-black p-2 col-span-4">
          <div class="border border-black p-1">
            <div class="border border-black p-4">
              <div>
                <image-component
                  id="game-icon"
                  source="https://win98icons.alexmeub.com/icons/png/cd_drive-0.png"
                />
              </div>
              <h1>{{ selectedGame.name }}fdg</h1>
              <p>{{ selectedGame.description }}</p>
            </div>
          </div>
        </div>
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
import ImageComponent from '@/components/utils/ImageComponent.vue'

const { program } = defineProps<{
  program: IProgram
}>()

interface GameComponent {
  name: string
  description: string
  component: Component
}

const gameComponents: Record<string, GameComponent> = {
  'Ping Pong': {
    name: 'Ping Pong',
    description: 'A classic paddle game',
    component: PingPong as Component,
  },
  'Space Invaders': {
    name: 'Space Invaders',
    description: 'A classic arcade game',
    component: SpaceInvaders as Component,
  },
  Platformer: {
    name: 'Platformer',
    description: 'A classic platformer game',
    component: Platformer as Component,
  },
  Salvatore: {
    name: 'Salvatore',
    description: 'An exciting adventure game',
    component: Salvatore as Component,
  },
  TestStuff: {
    name: 'Test Stuff',
    description: 'A simple test game',
    component: TestStuff as Component,
  },
  'Shooter Platformer': {
    name: 'Shooter Platformer',
    description: 'A blend of shooting and platforming',
    component: ShooterPlatformer as Component,
  },
  'Pawered Pyrotechnics': {
    name: 'Pawered Pyrotechnics',
    description: 'A fireworks display game',
    component: Pyrotechnics as Component,
  },
}

const mappedGames = Object.keys(gameComponents).map((key) => ({
  name: key,
  description: gameComponents[key].description,
  component: gameComponents[key],
}))

const activeGame = shallowRef<Component | null>(null)
const selectedGame = ref<GameComponent>(mappedGames[0])
const activeInList = ref<number>(0)

onMounted(() => {
  setActiveGame('')
})

const setActiveGame = (gameName: string) => {
  if (gameName in gameComponents) {
    activeGame.value = gameComponents[gameName].component
    return
  }

  console.warn(`Unknown game: ${gameName}`)
}

addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
    activeInList.value = Math.max(0, activeInList.value - 1)
    selectedGame.value = mappedGames[activeInList.value]
  } else if (event.key === 'ArrowDown') {
    activeInList.value = Math.min(mappedGames.length - 1, activeInList.value + 1)
    selectedGame.value = mappedGames[activeInList.value]
  } else if (event.key === 'Enter') {
    selectedGame.value = mappedGames[activeInList.value]
    setActiveGame(selectedGame.value.name)
  }
})
</script>
