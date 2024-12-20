<template>
  <div class="flex h-screen justify-center items-center flex-col text-white">
    <IconComponent
      name="fa-power-off"
      color="light"
      size="200"
    />
    <h1 class="mt-4">Shutting down...</h1>
    <h4>Don't close down your browser</h4>
    <!-- div.progress //- div.progress-bar( //- role="progressbar" //- :aria-valuenow="progressValue" -->
    <!--  aria-valuemin="0" //- aria-valuemax="100" //- ) {{ progressValue }}% -->
  </div>
</template>

<script setup lang="ts">
// const progressValue = ref<number>(0)

// const startLoading = () => {
//   let interval = setInterval(() => {
//     if (progressValue.value < 100) {
//       progressValue.value += 1
//     } else {
//       clearInterval(interval)
//     }
//   }, 100)
// }
</script>
