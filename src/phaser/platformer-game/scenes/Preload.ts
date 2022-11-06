import Phaser from 'phaser'

import WorldJson from '@/phaser/platformer-game/assets/crystal_world_map.json'
import WorldPNG1 from '@/phaser/platformer-game/assets/main_lev_build_1.png'
import WorldPNG2 from '@/phaser/platformer-game/assets/main_lev_build_2.png'

import PlayerPNG from '@/phaser/platformer-game/assets/player/move_sprite_1.png'

export default class Prelaod extends Phaser.Scene {
  constructor() {
    super('PreloadScene')
  }

  preload() {
    this.load.tilemapTiledJSON('map', WorldJson)
    this.load.image('tiles-1', WorldPNG1)
    this.load.image('tiles-2', WorldPNG2)

    this.load.spritesheet('player', PlayerPNG, {
      frameWidth: 32, frameHeight: 38, spacing: 32
    })
  }

  create() {
    this.scene.start('PlayScene')
  }
}