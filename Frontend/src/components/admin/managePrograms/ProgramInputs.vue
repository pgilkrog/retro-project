<template lang="pug">
label(for="name") Full name:
input.bg-shadow-inner(
  type="text" 
  :value="name" 
  @input="$emit('update:name', $event.target.value)" 
  id="name"
)

label(for="displayName") Display name:
input.bg-shadow-inner(
  type="text" 
  :value="displayName" 
  @input="$emit('update:displayName', $event.target.value)" 
  id="displayName"
)

label(for="image") Image(icon):
input.bg-shadow-inner(
  type="text" 
  :value="image" 
  @input="$emit('update:image', $event.target.value)" 
  id="image"
)

label(for="color") Color(variant):
input.bg-shadow-inner(
  type="text" 
  :value="color" 
  @input="$emit('update:color', $event.target.value)" 
  id="color"
)

label(for="sortOrder") Sort order:
input.bg-shadow-inner(
  type="text" 
  :value="sortOrder" 
  @input="$emit('update:sortOrder', $event.target.value)" 
  id="sortOrder"
)
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'program-inputs',
  props: {
    name: {
      type: String,
    },
    displayName: {
      type: String,
    },
    image: {
      type: String
    },
    color: {
      type: String
    },
    sortOrder: {
      type: Number
    }
  },
  setup() {
    return {
      
    }
  }
})
</script>

<style lang="sass" scoped>
</style>
