import Gun from 'sprites/gun'
import AmmoBag from 'sprites/ammobag'

const PistolConfig = require('recipes/items/guns/pistol.json')

export default GunCarrying => class extends GunCarrying {

  constructor(config) {
    super(config)
    this.ammoBag = new AmmoBag(this.scene)
    this.scene = config.scene

    this.guns = {
      pistol: new Gun(
        PistolConfig,
        this.ammoBag,
        config.projectiles,
        this.scene.sound)
    }
    this.equipped = this.guns.pistol
  }

  has(weaponKey) {
    return this.guns[weaponKey]
  }

  pickUp(weaponItem) {
    if (!this.has(weaponItem.key)) {
      this.guns[weaponItem.key] = new Gun(weaponItem, this.ammoBag, this.projectiles, this.scene.sound)
      this.equipped = this.guns[weaponItem.key]
      this.scene.events.emit('weaponChange', this.equipped.ammoType, this.ammoBag.remaining(this.equipped.ammoType))
    }
    this.ammoBag.gainAmmo(weaponItem.ammoType, weaponItem.ammoUnits)
  }

  canFire() {
    return this.ammoBag.has(this.equipped.ammoType, this.equipped.ammoCost)
  }
}
