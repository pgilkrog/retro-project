import type Phaser from 'phaser'

export function nightOverlay(scene: Phaser.Scene, map: any, layerName: string) {
  var texture = scene.textures.createCanvas(layerName, map.widthInPixels, map.heightInPixels)

  if (texture != undefined) {
    texture.context.fillStyle = '#10112a'
    texture.context.fillRect(0, 0, map.widthInPixels, map.heightInPixels)
  }

  scene.add
    .image(map.widthInPixels / 2, map.heightInPixels / 2, layerName)
    .setDepth(3000)
    .setAlpha(0.9)

  return texture
}
