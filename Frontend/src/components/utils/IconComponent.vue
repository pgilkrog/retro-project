<template lang="pug">
i.icon(
  :class="[iconClass(), 'text-' + color + '-500', 'flex']" 
  :style="'font-size: ' + size + 'px !important; transform: rotate(' + rotate + 'deg);'"
)
</template>

<script setup lang="ts">
const {
  name,
  color = 'black',
  size = '24',
  rotate = '0',
} = defineProps<{
  name: string
  color?: string
  size?: string
  rotate?: string
}>()

const iconClass = () => {
  if (name === undefined) return 'fa fa-bug'

  if (name?.startsWith('bi-')) return 'bi ' + name
  else if (name?.startsWith('fa-')) return 'fa ' + name
  else return 'fa fa-bug'
}
</script>

<style scoped lang="sass">
.bi:before
  vertical-align: 0 !important
</style>
