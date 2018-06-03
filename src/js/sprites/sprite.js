export default class Sprite extends Phaser.GameObjects.Sprite {

  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.assetKey = config.key

    this.body.setSize(30, 40)
    this.body.setOffset(15,30)
    this.body.setCollideWorldBounds(true)

    this.anims.play(`${this.assetKey}-hang`, true)
  }

}
