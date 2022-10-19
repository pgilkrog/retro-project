import { Scene } from 'phaser'

import thudMp3 from '@/phaser/first-game/assets/thud.mp3'
import heart from '@/phaser/first-game/assets/Heart.png'
import potionHealth from '@/phaser/first-game/assets/Potion-Health.png'

import tiles from '@/phaser/first-game/assets/Tiles.png'
import map1 from '@/phaser/first-game/assets/map1.json'

import mageJson from '@/phaser/first-game/assets/characters/mage-player/texture.json'
import magePNG from '@/phaser/first-game/assets/characters/mage-player/texture.png'

import rogueJson from '@/phaser/first-game/assets/characters/rogue-player/texture.json'
import roguePNG from '@/phaser/first-game/assets/characters/rogue-player/texture.png'

import skeletonJson from '@/phaser/first-game/assets/mobs/skeleton.json'
import skeletonPNG from '@/phaser/first-game/assets/mobs/skeletonImg.png'

import magicMissileJson from '@/phaser/first-game/assets/spells/magic-missile/texture.json'
import magicMissilePNG from '@/phaser/first-game/assets/spells/magic-missile/texture.png'

export default class Loader extends Scene {
  constructor() {
    super({ key: 'SelectCharacterScene' })
  }

  preload() {
    this.load.image('tiles', tiles)
    this.load.tilemapTiledJSON('map1', map1)

    this.load.atlas('mage-character', magePNG, mageJson)
    this.load.atlas('rogue-character', roguePNG, rogueJson)
    this.load.atlas('mob-skeleton', skeletonPNG, skeletonJson)

    this.load.atlas('magic-missile', magicMissilePNG, magicMissileJson)

    this.load.audio('thud', [thudMp3])
    this.load.image('heart', heart)
    this.load.image('potion-health', potionHealth)
  }

  create() {
    console.log("LOADER SCENE")
    this.scene.start('select-character')
  }
}
