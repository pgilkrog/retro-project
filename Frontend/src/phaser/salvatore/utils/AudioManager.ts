import type Phaser from 'phaser'

export class AudioManager {
  private scene: Phaser.Scene
  private sounds!: { [key: string]: Phaser.Sound.BaseSound } 
  private currentMusic: Phaser.Sound.BaseSound | undefined
  
  constructor(scene: Phaser.Scene) {
    this.scene = scene
    this.preload()
    this.create()
  }

  preload() {
  }

  create() {
    this.sounds = {}
    this.sounds['theme'] = this.scene.sound.add('theme', { loop: true })
  }

  update() {

  }

  playSound(key: string) {
    if (this.sounds === undefined) return
    
    if (this.sounds[key]) {
      this.sounds[key].play()
    }
  }

  playMusic(key: string) {
    if (this.sounds === undefined) return
    
    if (this.currentMusic !== undefined) {
      this.currentMusic.stop()
    }

    this.currentMusic = this.scene?.sound.add(key, { loop: true })
    this.currentMusic?.play()
  }

  stopMusic() {
    if (this.currentMusic !== undefined) {
      this.currentMusic.stop()
      this.currentMusic = undefined
    }
  }
}