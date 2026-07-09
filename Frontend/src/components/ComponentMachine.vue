<template>
  <Component
    v-for="program in programsstore.activePrograms"
    :key="program._id"
    v-memo="[program._id]"
    :is="programComponents[program.name] ?? ErrorComponent"
    :program="program"
  />
</template>

<script setup lang="ts">
import { programsStore } from '@/stores/programsStore'
import AddRemovePrograms from '@/components/programs/add-remove-programs/AddRemovePrograms.vue'
import CalculatorApp from '@/components/programs/calculator-app/CalculatorApp.vue'
import ChattieChat from '@/components/programs/chattie-chat/ChattieChat.vue'
import ErrorComponent from '@/components/ErrorComponent.vue'
import GameWorld from '@/components/programs/game-world/GameWorld.vue'
import MinesweeperGame from '@/components/programs/minesweeper-game/MinesweeperGame.vue'
import MyComputer from '@/components/programs/my-computer/MyComputer.vue'
import NetworkNeighborhood from '@/components/programs/network-neighborhood/NetworkNeighborhood.vue'
import PawDos from '@/components/programs/paw-dos/PawDos.vue'
import PawExplore from '@/components/programs/paw-explore/PawExplore.vue'
import PawPaint from '@/components/programs/paw-paint/PawPaint.vue'
import PawPlayer from '@/components/programs/paw-player/PawPlayer.vue'
import PawPoint from '@/components/programs/paw-point/PawPoint.vue'
import PcSettings from '@/components/programs/pc-settings/PcSettings.vue'

const programsstore = programsStore()

const programComponents: Record<string, Component> = {
  AddRemovePrograms: AddRemovePrograms as Component,
  CalculatorApp: CalculatorApp as Component,
  ChattieChat: ChattieChat as Component,
  GameWorld: GameWorld as Component,
  MinesweeperGame: MinesweeperGame as Component,
  MyComputer: MyComputer as Component,
  NetworkNeighborhood: NetworkNeighborhood as Component,
  PawDos: PawDos as Component,
  PawExplore: PawExplore as Component,
  PawPaint: PawPaint as Component,
  PawPlayer: PawPlayer as Component,
  PawPoint: PawPoint as Component,
  PcSettings: PcSettings as Component,
}
</script>
