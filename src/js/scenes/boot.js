
export default class BootScene extends Phaser.Scene {

  constructor() {
    super({ key: 'boot' })
  }

  preload() {
    this.load.image('splash',    '../../assets/images/splash.jpg');
    this.load.image('loading-bar',  '../../assets/images/loading.png');
  }

  create() {
    this.scene.start('loading')
  }
}
