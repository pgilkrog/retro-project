<template lang="pug">
.add-or-remove-programs
  WindowFrame(
    :program="program" 
    :isMoveable="true" 
    :showMenu="false" 
    :variant="program.color" 
    :isNotProgram="false"
  )
    .d-flex.p-2
      .d-flex.flex-column.pe-3
        button.btn.d-flex.flex-column.align-items-center.w-100(@click="changeState('removePrograms')" :class="state === 'removePrograms' ? 'btn-active' : 'btn'")
          IconComponent(
            name="fa-computer"
            variant="dark"
            size="42"
          )
          p.mt-2 Remove Program
        button.d-flex.flex-column.align-items-center.mt-2.w-100(@click="changeState('addPrograms')" :class="state === 'addPrograms' ? 'btn-active' : 'btn'")
          IconComponent(
            name="fa-folder-plus"
            variant="dark"
            size="42"
          )
          p.mt-2 Add program
      .program-list.bg-grey.p-4.bg-shadow-inner.d-flex.flex-column
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
Loader(v-if="isInstalling === true" @closeLoading="closeLoading()")
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue'
import { programsStore } from '@/stores/programsStore'
import { userStore } from '@/stores/userStore'
import type { IProgram } from '@/models/index'

import ProgramList from '@/components/programs/add-remove-programs/ProgramsList.vue'
import Loader from '@/components/Loading.vue'

export default defineComponent({
  name: 'addOrRemoveProgram',
  components: {
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

    const allPrograms = computed(() => programsstore.allPrograms)
    const notInstalledPrograms = computed(() => programsstore.notInstalledPrograms)
    const installedPrograms = computed(() => programsstore.installedPrograms)

    onMounted(() => {
      console.log("GOT MOUNTED")
    })

    const installProgram = () => {
      if (selectedProgram === undefined)
        return

      isInstalling.value = true
      let user = userstore.userData

      if (user === undefined) return

      user.installedPrograms.push(selectedProgram.id)

      userstore.updateUser(user)
    }

    const removeProgram = () => {
      if (selectedProgram === undefined)
        return

      isInstalling.value = true
      let user = userstore.userData
      if (user === undefined) return
      user.installedPrograms = user.installedPrograms.filter(p => p !== selectedProgram?.id)
      userstore.updateUser(user)
    }

    const updateUser = () => {
      let tempUser = userstore.userData
      if (tempUser === undefined) return
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
  height: 400px
  overflow: auto
.active-program 
  background-color: darkblue
  color: white
  .icon
    color: white !important
.program-item:hover
  background: lightgray
</style>