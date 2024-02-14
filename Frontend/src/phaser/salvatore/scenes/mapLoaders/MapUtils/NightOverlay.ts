import type Phaser from 'phaser'

export function nightOverlay(scene: Phaser.Scene, map: any, layerName: string) {
  var texture = scene.textures.createCanvas(layerName, map.widthInPixels, map.heightInPixels)

  texture!.context.fillStyle = '#10112a'
  texture!.context.fillRect(0, 0, map.widthInPixels, map.heightInPixels)

  let overlay = scene.add.image(map.widthInPixels / 2, map.heightInPixels / 2, layerName)
  overlay.setDepth(3000)
  overlay.setAlpha(0.9)

  return texture
}