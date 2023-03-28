<template lang="pug">
i.icon(:class="iconClass(), 'text-' + variant" :style="'color: ' + color + '!important; font-size: ' + size + 'px !important; transform: rotate(' + rotate + 'deg);'")
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'iconComponent',
  props: {
    name: String,
    variant: {
      type: String,
      default: 'dark'
    },
    color: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: '24'
    },
    rotate: {
      type: [String, Number],
      default: '0'
    },
  },
  setup(props) {
    const iconClass = () => {
      if (props === undefined || props.name === undefined)
        return

      if (props.name?.startsWith('bi-'))
        return 'bi ' + props.name
      else if (props.name?.startsWith('fa-')) 
        return 'fa ' + props.name
      else
        return 'fa fa-bug'
    }

    return {
      iconClass
    }
  },
})
</script>

<style lang="sass" scoped>
</style>