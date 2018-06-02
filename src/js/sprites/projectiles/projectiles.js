import Projectile from './projectile'

export default class Projectiles extends Phaser.GameObjects.Group {

  constructor(scene) {
    super(scene)
  }

  addBullet(owner, origin, direction) {
    const projectile = new Projectile({
      scene: this.scene,
      origin: origin,
      type: 'bullet',
      direction: direction,
      speed: 600})

    this.add(projectile, true)
  }

  create(origin, direction) {
    const projectile = new Projectile({
      scene: this.scene,
      origin: origin,
      type: 'bullet',
      direction: -90,
      speed: 10})

    this.add(projectile, true)
  }

}
