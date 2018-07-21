const Palette = {
  red: '#BB0000',
  yellow: '#FFFF73',
  grey: '#999999',
  black: '#000000'
}

const LargeGaugeRed = {
  color: Palette.red, font: '24pt Doom',
  stroke: Palette.black, strokeThickness: 4
}

const SmallGaugeYellow = {
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

const LargeGaugeY = 553

export default class HudScene extends Phaser.Scene {

  constructor() {
    super({ key: 'hud' })

    this.equippedAmmoType = 'bullets'
    this.currentAmmo = null
    this.health = null
    this.armour = null
    this.arms = null
    this.ammo = null
  }

  create() {
    let background = this.add.sprite(0, 520, 'hud')
    background.setOrigin(0, 0)
    background.setDepth(Depth.Background)

    this.health = this.add.text(194, LargeGaugeY, "100%", LargeGaugeRed)
    this.health.setOrigin(0.5)
    this.health.setDepth(Depth.Display)

    this.currentAmmo = this.add.text(66, LargeGaugeY, "50", LargeGaugeRed)
    this.currentAmmo.setOrigin(0.5)
    this.currentAmmo.setDepth(Depth.Display)

    this.armour = this.add.text(522, LargeGaugeY, "0%", LargeGaugeRed)
    this.armour.setOrigin(0.5)
    this.armour.setDepth(Depth.Display)

    this.arms = {
      "2": this.add.text(273, 525, "2", SmallGaugeYellow),
      "3": this.add.text(303, 525, "3", ArmsIndexGrey),
      "4": this.add.text(333, 525, "4", ArmsIndexGrey),
      "5": this.add.text(273, 550, "5", ArmsIndexGrey),
      "6": this.add.text(303, 550, "6", ArmsIndexGrey),
      "7": this.add.text(333, 550, "7", ArmsIndexGrey)
    }

    this.ammo = {
      bullets: {
        max: this.add.text(750, 526, "200", SmallGaugeYellow),
        remaining: this.add.text(690, 526, "50", SmallGaugeYellow)
      },
      shells: {
        max: this.add.text(750, 542, "50", SmallGaugeYellow),
        remaining: this.add.text(690, 542, "0", SmallGaugeYellow)
      },
      rockets: {
        max: this.add.text(750, 558, "50", SmallGaugeYellow),
        remaining: this.add.text(690, 558, "0", SmallGaugeYellow)
      },
      plasma: {
        max: this.add.text(750, 574, "200", SmallGaugeYellow),
        remaining: this.add.text(690, 574, "0", SmallGaugeYellow)
      }
    }
  }

  startWatching(scene) {
    scene.events.on('healthChange', function (health) {
      this.health.setText(`${health.toString()}%`)
    }, this);

    scene.events.on('armourChange', function (armour) {
      this.armour.setText(`${armour.toString()}%`)
    }, this);

    scene.events.on('ammoChange', function(ammoType, remaining) {
      this.ammo[ammoType].remaining.setText(remaining.toString())
      if (ammoType == this.equippedAmmoType) {
        this.currentAmmo.setText(remaining.toString())
      }
    }, this)

    scene.events.on('gainWeapon', function(armsIndex) {
      this.arms[armsIndex].setColor(Palette.yellow)
    }, this)

    scene.events.on('weaponChange', function(ammoType, remaining) {
      this.equippedAmmoType = ammoType
      this.currentAmmo.setText(remaining.toString())
    }, this)
  }
}
