<template>
  <div class="desktop-grid flex h-full w-full justify-start py-4">
    <div class="grid grid-cols-9 grid-rows-12 w-full">
      <div
        v-for="(program, index) in list"
        :key="index"
        class="flex items-center justify-center"
        draggable="true"
        @dragstart="startDrag(index)"
        @dragend="endDrag($event)"
      >
        <slot
          v-if="program !== undefined && program.program !== undefined"
          :id="index"
          name="listItem"
          class="flex-grow"
          :list-item="program.program"
        />
        <div
          v-else
          :id="index.toString()"
          class="flex-grow desktop-item w-full h-full"
          draggable="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IInstalledProgram } from '@/models'
import { programsStore } from '@/stores'

const { list } = defineProps<{ list: IInstalledProgram[] }>()

const programsstore = programsStore()
let dragStartIndex: number | null = null

const startDrag = (index: number) => {
  dragStartIndex = index
}

const endDrag = async (event: DragEvent) => {
  if (dragStartIndex == undefined) {
    return
  }

  const target: EventTarget | null = event.target // Get the dragged element

  // Find the element under the cursor (potential drop target)
  let dropTarget = document.elementFromPoint(event.clientX, event.clientY)
  let hasClass = dropTarget?.classList.contains('desktop-item')

  if (hasClass === false) {
    hasClass = dropTarget?.parentElement?.classList.contains('desktop-item')

    if (dropTarget?.parentElement != undefined) {
      dropTarget = dropTarget.parentElement
    }
  }

  if (dropTarget != undefined && hasClass === true && dropTarget !== target) {
    const dropIndex = +dropTarget.id

    const item1 = list[dragStartIndex]
    const item2 = list[dropIndex]

    await programsstore.changeInstalledProgramGridPosition({
      program: item2,
      gridPosition: dragStartIndex,
    })
    await programsstore.changeInstalledProgramGridPosition({
      program: item1,
      gridPosition: dropIndex,
    })

    dragStartIndex = null // Reset drag state
  }
}
</script>
