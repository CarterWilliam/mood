import { Depth } from 'configuration/constants'

const MaxArmour = 100

export default Killable => class extends Killable {

  constructor(config) {
    super(config)
    this.assetKey = config.key
    this.maxHealth = config.health
    this.health = config.health

    this.armour = config.armour || 0

    this.hurtSound = this.scene.sound.add(`${config.key}-hurt`)
    this.dieSound = this.scene.sound.add(`${config.key}-die`)
  }

  gainArmour(armour) {
    if (this.armour >= 100) {
      return false
    } else {
      this.armour = Math.min(this.armour + armour, MaxArmour)
      if (this.onArmourChanged) this.onArmourChanged()
      return true
    }
  }

  takeDamage(hitPoints) {
    if (this.armour > 0) {
      this.armour -= Math.floor(hitPoints / 2)
      if (this.armour < 0) this.armour = 0
      if (this.onArmourChanged) this.onArmourChanged()  
      this.health -= Math.floor(hitPoints / 2)
    } else {
      this.health -= hitPoints
    }

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
    this.hurtSound.stop()
    this.dieSound.play()
    this.anims.play(`${this.assetKey}-die`)
    this.setDepth(Depth.ONTHEFLOOR)
    this.body.destroy()
    if (this.onDie) { this.onDie() }
  }
}
