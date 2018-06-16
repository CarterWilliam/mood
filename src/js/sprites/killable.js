import { Depth } from 'configuration/constants'

export default Killable => class extends Killable {

  constructor(config) {
    super(config)
    this.assetKey = config.key
    this.maxHealth = config.health
    this.health = config.health
  }

  takeDamage(hitPoints) {
    // console.log(`takeDamage(${hitPoints})`)
    this.health -= hitPoints
    // console.log(`health: ${this.health}`)
    if (this.health <= 0) {
      this.die()
    } else {
      this.playSound('hurt')
      if (this.onDamage) { this.onDamage() }
    }
  }

  isDamaged() {
    return this.maxHealth === this.health
  }

  die() {
    this.playSound('die')
    this.anims.play(`${this.assetKey}-die`)
    this.setDepth(Depth.ONTHEFLOOR)
    this.body.destroy()
    if (this.onDie) { this.onDie() }
  }

  playSound(soundKey) {
    this.scene.sound.play(`${this.assetKey}-${soundKey}`)
  }
}
