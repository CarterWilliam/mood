import { Depth, Direction } from 'configuration/constants'
import BackPackable from 'sprites/backpackable'
import Killable from 'sprites/killable'
import Sprite from './sprite'

const velocity = 160;
const diagonalVelocity = Math.floor(velocity / Math.SQRT2);

const State = Object.freeze({
  NORMAL: 0,
  FIRING: 1,
  DEAD: 2
})

export default class Player extends BackPackable(Killable(Sprite)) {

  constructor(config) {
    config.key = 'player'
    config.health = 100
    super(config)

    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.body.setSize(30, 40)
    this.body.setOffset(15, 20)
    this.body.setCollideWorldBounds(true)

    this.setDepth(Depth.SPRITE)

    this.projectiles = config.projectiles

    this.direction = Direction.SOUTH
    this.state = State.NORMAL
  }

  update(cursors) {
    switch (this.state) {
      case State.NORMAL:
        this.action(cursors)
        break
      case State.FIRING:
        this.whileFiring()
        break
      case State.DEAD:
        this.whileDead()
    }
  }

  action(cursors) {
    if (cursors.space.isDown && this.canFire()) {
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
        this.anims.play('player-move-west', true);
        break;
      case Direction.NORTHWEST:
        this.anims.play('player-move-north-west', true);
        break;
      case Direction.NORTH:
        this.anims.play('player-move-north', true);
        break;
      case Direction.NORTHEAST:
        this.anims.play('player-move-north-east', true);
        break;
      case Direction.EAST:
        this.anims.play('player-move-east', true);
        break;
      case Direction.SOUTHEAST:
        this.anims.play('player-move-south-east', true);
        break;
      case Direction.SOUTH:
        this.anims.play('player-move-south', true);
        break;
      case Direction.SOUTHWEST:
        this.anims.play('player-move-south-west', true);
        break;
    }
  }

  startFiring(cursors) {

      this.state = State.FIRING
      this.fired = false

      this.body.setVelocityX(0)
      this.body.setVelocityY(0)

      switch(this.direction) {
        case Direction.WEST:
          this.anims.play('player-shoot-west');
          break;
        case Direction.NORTHWEST:
          this.anims.play('player-shoot-north-west');
          break;
      case Direction.NORTH:
        this.anims.play('player-shoot-north');
        break;
      case Direction.NORTHEAST:
        this.anims.play('player-shoot-north-east');
        break;
      case Direction.EAST:
        this.anims.play('player-shoot-east');
        break;
      case Direction.SOUTHEAST:
        this.anims.play('player-shoot-south-east');
        break;
      case Direction.SOUTH:
        this.anims.play('player-shoot-south');
        break;
      case Direction.SOUTHWEST:
        this.anims.play('player-shoot-south-west');
        break;
    }
    this.anims.stopOnRepeat()
  }

  whileFiring() {
    if (!this.fired && this.isShootFrame(this.anims.currentFrame.textureFrame)) {
      this.projectiles.addProjectile({
        owner: this,
        type: 'bullet',
        damage: 10,
        direction: this.direction,
        speed: 600})
      this.scene.sound.play('pistol')
      this.bullets -= 1
      this.scene.events.emit('ammoChange', this.bullets)
      this.fired = true
    }

    if (!this.anims.isPlaying) {
      this.state = State.NORMAL
      this.fired = false
    }
  }

  isShootFrame(index) {
    return (index >= 33 && index <= 47 && index % 2 === 1)
  }

  onDamage() {
    this.scene.events.emit('healthChange', this.health)
  }

  onDie() {
    this.scene.events.emit('healthChange', this.health)
    this.state = State.DEAD
  }

  whileDead() {
    // What can you do?
  }
}
