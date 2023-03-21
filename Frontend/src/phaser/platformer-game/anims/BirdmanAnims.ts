export default (anims: any) => {
  anims.create({
    key: 'birdman-idle',
    frames: anims.generateFrameNumbers('birdman', { start: 0, end: 12 }),
    frameRate: 8,
    repeat: -1
  })
}