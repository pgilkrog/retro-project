export function createRoundLight(texture: any, lightX: number, lightY: number, lightRadius: number) {
  const gradient = texture.context.createRadialGradient(lightX, lightY, 0, lightX, lightY, lightRadius);
  texture.context.globalCompositeOperation = 'destination-out';
  gradient.addColorStop(0, 'rgba(255, 200, 150, 0.9)');
  gradient.addColorStop(1, 'rgba(255, 200, 150, 0)');
  texture.context.fillStyle = gradient;
  texture.context.beginPath();
  texture.context.arc(lightX, lightY, lightRadius, 0, Math.PI * 2, false);
  texture.context.closePath();
  texture.context.fill();
}