export default class Projectile extends Phaser.GameObjects.Sprite {

  constructor(config) {
    super(config.scene, config.origin.x, config.origin.y, config.type)

    this.damage = config.damage;

    this.scene.physics.world.enable(this);

    this.body.setCollideWorldBounds(true)
    this.body.setVelocityX(Math.cos(config.direction) * config.speed)
    this.body.setVelocityY(Math.sin(config.direction) * config.speed)
  }
}
