import StateMachine from '@/phaser/utils/StateMachine'

enum states {
  idle = 'idle',
  walk = 'walk',
  jump = 'jump',
  spikeHit = 'spike-hit',
  skeletonHit = 'skeleton-hit',
  skeletonStomp = 'skeleton-stomp',
  death = 'death',
  attack = 'attack'
}

enum animations {
  idle = 'player-idle',
  walk = 'player-walk',
  run= 'character-run',
  die = 'character-die',
  jump = 'character-jump',
  attack1 = 'character-attack-1',
  attack2 = 'character-attack-2',
  attack3 = 'character-attack-3',
  slide = 'character-slide',
  jumpAttack = 'character-jump-attack',
  wallGlide = 'character-wall-glide',
}

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private stateMachine: StateMachine
  private speed: number = 300
  private keyInputs: { [key: string]: Phaser.Input.Keyboard.Key } = {}

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player')
    scene.add.existing(this)
    scene.physics.add.existing(this)
    
    this.createStateMachine()
    this.createKeyInputs()
    this.createAnimations()
    this.anims.play(animations.idle)
    this.body!.setSize(40, 25, true)
    this.body!.setOffset(0, 15) 
    // this.setCollideWorldBounds(true)
  }

  update(dt: number) {
    this.stateMachine.update(dt)
  }

  private createStateMachine = (): void => {
    this.stateMachine = new StateMachine(this, 'player')

    this.stateMachine
      .addState(states.idle, {
        onEnter: this.idleOnEnter,
        onUpdate: this.idleOnUpdate
      })
      .addState(states.walk, {
        onEnter: this.walkOnEnter,
        onUpdate: this.walkOnUpdate
      })
      .setState(states.idle)
  }

  private idleOnEnter(): void {
    this.anims.play(animations.idle)
  }

  private idleOnUpdate(): void {
    if (
      this.keyInputs['keyD'].isDown || 
      this.keyInputs['keyA'].isDown || 
      this.keyInputs['keyW'].isDown || 
      this.keyInputs['keyS'].isDown
    ) {
      this.stateMachine?.setState(states.walk)
    }
  }

  private walkOnEnter(): void {
    this.play(animations.walk)
  }

  private walkOnUpdate(): void {
    this.setVelocity(0)

    if (this.keyInputs['keyD'].isDown) {
      this.setVelocityX(this.speed)
    } 
    else if (this.keyInputs['keyA'].isDown) {
      this.setVelocityX(-this.speed)
    }
    
    if (this.keyInputs['keyW'].isDown) {
      this.setVelocityY(-this.speed)
    } 
    else if (this.keyInputs['keyS'].isDown) {
      this.setVelocityY(this.speed)
    }

    if (
      this.keyInputs['keyD'].isDown || 
      this.keyInputs['keyA'].isDown || 
      this.keyInputs['keyW'].isDown || 
      this.keyInputs['keyS'].isDown
    ) {
      //Do Nothing
    } else {
      this.stateMachine?.setState(states.idle)
    }
  }

  private createKeyInputs() {
    this.keyInputs['keyW'] = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.keyInputs['keyS'] = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.keyInputs['keyA'] = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.keyInputs['keyD'] = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D)
  }

  private createAnimations() {
    this.anims.create({
      key: animations.idle,
      frames: this.anims.generateFrameNames('player', { start: 1, end: 1, prefix: 'char_walk_', suffix: '.png'}),
      repeat: 1,
      frameRate: 10
    })

    this.anims.create({
      key: animations.walk,
      frames: this.anims.generateFrameNames('player', { start: 1, end: 6, prefix: 'char_walk_', suffix: '.png'}),
      repeat: -1,
      frameRate: 10
    })

    this.anims.create({
      key: animations.run,
      frames: this.anims.generateFrameNames('player', { start: 1, end: 6, prefix: 'char_run_', suffix: '.png'}),
      repeat: -1,
      frameRate: 10
    })

    console.log(this.anims)
  }
}