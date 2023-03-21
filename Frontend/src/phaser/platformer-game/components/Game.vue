<template lang="pug">
.position-absolute.game-wrapper
  Suspense
    PhaserContainer
</template>

<script lang="ts">
import PhaserContainer from "./PhaserContainer.vue"

export default {
    components: {
        PhaserContainer
    }
}

</script>