const velocity = 160;
const diagonalVelocity = Math.floor(velocity / Math.SQRT2);

export default class Soldier extends Phaser.GameObjects.Sprite {

  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.body.setSize(30, 30)
    this.body.setOffset(15,30)
    this.body.setCollideWorldBounds(true);
  }

  update(cursors) {
    if (cursors.space.isDown) {
      this.fire(cursors)
    } else {
      this.move(cursors)
    }
  }

  move(cursors) {
    var movingX = 0;
    var movingY = 0;

    if (cursors.left.isDown) {
      movingX -= 1;
    }

    if (cursors.right.isDown) {
      movingX += 1;
    }

    if (cursors.up.isDown) {
      movingY -= 1;
    }

    if (cursors.down.isDown) {
      movingY += 1;
    }

    if (movingX == 0 && movingY == -1) {
      this.body.setVelocityX(0)
      this.body.setVelocityY(-velocity)
      this.anims.play('move-up', true)
    } else if (movingX == 1 && movingY == -1) {
      this.body.setVelocityX(diagonalVelocity)
      this.body.setVelocityY(-diagonalVelocity)
      this.anims.play('move-up-right', true)
    } else if (movingX == 1 && movingY == 0) {
      this.body.setVelocityX(velocity)
      this.body.setVelocityY(0)
      this.anims.play('move-right', true)
    } else if (movingX == 1 && movingY == 1) {
      this.body.setVelocityX(diagonalVelocity)
      this.body.setVelocityY(diagonalVelocity)
      this.anims.play('move-down-right', true)
    } else if (movingX == 0 && movingY == 1) {
      this.body.setVelocityX(0)
      this.body.setVelocityY(velocity)
      this.anims.play('move-down', true)
    } else if (movingX == -1 && movingY == 1) {
      this.body.setVelocityX(-diagonalVelocity)
      this.body.setVelocityY(diagonalVelocity)
      this.anims.play('move-down-left', true)
    } else if (movingX == -1 && movingY == 0) {
      this.body.setVelocityX(-velocity)
      this.body.setVelocityY(0)
      this.anims.play('move-left', true)
    } else if (movingX == -1 && movingY == -1) {
      this.body.setVelocityX(-diagonalVelocity)
      this.body.setVelocityY(-diagonalVelocity)
      this.anims.play('move-up-left', true)
    } else {
      this.anims.stop()
      this.body.setVelocityX(0)
      this.body.setVelocityY(0)
    }
  }

  fire(cursors) {
    this.anims.stop()
    this.body.setVelocityX(0)
    this.body.setVelocityY(0)
  }

}
