<template lang="pug">
.window-frame-wrapper.st-border.bg-secondary.d-flex.flex-column.st-border.position-absolute(v-on:click="clickOnComponent()")
    header.top-bar.bg-primary.text-white.d-flex.justify-content-between.align-items-center.p-2()
        .font-weight-bold.pe-4 {{ title }}
        span
          button.bg-secondary.py-0.px-2.text-black.st-border _
          button.bg-secondary.py-0.px-2.text-black.st-border =
          button.bg-secondary.py-0.px-2.text-black.st-border(v-on:click="closeWindow") x
    .menu-container.d-flex.mx-2.my-1
      .me-2 File
      .mx-2 Edit 
      .mx-2 View
      .ms-2 Help
    .container.bg-secondary.p-1
        slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
  props: {
    title: String
  }
})

export default class WindowFrame extends Vue {
  title: string | undefined

  clickOnComponent() {
    console.log("CLicked: " + this.title)
  }

  closeWindow() {
    this.$emit('closeWindow')
  }
}
</script>
