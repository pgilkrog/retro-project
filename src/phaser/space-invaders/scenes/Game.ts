import Phaser, { Physics, Scene } from 'phaser'

export default class Game extends Scene {
  private player!: Phaser.Physics.Arcade.Sprite
  private aliens!: Phaser.Physics.Arcade.Group
  private bullets!: Phaser.Physics.Arcade.Group

  private keyA!: any
  private keyD!: any
  private keySpace!: any
  private canShoot: boolean = true

  constructor() {
    super({ key: 'Game' })
  }

  create(): void {
    this.aliens = this.physics.add.group({
      key: 'alien',
      repeat: 11, 
      setXY: { x: 12, y: 50, stepX: 70 }
    })
    this.bullets = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
      maxSize: 10,
      runChildUpdate: true
    })
    
    this.player = this.physics.add.sprite(400, 550, 'player')
    this.player.setCollideWorldBounds(true)

    this.physics.add.collider(this.player, this.aliens, this.hitAlien, undefined, this)
    this.physics.add.collider(this.bullets, this.aliens, this.hitAlien, undefined, this)

    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)  
  }

  update(time: number, delta: number): void {
    this.bullets.children.each((bullet: any) => {
      if (bullet.y < 0) {
        bullet.setActive(false).setVisible(false).setPosition(this.player.x, this.player.y - 30);
      }
    })

    this.player.body.velocity.x = 0

    if (this.keyA.isDown) {
      this.player.body.velocity.x = -300
    } else if (this.keyD.isDown) {
      this.player.body.velocity.x = 300
    }

    if (this.keySpace.isDown) {
      this.shoot()
    }
  }

  shoot() {
    if(!this.canShoot) {
      return
    }

    const bullet = this.bullets.get(this.player.x, this.player.y - 40)

    if (bullet) {
      bullet.setActive(true).setVisible(true).setVelocityY(-600).setTexture('bullet')
      this.canShoot = false

      setTimeout(() => {
        this.canShoot = true
      }, 250)
    }
  }

  hitAlien (player: Physics.Arcade.Sprite, alien: Physics.Arcade.Sprite) {
    player.disableBody(true, true)
    alien.disableBody(true, true)
  }
}