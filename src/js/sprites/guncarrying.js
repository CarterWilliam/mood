import Gun from 'sprites/gun'
import AmmoBag from 'sprites/ammobag'

const PistolConfig = require('recipes/items/guns/pistol.json')

export default GunCarrying => class extends GunCarrying {

  constructor(config) {
    super(config)

    this.ammoBag = new AmmoBag(this.scene)
    let _this = this
    this.guns = {
      pistol: new Gun({...PistolConfig,
        player: _this,
        projectiles: config.projectiles,
        ammoBag: _this.ammoBag
      })
    }
    this.equipped = this.gun = this.guns.pistol
  }

  has(weaponName) {
    return this.guns[weaponItem]
  }

  pickUp(weaponItem) {
    if (!this.has(weaponItem.key)) {
      this.guns[weaponItem.key] = new Gun(weaponItem)
    }
    this.ammoBag.gainAmmo(weaponItem.ammoUnits)
  }

  canFire() {
    return this.ammoBag.has(this.equipped.ammoType, this.equipped.ammoCost)
  }
}
