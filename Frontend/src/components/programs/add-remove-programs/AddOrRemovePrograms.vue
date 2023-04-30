<template lang="pug">
.add-or-remove-programs
  WindowFrame(:program="program" :isMoveable="true")
    .d-flex.p-2
      .d-flex.flex-column.pe-3
        button.btn.d-flex.flex-column.align-items-center(@click="changeState('removePrograms')"  :class="state === 'removePrograms' ? 'btn-active' : 'btn'")
          IconComponent(
            name="fa-computer"
            variant="dark"
            size="42"
          )
          p Remove Program
        button.d-flex.flex-column.align-items-center.mt-2(@click="changeState('addPrograms')" :class="state === 'addPrograms' ? 'btn-active' : 'btn'")
          IconComponent(
            name="fa-folder-plus"
            variant="dark"
            size="42"
          )
          p Add program
      .program-list.bg-white.p-4.bg-shadow-inner.d-flex.flex-column
        ProgramList(
          v-show="state === 'removePrograms'"
          title="Installed programs"
          :programList="installedPrograms"
          :selectedProgramId="selectedProgramId"
          v-on:changeSelectedProgram="changeSelectedProgram($event)"
        )
        ProgramList(
          v-show="state === 'addPrograms'"
          title="Not installed programs"
          :programList="notInstalledPrograms"
          :selectedProgramId="selectedProgramId"
          v-on:changeSelectedProgram="changeSelectedProgram($event)"
        )
    .row.p-2
      span(v-if="selectedProgram !== undefined") {{ selectedProgram.displayName }}
      .d-flex.justify-content-end
        button.btn(
          v-if="state === 'addPrograms'" 
          @click="installProgram()"
          :disabled="selectedProgramId === ''" 
        ) Install
        button.btn(
          v-else 
          @click="removeProgram()"
          :disabled="selectedProgramId === ''" 
        ) Remove
Loader(v-if="isInstalling === true" v-on:closeLoading="closeLoading()")
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { programsStore } from '@/stores/programsStore'
import { userStore } from '@/stores/userStore'
import type { IProgram } from '@/models/index'

import WindowFrame from '../../WindowFrame.vue'
import ProgramList from '@/components/programs/add-remove-programs/ProgramsList.vue'
import Loader from '@/components/Loading.vue'

export default defineComponent({
  name: 'addOrRemoveProgram',
  components: {
    WindowFrame,
    ProgramList,
    Loader
  },
  props: {
    program: Object
  },
  setup() {
    const programsstore = programsStore()
    const userstore = userStore()
    const state = ref('removePrograms')
    const isInstalling = ref(false)

    let selectedProgram: IProgram | undefined
    let selectedProgramId = ref("")

    const allPrograms = computed(() => programsstore.getPrograms)
    const notInstalledPrograms = computed(() => programsstore.getNotIntalledPrograms)
    const installedPrograms = computed(() => programsstore.getInstalledPrograms)

    const installProgram = () => {
      if (selectedProgram === undefined)
        return

      isInstalling.value = true
      let user = userstore.getUserData
      user.installedPrograms.push(selectedProgram.id)

      userstore.updateUser(user)
    }

    const removeProgram = () => {
      if (selectedProgram === undefined)
        return

      isInstalling.value = true
      let user = userstore.getUserData
      user.installedPrograms = user.installedPrograms.filter(p => p !== selectedProgram?.id)
      userstore.updateUser(user)
    }

    const updateUser = () => {
      let tempUser = userstore.getUserData
      userstore.updateUser(tempUser)
    }

    const changeState = (newState: string) => {
      state.value = newState
      selectedProgram = undefined
      selectedProgramId.value = ''
    }

    const changeSelectedProgram = (program: IProgram) => {
      if (program === undefined) return
      selectedProgram = program
      selectedProgramId.value = program.id
    }

    const closeLoading = () => {
      isInstalling.value = false
    }

    return {
      allPrograms,
      notInstalledPrograms,
      installedPrograms,
      state,
      selectedProgram,
      selectedProgramId,
      isInstalling,
      installProgram,
      removeProgram,
      updateUser,
      changeState,
      changeSelectedProgram,
      closeLoading
    }
  }
})
</script>

<style lang="sass" scoped>
.program-list
  width: 700px
.active-program 
  background-color: darkblue
  color: white
  .icon
    color: white !important
.program-item:hover
  background: lightgray
</style>