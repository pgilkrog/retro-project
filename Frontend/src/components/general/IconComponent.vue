<template lang="pug">
i.icon(:class="iconClass(), 'text-' + variant" :style="'color: ' + color + '!important;' + 'font-size: ' + size + 'px !important;'")
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'iconComponent',
  props: {
    name: String,
    variant: String,
    color: String,
    size: String
  },
  setup(props) {

    const iconClass = () => {
      if (props.name?.startsWith('bi-'))
        return 'bi ' + props.name
      else if (props.name?.startsWith('fa-')) 
        return 'fa ' + props.name
      else
        throw new Error('Invalid icon name')
    }

    return {
      iconClass
    }
  },
})
</script>

<style lang="sass" scoped>
</style>