export default class Soldier extends Phaser.GameObjects.Sprite {

  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.body.setSize(30, 30);
    this.body.setOffset(15,30)
    this.body.setCollideWorldBounds(true);
  }
}
