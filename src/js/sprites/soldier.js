const velocity = 160;
const diagonalVelocity = Math.floor(velocity / Math.SQRT2);

const Direction = Object.freeze({
  WEST: 0,
  NORTHWEST: 1,
  NORTH: 2,
  NORTHEAST: 3,
  EAST: 4,
  SOUTHEAST: 5,
  SOUTH: 6,
  SOUTHWEST: 7
})

export default class Soldier extends Phaser.GameObjects.Sprite {

  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.body.setSize(30, 30)
    this.body.setOffset(15,30)
    this.body.setCollideWorldBounds(true)

    this.direction = Direction.SOUTH
    this.firing = false
  }

  update(cursors) {
    if(this.firing) {
      this.continueFiring()
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
        this.anims.play('move-west', true);
        break;
      case Direction.NORTHWEST:
        this.anims.play('move-north-west', true);
        break;
      case Direction.NORTH:
        this.anims.play('move-north', true);
        break;
      case Direction.NORTHEAST:
        this.anims.play('move-north-east', true);
        break;
      case Direction.EAST:
        this.anims.play('move-east', true);
        break;
      case Direction.SOUTHEAST:
        this.anims.play('move-south-east', true);
        break;
      case Direction.SOUTH:
        this.anims.play('move-south', true);
        break;
      case Direction.SOUTHWEST:
        this.anims.play('move-south-west', true);
        break;
    }
  }

  startFiring(cursors) {
    this.firing = true

    this.body.setVelocityX(0)
    this.body.setVelocityY(0)

    switch(this.direction) {
      case Direction.WEST:
        this.anims.play('shoot-west');
        break;
      case Direction.NORTHWEST:
        this.anims.play('shoot-north-west');
        break;
      case Direction.NORTH:
        this.anims.play('shoot-north');
        break;
      case Direction.NORTHEAST:
        this.anims.play('shoot-north-east');
        break;
      case Direction.EAST:
        this.anims.play('shoot-east');
        break;
      case Direction.SOUTHEAST:
        this.anims.play('shoot-south-east');
        break;
      case Direction.SOUTH:
        this.anims.play('shoot-south');
        break;
      case Direction.SOUTHWEST:
        this.anims.play('shoot-south-west');
        break;
    }
    this.anims.stopOnRepeat()
  }

  continueFiring() {
    if (!this.anims.isPlaying) {
      // Finish shooting
      this.firing = false
    }
  }

}
