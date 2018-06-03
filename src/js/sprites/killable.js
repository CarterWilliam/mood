import { Depth } from '../constants'

export default Killable => class extends Killable {

    constructor(config) {
      super(config)
      this.health = config.health
    }

    takeDamage(hitPoints) {
      this.health -= hitPoints
      if (this.health <= 0) { this.die() }
    }

    die() {
      this.anims.play(`${this.assetKey}-die`)
      this.setDepth(Depth.ONTHEFLOOR)
      this.body.destroy()
    }
}
