import { Scene } from 'phaser'

export default class Game extends Scene {
  constructor () {
    super({ key: 'PlayScene'})
  }

  create () {
    console.log("GAME SCENE")
    this.add.image(400, 300, 'sky')

    const player = this.physics.add.image(32, 32, 'dude')
    player.setCollideWorldBounds(true)
    player.body.onWorldBounds = true
    player.body.gravity.y = 450
    player.body.bounce.y = 0.1

    const bomb = this.physics.add.image(400, 200, 'bomb')
    bomb.setCollideWorldBounds(true)
    bomb.body.onWorldBounds = true // enable worldbounds collision event
    bomb.setBounce(1)
    bomb.setVelocity(200, 20)

    // this.sound.add('thud')
    // this.physics.world.on('worldbounds', () => {
    //   this.sound.play('thud', { volume: 0.75 })
    // })
  }
}
