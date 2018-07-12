export default class Gun {

  constructor(config) {
    this.key = config.key
    this.player = config.player
    this.scene = config.player.scene
    this.projectiles = config.projectiles
    this.ammoBag = config.player.ammoBag

    this.ammoType = config.ammoType
    this.ammoCost = config.ammoCost

    this.projectileBaseConfig = config.projectile
  }

  fire() {
    let ammoTaken = this.ammoBag.takeAmmo(this.ammoType, this.ammoCost)
    if (ammoTaken) {
      let projectileConfig = {...this.projectileBaseConfig,
        owner: this.player,
        direction: this.player.direction
      }
      this.projectiles.addProjectile(projectileConfig)
      this.scene.sound.play(this.key)
    } else {
      console.log("NOT ENOUGH AMMO")
      // play empty ammo noise
    }
  }
}
