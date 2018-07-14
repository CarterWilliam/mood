const Palette = {
  red: '#BB0000',
  yellow: '#FFFF73',
  grey: '#999999',
  black: '#000000'
}

const DisplayLargeStyle = {
  color: Palette.red, font: '24pt Doom',
  stroke: Palette.black, strokeThickness: 4
}

const DisplaySmallStyle = {
  color: Palette.yellow, font: '14pt Square',
  stroke: Palette.black, strokeThickness: 4
}

const ArmsIndexGrey = {
  color: Palette.grey, font: '14pt Square',
  stroke: Palette.black, strokeThickness: 4
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

    let arms = {
      "2": this.add.text(273, 525, "2", DisplaySmallStyle),
      "3": this.add.text(303, 525, "3", ArmsIndexGrey),
      "4": this.add.text(333, 525, "4", ArmsIndexGrey),
      "5": this.add.text(273, 550, "5", ArmsIndexGrey),
      "6": this.add.text(303, 550, "6", ArmsIndexGrey),
      "7": this.add.text(333, 550, "7", ArmsIndexGrey)
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

    gameScene.events.on('gainWeapon', function(armsIndex) {
      arms[armsIndex].setColor(Palette.yellow)
    })

    gameScene.events.on('weaponChange', function(ammoType, remaining) {
      equippedAmmoType = ammoType
      ammoDisplay.setText(remaining.toString())
    })
  }
}
