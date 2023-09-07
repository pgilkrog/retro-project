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

label(for="type") Type:
input.bg-shadow-inner(
  type="text" 
  :value="type" 
  @input="$emit('update:type', $event.target.value)" 
  id="type"
)
</template>

<script setup lang="ts"> 
const { name, displayName, image, color, sortOrder, type } = defineProps({
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
  },
  type: {
    type: String
  }
})
</script> 