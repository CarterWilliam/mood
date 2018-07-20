import { Depth, Direction, directionKey } from 'configuration/constants'
import GunCarrying from 'sprites/guncarrying'
import Killable from 'sprites/killable'
import Sprite from './sprite'

const velocity = 160;
const diagonalVelocity = Math.floor(velocity / Math.SQRT2);

const State = Object.freeze({
  NORMAL: 0,
  FIRING: 1,
  FIRING_OVER: 2,
  DEAD: 3
})

export default class Player extends GunCarrying(Killable(Sprite)) {

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

  update(cursors, time) {
    switch (this.state) {
      case State.NORMAL:
        this.action(cursors, time)
        break
      case State.FIRING:
        this.whileFiring(cursors, time)
        break
      case State.FIRING_OVER:
        this.whileFinishingFiring()
        break
      case State.DEAD:
        this.whileDead()
    }
  }

  action(cursors, time) {
    if (cursors.space.isDown && this.canFire()) {
      this.startFiring(cursors, time)
    } else {
      if (cursors.pistol.isDown) {
        this.equip("pistol")
      } else if (cursors.shotgun.isDown) {
        this.equip("shotgun")
      } else if (cursors.chaingun.isDown) {
        this.equip("chaingun")
      }
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
    this.anims.play(`player-move-${directionKey(this.direction)}`, true)
  }

  startFiring(cursors, time) {
    this.state = State.FIRING

    this.body.setVelocityX(0)
    this.body.setVelocityY(0)

    this.whileFiring(cursors, time)
  }

  whileFiring(cursors, time) {
    if (cursors.space.isDown && this.canFire()) {
      let fired = this.equipped.fire(this, this.direction, time)
      if (fired) this.anims.play(`player-shoot-${directionKey(this.direction)}`, true)
    } else {
      this.state = State.FIRING_OVER
    }
  }

  whileFinishingFiring() {
    if (!this.anims.isPlaying) {
      this.state = State.NORMAL
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
