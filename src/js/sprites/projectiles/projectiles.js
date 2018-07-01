import Projectile from './projectile'

export default class Projectiles extends Phaser.GameObjects.Group {

  constructor(scene) {
    super(scene)
  }

  addProjectile(config) {
    const projectile = new Projectile(this, {...config,
      scene: this.scene,
      origin: { x: config.owner.x, y: config.owner.y }
    })

    this.add(projectile, true)
  }
}
