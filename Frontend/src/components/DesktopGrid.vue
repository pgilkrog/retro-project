<template lang="pug">
.desktop-container(class="flex h-full w-full justify-start py-4")
  .shortcuts-container(v-if="allPrograms" class="grid grid-cols-9 grid-rows-12 w-full")
    div(v-for="(program, index) in list"
        draggable="true"
        @dragstart="startDrag(index)"
        @dragend="endDrag($event)"
        class="flex items-center justify-center"
      )
      slot(
        v-if="program !== undefined && program.program !== undefined" 
        v-bind:listItem="program.program"
        name="listItem" 
        :id="index"
        class="flex-grow"
      )
      .desktop-item(
        v-else 
        :id="index" 
        class="flex-grow desktop-item w-full h-full"
        draggable="true"
      )
</template>
<script setup lang="ts">
import type { IProgram } from '@/models'
import { programsStore } from '@/stores/programsStore'
const programsstore = programsStore()

const { list, allPrograms } = defineProps<{ list: []; allPrograms: IProgram[] }>()

let dragStartIndex: number | null = null

const emit = defineEmits<{
  gridPositionChanged: [object: object]
}>()

const startDrag = (index: number) => {
  dragStartIndex = index
}

const endDrag = (event: DragEvent) => {
  if (dragStartIndex === null) return

  const target: EventTarget | null = event.target // Get the dragged element

  // Find the element under the cursor (potential drop target)
  let dropTarget = document.elementFromPoint(event.clientX, event.clientY)
  let hasClass = dropTarget?.classList.contains('desktop-item')

  if (!hasClass) {
    hasClass = dropTarget?.parentElement?.classList.contains('desktop-item')
    if (dropTarget?.parentElement !== undefined) dropTarget = dropTarget?.parentElement
  }

  if (dropTarget && hasClass && dropTarget !== target) {
    const dropIndex = +dropTarget.id

    const item1 = list[dragStartIndex]
    const item2 = list[dropIndex]

    list[dragStartIndex] = item2
    list[dropIndex] = item1

    emit('gridPositionChanged', {
      item: item1,
      gridPosition: dropIndex,
    })

    if (item2 !== undefined) {
      emit('gridPositionChanged', {
        item: item2,
        gridPosition: dragStartIndex,
      })
    }

    dragStartIndex = null // Reset drag state
  }
}
</script>
