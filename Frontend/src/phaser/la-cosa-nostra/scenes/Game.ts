import Phaser, { GameObjects, Physics, Scene } from 'phaser'
import Player from './Player'

export interface IConfig {
  mapOffset: number,
  width: number,
  height: number,
  zoomFactor: number
} 

export default class Game extends Scene {
  private config: IConfig
  private player: Player
  private target: number = 0
  private reticle: Phaser.Physics.Arcade.Sprite

  constructor(config: IConfig) {
    super({ key: 'Game' })
    this.config = config
  }

  create() {
    this.reticle = this.physics.add.sprite(400, 300, 'ball')
    this.setupFollowupCameraOn()
    this.player = new Player(this, 0, 0, 'player-walk')
    this.cameras.main.startFollow(this.player, true)
    // const map = this.make.tilemap({ key: 'map' })
    // const tilesets = map.addTilesetImage('walls', 'tiles', 16, 16)
    // map.createLayer('Walls', tilesets!)

    // const objectLayer = map.getObjectLayer('Objects')
    // objectLayer!.objects.forEach(objData => {
    //   const { x = 0, y = 0, name = "", width = 0, height = 0 } = objData

    //   switch (name) {
    //     case 'player_spawn': {
    //       this.player = new Player(this, x, y, 'player-walk')
    //       this.cameras.main.startFollow(this.player, true)
    //       break
    //     }
    //   }
    // })
 
    this.input.on('pointermove', (pointer: any) => {
      let rotation = Phaser.Math.Angle.BetweenPoints(pointer, this.player);
      this.player.setRotation(rotation - Math.PI / 2)
      console.log(rotation)
      if (this.input.mouse && this.input.mouse.locked)
      {
          this.reticle.x += pointer.movementX;
          this.reticle.y += pointer.movementY;
      }
    });

    this.input.on('pointerdown', () => {
      this.input.mouse?.requestPointerLock();
    })
  }

  update = (t: number, dt: number) => {
    this.player.update(dt)

    this.player.rotation = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.reticle.x, this.reticle.y);

    // Camera follows player ( can be set in create )
    this.cameras.main.startFollow(this.player);

    // Makes reticle move with player
    this.reticle.setVelocityX(this.player.body!.velocity.x)
    this.reticle.setAccelerationY(this.player.body!.velocity.y)

  }

  destroy() {

  }

  setupFollowupCameraOn() {
  }
}