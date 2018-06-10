import { Depth } from './constants'
import Soldier from './sprites/soldier'
import Enemy from './sprites/enemy'
import Imp from './sprites/imp'
import Projectiles from './sprites/projectiles/projectiles'
import createAnimations from './animations/create'
import BootScene from './states/boot'
import LoadingScene from './states/loading'
import MenuScene from './states/menu'

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#2d2d2d',
  parent: 'game-container',
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: [ BootScene, LoadingScene, MenuScene ]
};

const SCALE = 2

var game = new Phaser.Game(config)

var cursors
var player, imp

function preload() {
  this.load.image('tiles', 'assets/maps/emptytown.png')

  this.load.image('bullet', 'assets/images/bullet.png')
  this.load.spritesheet('fireball', 'assets/images/fireball.png', { frameWidth: 15, frameHeight: 15 })

  this.load.tilemapTiledJSON('map', 'assets/maps/emptytown.json');
  this.load.spritesheet('soldier', 'assets/images/soldier.png', { frameWidth: 60, frameHeight: 60 });
  this.load.spritesheet('imp', 'assets/images/imp.png', { frameWidth: 60, frameHeight: 60, endFrame: 68 });
}

function create() {
  let map = this.make.tilemap({ key: 'map' });
  let tileset = map.addTilesetImage('emptytown', 'tiles')

  let floor = map.createStaticLayer('floor', tileset, 0, 0);
  floor.setCollisionByProperty({ collide: true });
  floor.setScale(SCALE, SCALE)

  let onTheFloor = map.createStaticLayer('onthefloor', tileset, 0, 0);
  onTheFloor.setCollisionByProperty({ collide: true });
  onTheFloor.setScale(SCALE, SCALE)

  let foreground = map.createStaticLayer('foreground', tileset, 0, 0);
  foreground.setScale(SCALE, SCALE)
  foreground.setDepth(Depth.FOREGROUND)

  this.physics.world.setBounds(0, 0, 32*16*SCALE, 64*16*SCALE)

  createAnimations(this)

  let playerProjectiles = new Projectiles(this);

  player = new Soldier({
    scene: this,
    key: 'soldier',
    x: 32*10, y: 32*10,
    projectiles: playerProjectiles
  })

  this.cameras.main.startFollow(player, true)

  let enemyProjectiles = new Projectiles(this)

  imp = new Enemy({
    scene: this,
    key: 'imp',
    x: 32*20, y: 32*20,
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
    projectile.destroy()
  })


  cursors = this.input.keyboard.createCursorKeys();
}

function update(time) {
  player.update(cursors)
  imp.update(time, player)
}
