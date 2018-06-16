import { Depth } from 'configuration/constants'

export default Killable => class extends Killable {

    constructor(config) {
      super(config)
      this.assetKey = config.key
      this.maxHealth = config.health
      this.health = config.health
    }

    takeDamage(hitPoints) {
      this.health -= hitPoints
      if (this.health <= 0) {
        this.die()
      } else if (this.damageCallback) {
        this.damageCallback()
      }
    }

    isDamaged() {
      return this.maxHealth === this.health
    }

    die() {
      this.anims.play(`${this.assetKey}-die`)
      this.setDepth(Depth.ONTHEFLOOR)
      this.body.destroy()
      if (this.deathCallback) { this.deathCallback() }
    }
}
