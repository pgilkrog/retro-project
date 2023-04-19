export function createPlayerAnimations(anims: Phaser.Animations.AnimationState, states: any) {
  anims.create({
    key: states.idle,
    frames: anims.generateFrameNames('player', { start: 1, end: 1, prefix: 'Player/walk_down_2', suffix: '.png' }),
    repeat: 0,
    frameRate: 6
  }) 
  anims.create({
    key: states.walkLeft,
    frames: anims.generateFrameNames('player', { start: 1, end: 3, prefix: 'Player/walk_left_', suffix: '.png' }),
    repeat: -1,
    frameRate: 6
  }) 
  anims.create({
    key: states.walkRight,
    frames: anims.generateFrameNames('player', { start: 1, end: 3, prefix: 'Player/walk_right_', suffix: '.png' }),
    repeat: -1,
    frameRate: 6
  }) 
  anims.create({
    key: states.walkUp,
    frames: anims.generateFrameNames('player', { start: 1, end: 3, prefix: 'Player/walk_up_', suffix: '.png' }),
    repeat: -1,
    frameRate: 6
  }) 
  anims.create({
    key: states.walkDown,
    frames: anims.generateFrameNames('player', { start: 1, end: 3, prefix: 'Player/walk_down_', suffix: '.png' }),
    repeat: -1,
    frameRate: 6
  }) 
}