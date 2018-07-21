import { Depth } from 'configuration/constants'

export default class Item extends Phaser.GameObjects.Sprite {

  constructor(config) {
    super(config.scene, config.x, config.y, config.key)

    this.config = config

    config.scene.physics.world.enable(this)
    this.setDepth(Depth.SPRITE)

    if (config.animation) {
      this.anims.play(config.animation)
    }
  }

  onPickup(player) {
    switch(this.config.itemType) {
      case 'ammo':
        player.ammoBag.gainAmmo(this.config.ammoType, this.config.units)
        break
      case 'armour':
        player.gainArmour(this.config.units)
        break
      case 'gun':
        player.pickUp(this.config)
        break
    }

    if (this.config.onPickUpAudio) {
      this.scene.sound.play(this.config.onPickUpAudio)
    }
    this.destroy()
  }
}
