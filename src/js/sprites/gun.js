const random = new Phaser.Math.RandomDataGenerator()

export default class Gun {

  constructor(config, ammoBag, projectiles, soundManager) {
    this.key = config.key
    this.ammoBag = ammoBag
    this.projectiles = projectiles
    this.soundManager = soundManager

    this.ammoType = config.ammoType
    this.ammoCost = config.ammoCost

    this.projectileConfig = config.projectile
  }

  fire(origin, direction) {
    let ammoTaken = this.ammoBag.takeAmmo(this.ammoType, this.ammoCost)
    if (ammoTaken) {
      let burst = this.projectileConfig.burst || 1
      let maxMiss = this.projectileConfig.maxMissRadians || 0
      for (var i = 0; i < burst; i++) {
        let alteredDirection = random.realInRange(direction - maxMiss, direction + maxMiss)
        console.log(alteredDirection)
        this.projectiles.addProjectile({...this.projectileConfig,
          owner: origin,
          direction: alteredDirection
        })
      }
      this.soundManager.play(this.key)
    } else {
      console.log("NOT ENOUGH AMMO")
      // play empty ammo noise
    }
  }
}
