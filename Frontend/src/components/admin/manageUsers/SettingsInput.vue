<template lang="pug">
label(for="backgroundColour") Background colour:
input.bg-shadow-inner(
  type="text" 
  :value="backgroundColour" 
  @input="$emit('update:backgroundColour', $event.target.value)" 
  id="backgroundColour"
)

label(for="backgroundImage") Background image:
input.bg-shadow-inner(
  type="text" 
  :value="backgroundImage" 
  @input="$emit('update:backgroundImage', $event.target.value)" 
  id="backgroundImage"
)

label(for="useBackground") Use backround:
input.bg-shadow-inner(
  type="text" 
  :value="useBackground" 
  @input="$emit('update:useBackground', $event.target.value)" 
  id="useBackground"
  disabled
)

label(for="theme") Theme:
input.bg-shadow-inner(
  type="text" 
  :value="theme" 
  @input="$emit('update:theme', $event.target.value)" 
  id="theme"
)

</template>

<script setup lang="ts"> 
const { backgroundColour, backgroundImage, useBackground, theme } = defineProps({
  backgroundColour: {
    type: String,
  },
  backgroundImage: {
    type: String,
  },
  useBackground: {
    type: Boolean
  },
  theme: {
    type: String
  }
})
</script>

<style lang="sass" scoped>
</style>