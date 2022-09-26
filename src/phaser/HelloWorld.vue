<!-- <template lang="pug">
.hello
    .flex(@click="initializeGame")
        a(href="#").btn Initialize
    ion-phaser(v-bind:game.prop="game" v-bind:initialize.prop="initialize")
</template>

<script lang="ts">
import Phaser from 'phaser'
import Vue from 'vue';

export default class HelloWorld extends Phaser.Scene {
    initialize = false

    // constructor () {
    //     super({ key: 'PlayScene' })
    // } 
    
    game = {
    //     width: "100%",
    //     height: "100%",
    //     type: Phaser.AUTO,
    //     scene: {
    //         init() {
                
    //             Phaser.cameras.main.setBackgroundColor("#24252A")
    //         },
    //         create() {
    //             helloWorld = this.add.text(
    //                 cameras.main.centerX,
    //                 phaser.cameras.main.centerY,
    //                 "Hello World",
    //                 { font: "40px Arial", fill: "#ffffff" }
    //             )
    //             this.helloWorld.setOrigin(0.5)
    //         },
    //         update() {
    //             this.helloWorld.angle += 1
    //         }
    //     }
    }

    initializeGame() {
        this.initialize = true
    }
}
</script> -->