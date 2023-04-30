import type { Scene } from 'phaser'

export default class SceneManager {
  private scenes: Map<string, Scene> = new Map()
  private currentSceneKey?: string

  public addScene(scene: Scene): void {
    this.scenes.set(scene.scene.key, scene)
  }

  public start(sceneKey: string, data?: any): void {
    if (!this.scenes.has(sceneKey)) {
      console.error(`Scene ${sceneKey} not found in SceneManager`)
      return
    }

    if (this.currentSceneKey) {
      this.scenes.get(this.currentSceneKey)?.scene.stop()
    }

    const scene = this.scenes.get(sceneKey)
    scene?.scene.start(data)
    this.currentSceneKey = sceneKey
  }
}