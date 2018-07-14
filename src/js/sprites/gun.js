export default class Gun {

  constructor(config, ammoBag, projectiles, soundManager) {
    this.key = config.key
    this.ammoBag = ammoBag
    this.projectiles = projectiles
    this.soundManager = soundManager

    this.ammoType = config.ammoType
    this.ammoCost = config.ammoCost

    this.projectileBaseConfig = config.projectile
  }

  fire(origin, direction) {
    let ammoTaken = this.ammoBag.takeAmmo(this.ammoType, this.ammoCost)
    if (ammoTaken) {
      let projectileConfig = {...this.projectileBaseConfig,
        owner: origin,
        direction: direction
      }
      this.projectiles.addProjectile(projectileConfig)
      this.soundManager.play(this.key)
    } else {
      console.log("NOT ENOUGH AMMO")
      // play empty ammo noise
    }
  }
}
