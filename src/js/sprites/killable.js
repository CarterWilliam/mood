import { Depth } from 'configuration/constants'

export default Killable => class extends Killable {

  constructor(config) {
    super(config)
    this.assetKey = config.key
    this.maxHealth = config.health
    this.health = config.health

    this.hurtSound = this.scene.sound.add(`${config.key}-hurt`)
    this.dieSound = this.scene.sound.add(`${config.key}-die`)
  }

  takeDamage(hitPoints) {
    this.health -= hitPoints
    if (this.health <= 0) {
      this.health = 0
      this.die()
    } else {
      this.hurtSound.play()
      if (this.onDamage) { this.onDamage() }
    }
  }

  isDamaged() {
    return this.maxHealth === this.health
  }

  die() {
    // this.scene.sound.stop(`${this.assetKey}-hurt`)
    this.hurtSound.stop()
    this.dieSound.play()
    this.anims.play(`${this.assetKey}-die`)
    this.setDepth(Depth.ONTHEFLOOR)
    this.body.destroy()
    if (this.onDie) { this.onDie() }
  }
}
