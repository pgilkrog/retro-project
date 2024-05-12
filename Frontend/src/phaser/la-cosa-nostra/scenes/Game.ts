import Phaser, { GameObjects, Physics, Scene } from 'phaser'
import Player from './Player'
import Bullets from '../Bullets'

export interface IConfig {
  mapOffset: number,
  width: number,
  height: number,
  zoomFactor: number
} 

export default class Game extends Scene {
  private config: IConfig
  private player: Player
  private reticle: Phaser.Physics.Arcade.Sprite
  private bullets: Bullets

  constructor(config: IConfig) {
    super({ key: 'Game' })
    this.config = config
  }

  create() {
    this.reticle = this.physics.add.sprite(0, -100, 'ball')
    this.reticle.setScale(0.2)
    this.reticle.setDepth(10)
    this.setupFollowupCameraOn()

    this.bullets = new Bullets(this)
    
    const map = this.make.tilemap({ key: 'testMap' })
    const walls_tiles = map.addTilesetImage('walls', 'walls', 32, 32)
    const floor_tiles = map.addTilesetImage('floors', 'floors', 32, 32)
    const collide_tiles = map.addTilesetImage('colliderImg', 'collider', 32, 32)
    const collideLayer = map.createLayer('Colliders', collide_tiles!)
    collideLayer!.setCollisionByProperty({ collides: true }) 
    map.createLayer('Floors', floor_tiles!)
    map.createLayer('Walls', walls_tiles!)


    const objectLayer = map.getObjectLayer('Objects')
    objectLayer!.objects.forEach(objData => {
      const { x = 0, y = 0, name = "", width = 0, height = 0 } = objData

      switch (name) {
        case 'player_spawn': {
          this.player = new Player(this, x, y)
          this.cameras.main.startFollow(this.player, true)
          break
        }
        
        case 'door': {
          const door = this.add.sprite(x, y, 'doorImg')
          door.body?.gameObject.setImmovable(true)
          this.physics.add.existing(door)
          // door.body!.setImmovable(true)
          door.body
          this.physics.add.collider(this.player, door, () => {
            door.destroy()
          });
          break
        }
      }
    })
 
    this.input.on('pointermove', (pointer: any) => {
      let rotation = Phaser.Math.Angle.BetweenPoints(pointer, this.player);
      this.player.setRotation(rotation - Math.PI / 2)

      if (this.input.mouse && this.input.mouse.locked)
      {
          this.reticle.x += pointer.movementX;
          this.reticle.y += pointer.movementY;
      }
    })

    this.input.on('pointerdown', () => {
      this.input.mouse?.requestPointerLock();

      if (this.game.input.mouse?.locked) {
        let vector = new Phaser.Math.Vector2( this.reticle.x - this.player.x, this.reticle.y - this.player.y)
        vector.setLength(600)
        this.bullets.fireBullet(this.player.x, this.player.y, vector)
      }
    })

    
    this.physics.add.collider(this.player, collideLayer!)
  }

  update = (t: number, dt: number) => {
    this.player.update(dt)

    this.player.rotation = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.reticle.x, this.reticle.y);

    // Camera follows player ( can be set in create )
    this.cameras.main.startFollow(this.player);

    // Makes reticle move with player
    this.reticle.setVelocityX(this.player.body!.velocity.x)
    this.reticle.setVelocityY(this.player.body!.velocity.y)

    // Constrain velocity of player
    this.constrainVelocity(this.player, 500)

    // Constrain position of reticle
    this.constrainReticle(this.reticle)
  }

  doDis = (door: any) => {
    console.log("THIS RAN")
    door.angle += Math.PI / 20
  }

  constrainVelocity = (sprite: any, maxVelocity: any) => {
    if (!sprite || !sprite.body) return

    let angle, currVelocitySqr, vx, vy
    vx = sprite.body.velocity.x
    vy = sprite.body.velocity.y
    currVelocitySqr = vx * vx + vy * vy

    if (currVelocitySqr > maxVelocity * maxVelocity)
    {
      angle = Math.atan2(vy, vx)
      vx = Math.cos(angle) * maxVelocity
      vy = Math.sin(angle) * maxVelocity
      sprite.body.velocity.x = vx
      sprite.body.velocity.y = vy
    }
  }

  constrainReticle = (reticle: any) => {
      const distX = reticle.x - this.player.x; // X distance between player & reticle
      const distY = reticle.y - this.player.y; // Y distance between player & reticle

      // Ensures reticle cannot be moved offscreen
      if (distX > 800) reticle.x = this.player.x + 800
      else if (distX < -800) reticle.x = this.player.x - 800

      if (distY > 600) reticle.y = this.player.y + 600
      else if (distY < -600) reticle.y = this.player.y - 600
  }

  destroy() {

  }

  setupFollowupCameraOn() {
    this.cameras.main.setZoom(1)
    this.cameras.main.setRoundPixels(true)
  }
}