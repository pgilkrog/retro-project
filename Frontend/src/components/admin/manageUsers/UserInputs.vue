<template lang="pug">
label(for="firstName") Firstname:
input.bg-shadow-inner(
  type="text" 
  :value="firstName" 
  @input="$emit('update:firstName', $event.target.value)" 
  id="firstName"
)

label(for="lastName") Lastname:
input.bg-shadow-inner(
  type="text" 
  :value="lastName" 
  @input="$emit('update:lastName', $event.target.value)" 
  id="lastName"
)

label(for="email") Email:
input.bg-shadow-inner(
  type="text" 
  :value="email" 
  @input="$emit('update:email', $event.target.value)" 
  id="email"
)

label(for="type") Type:
input.bg-shadow-inner(
  type="text" 
  :value="type" 
  @input="$emit('update:type', $event.target.value)" 
  id="type"
)

//- template(v-if="isntalledPrograms !== undefined")
//-   label(for="isntalledPrograms") Sort order:
//-   input.bg-shadow-inner(
//-     type="text" 
//-     :value="isntalledPrograms" 
//-     @input="$emit('update:isntalledPrograms', $event.target.value)" 
//-     id="isntalledPrograms"
//-   )
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'program-inputs',
  props: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String
    },
    type: {
      type: String
    },
    installedPrograms: {
      type: Array
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
