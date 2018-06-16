import * as WebFont from 'webfontloader'

export default class LoadingScene extends Phaser.Scene {

  constructor() {
    super({ key: 'loading' })
  }

  preload() {
    let splash = this.add.sprite(0, 0, 'splash');
    splash.setOrigin(0,0)

    this.createLoadBar()

    this.loadMaps()
    this.loadAudio()
    this.loadFonts()

    this.load.image('menu-skull', 'assets/images/menu-select-skull.png')

    this.load.image('bullet', 'assets/images/bullet.png')
    this.load.spritesheet('fireball', 'assets/images/fireball.png', { frameWidth: 15, frameHeight: 15 })

    this.load.spritesheet('soldier', 'assets/images/soldier.png', { frameWidth: 60, frameHeight: 60 });
    this.load.spritesheet('imp', 'assets/images/imp.png', { frameWidth: 60, frameHeight: 60, endFrame: 68 });
  }

  createLoadBar() {
    let pos = { x: 200, y: 400 }
    let width = 800 - pos.x*2
    let height = 30

    let border = this.add.graphics({
      lineStyle: { width: 8, color: 0x000000 }
    });
    border.strokeRectShape(
      new Phaser.Geom.Rectangle(pos.x, pos.y, width, height)
    )

    let progress = this.add.graphics();
    this.load.on('progress', function (value) {
      progress.clear();
      progress.fillStyle(0x0A1C52, 0.8);
      progress.fillRect(pos.x, pos.y, width * value, height)
    })
  }

  loadMaps() {
    this.load.image('level1-tiles', 'assets/maps/level1.png')
    this.load.tilemapTiledJSON('level1-map', 'assets/maps/level1.json')
  }

  loadAudio() {
    this.load.audio('pistol', 'assets/audio/guns/pistol.ogg')
  }

  loadFonts() {
    WebFont.load({
      custom: {
        families: ['Doom'],
        urls: ['css/doom-font.css']
      }
    })
  }

  create() {
    this.scene.start('menu')
  }
}
