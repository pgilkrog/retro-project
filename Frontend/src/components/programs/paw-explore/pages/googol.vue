<template>
  <div class="h-full w-full flex flex-col items-center justify-center p-4 bg-white">
    <p class="text-5xl">
      <span class="text-red-500">G</span>
      <span class="text-green-500">oo</span>
      <span class="text-red-500">g</span>
      <span class="text-green-500">o</span>
      <span class="text-blue-500">l</span>
    </p>
    <form>
      <div class="mt-4">
        <InputComponent
          v-model="text"
          placeholder="search text goes here..."
        />
      </div>
      <div class="flex mt-2">
        <ButtonComponent
          text="Search"
          class="mr-2"
        />
        <ButtonComponent text="Feeling lucky" />
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
const text = ref<string>('')
</script>
