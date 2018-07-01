const MenuTextStyle = {
  color: '#BB0000', font: '24pt Doom',
  stroke: '#000000', strokeThickness: 4
}

const Depth = {
  Background: 0,
  Display: 1
}

export default class HudScene extends Phaser.Scene {

  constructor() {
    super({ key: 'hud' })
  }

  create() {
    let background = this.add.sprite(0, 520, 'hud')
    background.setOrigin(0, 0)
    background.setDepth(Depth.Background)

    let healthDisplay = this.add.text(194, 552, "100%", MenuTextStyle)
    healthDisplay.setOrigin(0.5)
    healthDisplay.setDepth(Depth.Display)

    let gameScene = this.scene.get('level-1');
    gameScene.events.on('healthChange', function (health) {
      healthDisplay.setText(`${health.toString()}%`)
    }, this);
  }
}
