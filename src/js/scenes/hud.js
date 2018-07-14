const DisplayLargeStyle = {
  color: '#BB0000', font: '24pt Doom',
  stroke: '#000000', strokeThickness: 4
}

const DisplaySmallStyle = {
  color: '#FFFF73', font: '14pt Square',
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

    let healthDisplay = this.add.text(194, 552, "100%", DisplayLargeStyle)
    healthDisplay.setOrigin(0.5)
    healthDisplay.setDepth(Depth.Display)

    let ammoDisplay = this.add.text(66, 552, "50", DisplayLargeStyle)
    ammoDisplay.setOrigin(0.5)
    ammoDisplay.setDepth(Depth.Display)
    let equippedAmmoType = "bullets"

    let ammoDisplays = {
      bullets: {
        max: this.add.text(750, 526, "200", DisplaySmallStyle),
        remaining: this.add.text(690, 526, "50", DisplaySmallStyle)
      },
      shells: {
        max: this.add.text(750, 542, "50", DisplaySmallStyle),
        remaining: this.add.text(690, 542, "0", DisplaySmallStyle)
      },
      rockets: {
        max: this.add.text(750, 558, "50", DisplaySmallStyle),
        remaining: this.add.text(690, 558, "0", DisplaySmallStyle)
      },
      plasma: {
        max: this.add.text(750, 574, "200", DisplaySmallStyle),
        remaining: this.add.text(690, 574, "0", DisplaySmallStyle)
      }
    }

    let gameScene = this.scene.get('level-1');
    gameScene.events.on('healthChange', function (health) {
      healthDisplay.setText(`${health.toString()}%`)
    }, this);

    gameScene.events.on('ammoChange', function(ammoType, remaining) {
      ammoDisplays[ammoType].remaining.setText(remaining.toString())
      if (ammoType == equippedAmmoType) {
        ammoDisplay.setText(remaining.toString())
      }
    })

    gameScene.events.on('weaponChange', function(ammoType, remaining) {
      equippedAmmoType = ammoType
      ammoDisplay.setText(remaining.toString())
    })
  }
}
