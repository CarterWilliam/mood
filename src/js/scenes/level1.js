import { Depth } from 'configuration/constants'
import Soldier from 'sprites/soldier'
import Enemy from 'sprites/enemy'
import Imp from 'sprites/imp'
import Projectiles from 'sprites/projectiles/projectiles'
import createAnimations from '../animations/create'

const SCALE = 1

export default class GameScene extends Phaser.Scene {

  constructor() {
    super({ key: 'level-1' })

    this.cursors = null
    this.player = null
    this.imp = null
  }

  create() {
    let map = this.make.tilemap({ key: 'level1-map' });
    let tileset = map.addTilesetImage('catriona', 'level1-tiles')

    let floor = map.createStaticLayer('floor', tileset, 0, 0);
    floor.setCollisionByProperty({ collide: true });
    floor.setScale(SCALE, SCALE)

    let onTheFloor = map.createStaticLayer('onthefloor', tileset, 0, 0);
    onTheFloor.setCollisionByProperty({ collide: true });
    onTheFloor.setScale(SCALE, SCALE)

    let foreground = map.createStaticLayer('foreground', tileset, 0, 0);
    foreground.setScale(SCALE, SCALE)
    foreground.setDepth(Depth.FOREGROUND)

    this.physics.world.setBounds(0, 0, 64*32*SCALE, 32*32*SCALE)

    createAnimations(this)

    let playerProjectiles = new Projectiles(this);

    let player = new Soldier({
      scene: this,
      key: 'soldier',
      x: 32*3, y: 32*30,
      projectiles: playerProjectiles
    })

    this.cameras.main.startFollow(player, true)

    let enemyProjectiles = new Projectiles(this)

    let imp = new Enemy({
      scene: this,
      key: 'imp',
      x: 32*3/2, y: 32*24,
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
    this.physics.add.collider(player, onTheFloor);
    this.physics.add.collider(imp, floor);
    this.physics.add.collider(imp, onTheFloor);
    this.physics.add.collider(player, imp);

    this.physics.add.collider(playerProjectiles, floor, function(projectile, tile) {
      projectile.destroy()
    });

    this.physics.add.collider(playerProjectiles, imp, function(projectile, imp) {
      imp.takeDamage(projectile.damage)
      projectile.destroy()
    })

    this.physics.add.collider(enemyProjectiles, floor, function(projectile, tile) {
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
