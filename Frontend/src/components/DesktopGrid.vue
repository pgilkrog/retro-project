<template lang="pug">
.desktop-container(class="flex h-full justify-start py-4")
  .shortcuts-container(v-if="allPrograms" class="grid grid-cols-9 grid-rows-12 ")
    div(v-for="(program, index) in list"
        draggable="true"
        @dragstart="startDrag(index)"
        @dragend="endDrag($event)"
        class="flex items-center justify-center")
      slot(
        v-bind:listItem="program"
        name="listItem" 
        v-if="program !== undefined" 
        :id="index"
      )
      div(v-else :id="index" class="desktop-item w-full h-full bg-gray-50/10"
        draggable="true")
</template>
<script setup lang="ts">
const { list, allPrograms } = defineProps<{ list: [], allPrograms: any }>()

let dragStartIndex: number | null = null;

const startDrag = (index: number) => {
  dragStartIndex = index;
};

const endDrag = (event: any) => {
  if (dragStartIndex === null) return

  const target = event.target as HTMLElement; // Get the dragged element
  const parent = target.parentNode as HTMLElement; // Get the parent container

  // Find the element under the cursor (potential drop target)
  let dropTarget = document.elementFromPoint(event.clientX, event.clientY);
  let hasClass = dropTarget?.classList.contains('desktop-item')

  if (!hasClass) {
    hasClass = dropTarget?.parentElement?.classList.contains('desktop-item')
    if (dropTarget?.parentElement !== undefined) dropTarget = dropTarget?.parentElement
  }

  if (dropTarget && hasClass && dropTarget !== target) {
    const dropIndex = +dropTarget.id

    const test = list[dragStartIndex]
    const test2 = list[dropIndex]

    list[dragStartIndex] = test2
    list[dropIndex] = test

    dragStartIndex = null; // Reset drag state
  }
};
</script>