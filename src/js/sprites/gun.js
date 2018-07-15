const random = new Phaser.Math.RandomDataGenerator()

export default class Gun {

  constructor(config, ammoBag, projectiles, soundManager) {
    this.key = config.key
    this.ammoBag = ammoBag
    this.projectiles = projectiles
    this.soundManager = soundManager

    this.ammoType = config.ammoType
    this.ammoCost = config.ammoCost
    this.shotDuration = config.fireInterval

    this.projectileConfig = config.projectile

    this.lastShot = 0
  }

  fire(origin, direction, gameTime) {
    if (this.inRecoil(gameTime)) {
      return false
    }

    let ammoTaken = this.ammoBag.takeAmmo(this.ammoType, this.ammoCost)
    if (ammoTaken) {
      this.lastShot = gameTime
      let burst = this.projectileConfig.burst || 1
      let maxMiss = this.projectileConfig.maxMissRadians || 0
      for (var i = 0; i < burst; i++) {
        let alteredDirection = random.realInRange(direction - maxMiss, direction + maxMiss)
        this.projectiles.addProjectile({...this.projectileConfig,
          owner: origin,
          direction: alteredDirection
        })
      }
      this.soundManager.play(this.key)
      return true
    } else {
      console.log("NOT ENOUGH AMMO")
      // play empty ammo noise
      return false
    }
  }

  inRecoil(gameTime) {
    return gameTime < this.lastShot + this.shotDuration
  }
}
