import Killable from './killable'
import Sprite from './sprite'
import {
  Direction,
  directionKey,
  PiOver8,
  TwoPi
} from 'configuration/constants'

const State = Object.freeze({
  PASSIVE: 0,
  AGGRESSIVE: 1,
  SHOOTING: 2,
  CHACHA: 3,
  BERSERK: 4,
  DEAD: 5
})

export default class Enemy extends Killable(Sprite) {

  constructor(config) {
    super(config);

    this.assetKey = config.key
    this.speed = config.speed
    this.sight = config.sight
    this.projectiles = config.projectiles
    this.projectileConfig = config.projectileConfig
    this.shootDuration = config.shootDuration

    this.state = State.PASSIVE
    this.direction = Direction.SOUTH
    this.lastShot = 0
    this.anims.play(`${this.assetKey}-passive`, true)
  }

  update(time, player) {
    switch (this.state) {
      case State.PASSIVE:
        this.passiveUpdate(time, player)
        break
      case State.AGGRESSIVE:
        this.aggressiveUpdate(time, player)
        break
      case State.CHACHA:
        this.chaChaUpdate()
        break
    }
  }

  passiveUpdate(time, player) {
    if (Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y) < this.sight) {
      this.turnAggressive()
    }
  }

  turnAggressive() {
    this.state = State.AGGRESSIVE
    this.scene.sound.play(`${this.assetKey}-sight`)
  }

  aggressiveUpdate(time, player) {
    if(this.canShoot(time)) {
      this.shoot(time, player)
    } else {
      this.moveTo(player)
    }
  }

  chaChaUpdate() {
    if (!this.anims.isPlaying) {
      this.state = State.AGGRESSIVE
    }
  }

  canShoot(time) {
    return (time - this.lastShot > this.shootDuration);
  }

  shoot(time, player) {
    this.state = State.SHOOTING

    this.body.setVelocityX(0)
    this.body.setVelocityY(0)

    this.lookAtPlayer(player)

    this.anims.play(`${this.assetKey}-shoot-${directionKey(this.direction)}`)
    this.once('animationcomplete', function(event) {
      this.fire(time, player)
    })
  }

  fire(time, player) {
    if (this.state === State.SHOOTING) {
      let projectile = {...this.projectileConfig,
        owner: this,
        direction: this.angleToPlayer(player)
      }
      this.projectiles.addProjectile(projectile)
      this.lastShot = time
      this.state = State.AGGRESSIVE
    }
  }

  lookAtPlayer(player) {
    let angleToPlayer = this.angleToPlayer(player)
    this.direction = this.directionForAngle(angleToPlayer)
  }

  moveTo(player) {
    this.lookAtPlayer(player)

    this.body.setVelocityX(Math.cos(this.direction) * this.speed)
    this.body.setVelocityY(Math.sin(this.direction) * this.speed)

    this.anims.play(`${this.assetKey}-move-${directionKey(this.direction)}`, true)
  }

  angleToPlayer(player) {
    return Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y)
  }

  directionForAngle(angle) {
    return [
      Direction.EAST,
      Direction.SOUTHEAST,
      Direction.SOUTH,
      Direction.SOUTHWEST,
      Direction.WEST,
      Direction.NORTHWEST,
      Direction.NORTH,
      Direction.NORTHEAST
    ].find(direction => {
      return Math.abs(angle - direction) <= PiOver8 ||
        Math.abs(angle - direction + TwoPi) <= PiOver8
    })
  }

  onDamage() {
    this.state = State.CHACHA
    this.anims.play(`${this.assetKey}-hit-${directionKey(this.direction)}`)
  }

  onDie() {
    this.state = State.DEAD
  }
}
