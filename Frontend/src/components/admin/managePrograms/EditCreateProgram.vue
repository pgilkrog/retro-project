<template>
  <WindowFrame
    :program="manageProgramProgram"
    :is-moveable="true"
  >
    <div
      v-if="programInfo !== undefined"
      class="editcreateprogram flex flex-col p-4"
    >
      <InputComponent
        v-model="programInfo.name"
        label="Name"
        placeholder="name"
      />
      <InputComponent
        v-model="programInfo.displayName"
        label="Display name"
        placeholder="displayName"
      />
      <InputComponent
        v-model="programInfo.image"
        label="Image"
        placeholder="image"
      />
      <InputComponent
        v-model="programInfo.color"
        label="Color"
        placeholder="color"
      />
      <InputComponent
        v-model="programInfo.sortOrder"
        label="Sort Order"
        type="number"
      />
      <InputComponent
        v-model="programInfo.type"
        label="Type"
        placeholder="type"
      />
      <div class="flex mt-3 justify-center">
        <ButtonComponent
          text="Cancel"
          @clicked="() => emit('changeShowManageProgram', false)"
        />
        <ButtonComponent
          v-if="updateState === true"
          text="Update"
          @clicked="() => updateProgram()"
        />
        <ButtonComponent
          v-else
          text="Add Program"
          @clicked="() => addProgram()"
        />
      </div>
    </div>
  </WindowFrame>
</template>
<script setup lang="ts">
import type { IProgram } from '@/models'
import { programsStore } from '@/stores'

const { programToManage } = defineProps<{ updateState: boolean; programToManage: IProgram }>()

const emit = defineEmits<{
  changeShowManageProgram: [boolean]
}>()

const programsstore = programsStore()

const programInfo = ref<IProgram | undefined>()

const manageProgramProgram = {
  name: 'ManageProgram',
  displayName: 'Manage Program',
  color: 'warning',
  image: 'fa-pencil',
  isActive: true,
}

onMounted(() => {
  programInfo.value = { ...programToManage }
})

const addProgram = async () => {
  if (
    programInfo.value !== undefined &&
    programInfo.value.name !== '' &&
    programInfo.value.image !== '' &&
    programInfo.value.displayName !== ''
  ) {
    await programsstore.createProgram(programInfo.value)
    programInfo.value = undefined
  }
}

const updateProgram = async () => {
  if (programInfo.value !== undefined) {
    await programsstore.updateProgram(programInfo.value)
  }
}
</script>
