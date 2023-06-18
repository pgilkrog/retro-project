<template lang="pug">
Component(
  v-for="(program, index) in activePrograms"
  v-on:closeWindow="closeWindow(program.name)"
  :key="index"
  :id="program.name"
  :is="program.name"
  :program="program"
)
</template>

<script setup lang="ts">
import { defineComponent, computed } from 'vue'
import { programsStore } from '@/stores/programsStore'

import ManagePrograms from './managePrograms/ManagePrograms.vue'
import ManageUsers from './manageUsers/ManageUsers.vue'

const programsstore = programsStore()

const activePrograms = computed(() => programsstore.activePrograms)
</script>

<style lang="sass" scoped>
</style>