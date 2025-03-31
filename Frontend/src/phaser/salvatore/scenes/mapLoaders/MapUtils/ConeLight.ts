import { createRoundLight } from './RoundLight'

export function createConeLight(texture: any, lightX: number, lightY: number, lightRadius: number) {
  // Set up the gradient
  const gradient = texture.context.createRadialGradient(
    lightX,
    lightY,
    0,
    lightX,
    lightY,
    lightRadius
  )
  gradient.addColorStop(0, 'rgba(255, 200, 50, 0.7)')
  gradient.addColorStop(0.5, 'rgba(255, 200, 50, 0.3)')
  gradient.addColorStop(1, 'rgba(255, 200, 50, 0)')

  // Create a path to define the cone shape
  const conePath = new Path2D()
  conePath.moveTo(lightX, lightY - lightRadius * 0.5)
  conePath.lineTo(lightX + lightRadius * 0.25, lightY + lightRadius * 0.5)
  conePath.lineTo(lightX - lightRadius * 0.25, lightY + lightRadius * 0.5)
  conePath.closePath()

  // Draw the gradient within the cone path
  texture.context.fillStyle = gradient
  texture.context.globalCompositeOperation = 'destination-out'
  texture.context.fill(conePath)
  createRoundLight(texture, lightX, lightY + 50, lightRadius - 65)
}
