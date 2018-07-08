export default BackPackable => class extends BackPackable {

  constructor(config) {
    super(config)

    this.bullets = 50
    this.bulletsMax = 200
    this.shells = 0
    this.shellsMax = 50
    this.rockets = 0
    this.RocketsMax = 50
    this.plasma = 0
    this.plasmaMax = 200
  }

  gainAmmo(type, units) {
    this.bullets = Math.min(this.bullets + units, this.bulletsMax)
    this.scene.events.emit('ammoChange', this.bullets)
  }

  canFire() {
    return this.bullets > 0
  }

}
