export default class AmmoBag {

  constructor(scene) {
    this.scene = scene
    this.ammo = {
      bullets: {
        max: 200, remaining: 5
      }
    }
  }

  gainAmmo(type, amount) {
    if (this.ammo[type].remaining >= this.ammo[type].max) {
      return false
    } else {
      this.ammo[type].remaining = Math.min(
        this.ammo[type].remaining + amount, this.ammo[type].max)
      alertAmmoChange(this.scene, this.ammo[type].remaining)
      return true
    }
  }

  takeAmmo(type, amount) {
    if (this.ammo[type].remaining >= amount) {
      this.ammo[type].remaining -= amount
      alertAmmoChange(this.scene, this.ammo[type].remaining)
      return true
    } else {
      return false
    }
  }

  has(type, amount) {
    return this.remaining(type) >= amount
  }

  remaining(type) {
    return this.ammo[type].remaining
  }

  upgrade() {
    Object.keys(this.ammo).forEach(ammoType => {
      this.ammo[ammoType].max *= 2
    })
  }

}

function alertAmmoChange(scene, remainingBullets) {
  scene.events.emit('ammoChange', remainingBullets)
}
