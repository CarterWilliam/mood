export default class Projectile extends Phaser.GameObjects.Sprite {

  constructor(group, config) {
    super(config.scene, config.origin.x, config.origin.y, config.type)

    this.group = group
    this.assetKey = config.type
    this.explodes = config.explodes
    this.damage = config.damage

    this.scene.physics.world.enable(this)

    if(config.size) {
      this.body.setSize(config.size, config.size)
    }
    this.body.setCollideWorldBounds(false)
    this.body.setVelocityX(Math.cos(config.direction) * config.speed)
    this.body.setVelocityY(Math.sin(config.direction) * config.speed)
  }

  impact() {
    let _this = this

    if (this.explodes) {
      this.body.stop()
      this.group.remove(this)
      this.anims.play(`${this.assetKey}-impact`)
      this.on('animationcomplete', function() {
        _this.destroy()
      })
    } else {
      this.destroy()
    }
  }
}
