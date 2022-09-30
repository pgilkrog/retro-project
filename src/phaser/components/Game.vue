<template lang="pug">
.position-absolute
    PhaserContainer
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PhaserContainer from "./PhaserContainer.vue"

@Component({
    components: {
        PhaserContainer
    },
})

export default class Game extends Vue {

}

</script>