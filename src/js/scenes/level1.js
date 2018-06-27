import { Depth } from 'configuration/constants'
import Player from 'sprites/player'
import Enemy from 'sprites/enemy'
import Imp from 'sprites/imp'
import Projectiles from 'sprites/projectiles/projectiles'
import createAnimations from '../animations/create'

const TILE_SIZE = 24
const SCALE = 1

export default class GameScene extends Phaser.Scene {

  constructor() {
    super({ key: 'level-1' })

    this.cursors = null
    this.player = null
    this.imp = null
  }

  create() {
    let map = this.make.tilemap({ key: 'map-futuristic' });
    let tileset = map.addTilesetImage('futuristic', 'tiles-futuristic')

    let floor = map.createStaticLayer('floor', tileset, 0, 0);
    floor.setCollisionByProperty({ collide: true });
    floor.setScale(SCALE, SCALE)

    let lowObstacles = map.createStaticLayer('obstacle-low', tileset, 0, 0);
    lowObstacles.setCollisionByProperty({ collide: true });
    lowObstacles.setScale(SCALE, SCALE)

    let highObstacles = map.createStaticLayer('obstacle-high', tileset, 0, 0);
    highObstacles.setCollisionByProperty({ collide: true });
    highObstacles.setScale(SCALE, SCALE)

    let foreground = map.createStaticLayer('foreground', tileset, 0, 0);
    foreground.setScale(SCALE, SCALE)
    foreground.setDepth(Depth.FOREGROUND)

    this.physics.world.setBounds(0, 0, 64*TILE_SIZE*SCALE, 32*TILE_SIZE*SCALE)

    createAnimations(this)

    let playerProjectiles = new Projectiles(this);

    let player = new Player({
      scene: this,
      key: 'player',
      x: TILE_SIZE*2, y: TILE_SIZE*25,
      projectiles: playerProjectiles
    })

    this.cameras.main.startFollow(player, true)

    let enemyProjectiles = new Projectiles(this)

    let imp = new Enemy({
      scene: this,
      key: 'imp',
      x: TILE_SIZE*4, y: TILE_SIZE*17.6,
      health: 60,
      speed: 50,
      sight: 100,
      projectiles: enemyProjectiles,
      projectileConfig: {
        type: 'fireball',
        speed: 300,
        damage: 20
      },
      shootDuration: 4000})

    this.physics.add.collider(player, floor);
    this.physics.add.collider(player, lowObstacles);
    this.physics.add.collider(player, highObstacles);
    this.physics.add.collider(imp, floor);
    this.physics.add.collider(imp, lowObstacles);
    this.physics.add.collider(imp, highObstacles);
    this.physics.add.collider(player, imp);

    this.physics.add.collider(playerProjectiles, floor, function(projectile, tile) {
      projectile.destroy()
    });
    this.physics.add.collider(playerProjectiles, highObstacles, function(projectile, tile) {
      projectile.destroy()
    });

    this.physics.add.collider(playerProjectiles, imp, function(projectile, imp) {
      imp.takeDamage(projectile.damage)
      projectile.destroy()
    })

    this.physics.add.collider(enemyProjectiles, floor, function(projectile, tile) {
      projectile.destroy()
    })
    this.physics.add.collider(enemyProjectiles, highObstacles, function(projectile, tile) {
      projectile.destroy()
    })

    this.physics.add.collider(enemyProjectiles, player, function(projectile, tile) {
      player.takeDamage(projectile.damage)
      projectile.destroy()
    })

    this.player = player
    this.imp = imp
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time) {
    this.player.update(this.cursors)
    this.imp.update(time, this.player)
  }
}
