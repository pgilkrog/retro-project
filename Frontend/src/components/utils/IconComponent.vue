<template lang="pug">
i.icon(
  :class="[iconClass(), 'text-' + color + '-500', 'flex']" 
  :style="'font-size: ' + size + 'px !important; transform: rotate(' + rotate + 'deg);'"
  v-bind="$attrs"
)
</template>

<script setup lang="ts">
const { 
  name, 
  color = 'black', 
  size = '24', 
  rotate = '0' 
} = defineProps({
  name: String,
  color: String,
  size: String,
  rotate: String,
})

const iconClass = () => {
  if (name === undefined)
    return 'fa fa-bug'

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