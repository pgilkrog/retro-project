<template lang="pug">
.body(class="h-full w-full flex items-center justify-center p-4 bg-white")
  BaseInput(v-model="text")
  Btn(text="go")
</template>
<script setup lang="ts">
import { ref } from 'vue'
const text = ref('text')
</script>