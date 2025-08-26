import { playerAnims } from './playerEnums'

export const PlayerAnimations = (sprite: Phaser.Physics.Matter.Sprite) => {
  if (sprite == undefined) {
    return
  }

  sprite.anims.create({
    key: playerAnims.player_idle,
    frames: sprite.anims.generateFrameNames('player', {
      start: 0,
      end: 5,
      prefix: 'idle_',
      suffix: '.png',
    }),
    frameRate: 8,
    repeat: -1,
  })

  sprite.anims.create({
    key: playerAnims.player_walk,
    frames: sprite.anims.generateFrameNames('player', {
      start: 0,
      end: 9,
      prefix: 'walk_',
      suffix: '.png',
    }),
    frameRate: 10,
    repeat: -1,
  })

  sprite.anims.create({
    key: playerAnims.player_run,
    frames: sprite.anims.generateFrameNames('player', {
      start: 0,
      end: 9,
      prefix: 'run_',
      suffix: '.png',
    }),
    frameRate: 10,
    repeat: -1,
  })

  sprite.anims.create({
    key: playerAnims.player_jump,
    frames: sprite.anims.generateFrameNames('player', {
      start: 0,
      end: 9,
      prefix: 'jump_',
      suffix: '.png',
    }),
    frameRate: 8,
    repeat: 0,
  })

  sprite.anims.create({
    key: playerAnims.player_shoot,
    frames: sprite.anims.generateFrameNames('player', {
      start: 0,
      end: 3,
      prefix: 'tile00',
      suffix: '.png',
    }),
    frameRate: 10,
    repeat: -1,
  })

  sprite.anims.create({
    key: playerAnims.player_melee,
    frames: sprite.anims.generateFrameNames('player', {
      start: 0,
      end: 2,
      prefix: 'attack_',
      suffix: '.png',
    }),
    frameRate: 10,
    repeat: 0,
  })

  sprite.anims.create({
    key: playerAnims.player_recharge,
    frames: sprite.anims.generateFrameNames('player', {
      start: 0,
      end: 16,
      prefix: 'recharge_',
      suffix: '.png',
    }),
    frameRate: 10,
    repeat: -1,
  })

  sprite.anims.create({
    key: playerAnims.player_falling,
    frames: sprite.anims.generateFrameNames('player', {
      start: 3,
      end: 5,
      prefix: 'jump_',
      suffix: '.png',
    }),
    frameRate: 10,
    repeat: 0,
  })
}
