import { Depth } from 'configuration/constants'
import { Menu, MenuItem } from 'menu'

const MenuSpeed = 100

export default class MenuScene extends Phaser.Scene {

  constructor() {
    super({ key: 'menu' })
  }

  preload() {
    let background = this.add.sprite(0, 0, 'splash');
    background.setOrigin(0,0)
    background.setDepth(Depth.MENU_BACKGROUND)
  }

  create() {
    let menuScene = this

    let level1Config = require('recipes/levels/level1.json')

    this.lastMenuEvent = 0
    this.menu = new Menu({x: 200, y: 300 }, this)
    this.menu.push([
      new MenuItem("I'm too young to die.", function() {
        menuScene.menu.hide(this)
      }),
      new MenuItem("Not too Rough.", function() {
        menuScene.menu.hide(this)
      }),
      new MenuItem("Hurt me plenty.", function() {
        menuScene.menu.hide(this)
      }),
      new MenuItem("Ultra-Violence.", function() {
        menuScene.menu.hide(this)
      }),
      new MenuItem("Nightmare!", function() {
        menuScene.scene.start(level1Config.key)
      })
    ])
    this.keyboard = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.canUpdateMenu()) {
      if (this.keyboard.down.isDown) {
        this.menu.down()
        this.sound.play('pistol')
        this.lastMenuEvent = this.time.now
      } else if (this.keyboard.up.isDown) {
        this.menu.up()
        this.sound.play('pistol')
        this.lastMenuEvent = this.time.now
      } else if (this.keyboard.space.isDown) {
        this.menu.select()
        this.sound.play('pistol')
        this.lastMenuEvent = this.time.now
      }
    }
  }

  canUpdateMenu() {
    return (this.time.now - this.lastMenuEvent) > MenuSpeed
  }
}
