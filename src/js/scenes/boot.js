import * as WebFont from 'webfontloader'

export default class BootScene extends Phaser.Scene {

  constructor() {
    super({ key: 'boot' })
  }

  preload() {
    this.load.image('splash',    '../../assets/images/splash.jpg')
    this.load.image('loading-bar',  '../../assets/images/loading.png')
    this.load.image('menu-skull', 'assets/images/menu-select-skull.png')

    this.load.audio('pistol', 'assets/audio/guns/pistol.ogg')

    WebFont.load({
      custom: {
        families: ['Doom'],
        urls: ['css/doom-font.css']
      }
    })
  }

  create() {
    let sceneManager = this.scene
    setTimeout(() => sceneManager.start('menu'), 500) // Wait for font to load :(
  }
}
