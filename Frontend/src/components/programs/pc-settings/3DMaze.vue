<template lang="pug">
.maze-container 
  canvas(ref="canvas")
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref, toRaw, shallowRef } from 'vue'
  
const canvas: Ref<HTMLCanvasElement | undefined> = ref();
const context: Ref<CanvasRenderingContext2D | undefined> = ref();
const width = ref<number>(0)
const height = ref<number>(0)
const rows = ref<number>(0)
const columns = ref<number>(0)
const blockSize = ref<number>(0)
const maze = shallowRef<boolean[][]>([])

onMounted(() => {
  initializeMaze()
  animate()
})

const initializeMaze = () => {
  if (canvas.value === undefined) return

  context.value = canvas.value.getContext('2d') || undefined
  if (context.value === undefined) return

  // Set up maze dimensions and variables
  width.value = canvas.value.width ?? 0;
  height.value = canvas.value.height ?? 0;
  blockSize.value = 20;
  columns.value = (width.value as number) / blockSize.value;
  rows.value = (height.value as number) / blockSize.value;

  // Create the maze data structure
  maze.value = Array.from({ length: rows.value }, () =>
    Array.from({ length: columns.value }, () => Math.random() > 0.6)
  );

  // Draw the maze
  for (let row = 0; row < rows.value; row++) {
    for (let col = 0; col < columns.value; col++) {
      console.log("kdf", maze.value)
      const x = col * blockSize.value;
      const y = row * blockSize.value;
      context.value.fillStyle = maze.value[row][col]? 'black' : 'white';
      context.value.fillRect(x, y, blockSize.value, blockSize.value);
    }
  }
}

const animate = () => {
  const animationSpeed = 0.05;
  let cameraX = 0;

  // Update the camera position
  cameraX += animationSpeed;

  // Clear the canvas
  context.value?.clearRect(0, 0, width.value, height.value);

// Draw the maze with shifted camera position
  for (let row = 0; row < rows.value; row++) {
    for (let col = 0; col < columns.value; col++) {
      const x = col * blockSize.value;
      const y = row * blockSize.value;

      // Adjust the x position based on the camera position
      const shiftedX = x - cameraX;

      context.value!.fillStyle = maze.value[row][col] ? 'black' : 'white';
      context.value!.fillRect(shiftedX, y, blockSize.value, blockSize.value);
    }
  }

  // Request the next animation frame
  requestAnimationFrame(animate);
}
</script>

<style lang="sass" scoped>
.maze-container 
  display: flex
  justify-content: center
  align-items: center
  height: 100vh

canvas 
  border: 1px solid #ccc
</style>