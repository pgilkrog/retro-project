<template lang="pug">
i.icon(
  :class="[iconClass(), 'text-' + variant]" 
  :style="'color: ' + color + '!important; font-size: ' + size + 'px !important; transform: rotate(' + rotate + 'deg);'"
)
</template>

<script setup lang="ts">
const { name, variant = 'black', color, size = '24', rotate = '0' } = defineProps({
  name: String,
  variant: String,
  color: String,
  size: String,
  rotate: String,
})

const iconClass = () => {
  if (name === undefined)
    return

  if (name?.startsWith('bi-'))
    return 'bi ' + name
  else if (name?.startsWith('fa-')) 
    return 'fa ' + name
  else
    return 'fa fa-bug'
}
</script>

<style lang="sass" scoped>
.bi:before
  vertical-align: 0 !important
</style>