
const menuTextStyle = {
  color: '#BB0000', align: 'left', font: '28pt Doom',
  stroke: '#000000',
  strokeThickness: 4
}

export default class MenuScene extends Phaser.Scene {

  constructor() {
    super({ key: 'menu' })
  }

  preload() {
    let background = this.add.sprite(0, 0, 'splash');
    background.setOrigin(0,0)

    this.add.text(300, 300, 'New Game', menuTextStyle)
  }
}
