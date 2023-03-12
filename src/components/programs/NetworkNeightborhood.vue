<template lang="pug">
WindowFrame(:program="program" :isMoveable="true")
  Suspense
    template(#default)
      div.d-flex(v-for="item in items" :key="item.id") {{ item.name }}
    template(#fallback)
      div.d-flex.p-4 Loading items...
</template>

<script lang="ts">
import WindowFrame from '../WindowFrame.vue'
import { defineComponent, ref } from 'vue'

const fetchItems = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
      ])
    }, 3000)
  })
}

export default defineComponent({
  components: {
    WindowFrame
  },
  props: {
    program: Object
  },
  setup() {
    const items = ref([] as any)

    fetchItems().then((data) => {
      items.value = data
    })

    return {
      items,
    }
  },
})
</script>