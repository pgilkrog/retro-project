<template lang="pug">
div(id="containerId")
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'

export default class PhaserContainer extends Vue {
    containerId = 'game-container'
    game = require('@/phaser/game.js')
    gameInstance = this.game.launch(this.containerId)

    unmounted() {
        this.gameInstance!.destroy(false)
    }

}
</script>