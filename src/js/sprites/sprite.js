export default class Sprite extends Phaser.GameObjects.Sprite {

  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.assetKey = config.key

    this.body.setSize(30, 56)
    this.body.setOffset(15,2)
    this.body.setCollideWorldBounds(true)
  }

}
