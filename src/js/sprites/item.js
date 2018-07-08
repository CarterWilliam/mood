import { Depth } from 'configuration/constants'

const ClipBaseConfig = require('recipes/items/ammo/clip.json')

export default class Item extends Phaser.GameObjects.Sprite {

  constructor(config) {
    super(config.scene, config.x, config.y, config.key)

    Object.assign(this, baseConfig(config.key))

    config.scene.physics.world.enable(this)
    config.scene.add.existing(this)

    this.setDepth(Depth.SPRITE)
  }

  onPickup(player) {
    switch(this.itemType) {
      case 'ammo':
        player.gainAmmo(this.ammoType, this.units)
        if (this.onPickUpAudio) {
          this.scene.sound.play(this.onPickUpAudio)
        }
        break
    }

    this.destroy()
  }
}

function baseConfig(key) {
  switch(key) {
    case 'clip': return ClipBaseConfig
  }
}
