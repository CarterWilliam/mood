import Projectile from './projectile'

export default class Projectiles extends Phaser.GameObjects.Group {

  constructor(scene) {
    super(scene)
  }

  addProjectile(config) {
    const projectile = new Projectile({
      scene: this.scene,
      type: config.type,
      origin: { x: config.owner.x, y: config.owner.y },
      direction: config.direction,
      damage: config.damage,
      speed: config.speed
    })
    
    this.add(projectile, true)
  }

  addBullet(owner, origin, direction) {
    const projectile = new Projectile({
      scene: this.scene,
      origin: origin,
      type: 'bullet',
      damage: 10,
      direction: direction,
      speed: 600})

    this.add(projectile, true)
  }

}
