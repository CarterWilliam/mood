const velocity = 160;
const diagonalVelocity = Math.floor(velocity / Math.SQRT2);

const Direction = Object.freeze({
  WEST: Math.PI,
  NORTHWEST: Math.PI * 5/4,
  NORTH: Math.PI * 3/2,
  NORTHEAST: Math.PI * 7/4,
  EAST: 0,
  SOUTHEAST: Math.PI / 4,
  SOUTH: Math.PI / 2,
  SOUTHWEST: Math.PI * 3/ 4
})

export default class Soldier extends Phaser.GameObjects.Sprite {

  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.body.setSize(30, 30)
    this.body.setOffset(15,30)
    this.body.setCollideWorldBounds(true)

    this.projectiles = config.projectiles

    this.direction = Direction.SOUTH
    this.firing = false
    this.fired = false
  }

  update(cursors) {
    if(this.firing) {
      this.whileFiring()
    } else{
      this.action(cursors)
    }
  }

  action(cursors) {
    if (cursors.space.isDown) {
      this.startFiring(cursors)
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

    var moving = Math.abs(movingX) === 1 || Math.abs(movingY) === 1

    if (movingX == 0 && movingY == -1) {
      this.body.setVelocityX(0)
      this.body.setVelocityY(-velocity)
      if (!cursors.shift.isDown) {
        this.direction = Direction.NORTH
      }
    } else if (movingX == 1 && movingY == -1) {
      this.body.setVelocityX(diagonalVelocity)
      this.body.setVelocityY(-diagonalVelocity)
      if (!cursors.shift.isDown) {
        this.direction = Direction.NORTHEAST
      }
    } else if (movingX == 1 && movingY == 0) {
      this.body.setVelocityX(velocity)
      this.body.setVelocityY(0)
      if (!cursors.shift.isDown) {
        this.direction = Direction.EAST
      }
    } else if (movingX == 1 && movingY == 1) {
      this.body.setVelocityX(diagonalVelocity)
      this.body.setVelocityY(diagonalVelocity)
      if (!cursors.shift.isDown) {
        this.direction = Direction.SOUTHEAST
      }
    } else if (movingX == 0 && movingY == 1) {
      this.body.setVelocityX(0)
      this.body.setVelocityY(velocity)
      if (!cursors.shift.isDown) {
        this.direction = Direction.SOUTH
      }
    } else if (movingX == -1 && movingY == 1) {
      this.body.setVelocityX(-diagonalVelocity)
      this.body.setVelocityY(diagonalVelocity)
      if (!cursors.shift.isDown) {
        this.direction = Direction.SOUTHWEST
      }
    } else if (movingX == -1 && movingY == 0) {
      this.body.setVelocityX(-velocity)
      this.body.setVelocityY(0)
      if (!cursors.shift.isDown) {
        this.direction = Direction.WEST
      }
    } else if (movingX == -1 && movingY == -1) {
      this.body.setVelocityX(-diagonalVelocity)
      this.body.setVelocityY(-diagonalVelocity)
      if (!cursors.shift.isDown) {
        this.direction = Direction.NORTHWEST
      }
    } else {
      this.anims.stop()
      this.body.setVelocityX(0)
      this.body.setVelocityY(0)
    }

    if (moving) { this.animateMovement() }
  }

  animateMovement() {
    switch(this.direction) {
      case Direction.WEST:
        this.anims.play('soldier-move-west', true);
        break;
      case Direction.NORTHWEST:
        this.anims.play('soldier-move-north-west', true);
        break;
      case Direction.NORTH:
        this.anims.play('soldier-move-north', true);
        break;
      case Direction.NORTHEAST:
        this.anims.play('soldier-move-north-east', true);
        break;
      case Direction.EAST:
        this.anims.play('soldier-move-east', true);
        break;
      case Direction.SOUTHEAST:
        this.anims.play('soldier-move-south-east', true);
        break;
      case Direction.SOUTH:
        this.anims.play('soldier-move-south', true);
        break;
      case Direction.SOUTHWEST:
        this.anims.play('soldier-move-south-west', true);
        break;
    }
  }

  startFiring(cursors) {
    this.firing = true

    this.body.setVelocityX(0)
    this.body.setVelocityY(0)

    switch(this.direction) {
      case Direction.WEST:
        this.anims.play('soldier-shoot-west');
        break;
      case Direction.NORTHWEST:
        this.anims.play('soldier-shoot-north-west');
        break;
      case Direction.NORTH:
        this.anims.play('soldier-shoot-north');
        break;
      case Direction.NORTHEAST:
        this.anims.play('soldier-shoot-north-east');
        break;
      case Direction.EAST:
        this.anims.play('soldier-shoot-east');
        break;
      case Direction.SOUTHEAST:
        this.anims.play('soldier-shoot-south-east');
        break;
      case Direction.SOUTH:
        this.anims.play('soldier-shoot-south');
        break;
      case Direction.SOUTHWEST:
        this.anims.play('soldier-shoot-south-west');
        break;
    }
    this.anims.stopOnRepeat()
  }

  whileFiring() {
    if (!this.fired && this.isShootFrame(this.anims.currentFrame.textureFrame)) {
      this.projectiles.addBullet(this, { x: this.x, y: this.y }, this.direction)
      this.fired = true
    }

    if (!this.anims.isPlaying) {
      // Finish shooting
      this.firing = false
      this.fired = false
    }
  }

  isShootFrame(index) {
    return (index % 7 == 5)
  }

}
