import Soldier from './sprites/soldier'
import Enemy from './sprites/enemy'
import Imp from './sprites/imp'
import Projectiles from './sprites/projectiles/projectiles'
import createAnimations from './animations/create'

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#2d2d2d',
  parent: 'phaser-example',
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);
var map;
var cursors;
var player, imp;

function preload() {
  this.load.image('tiles', 'assets/images/magecity.png')

  this.load.image('bullet', 'assets/images/bullet.png')
  this.load.spritesheet('fireball', 'assets/images/fireball.png', { frameWidth: 15, frameHeight: 15 })

  this.load.tilemapTiledJSON('map', 'assets/maps/corridor-town.json');
  this.load.spritesheet('soldier', 'assets/images/soldier.png', { frameWidth: 60, frameHeight: 60 });
  this.load.spritesheet('imp', 'assets/images/imp.png', { frameWidth: 60, frameHeight: 60, endFrame: 68 });
}

function create() {
  map = this.make.tilemap({ key: 'map' });
  var tileset = map.addTilesetImage('magecity', 'tiles')
  var floor = map.createStaticLayer('floor', tileset, 0, 0);
  var onTheFloor = map.createStaticLayer('overfloor', tileset, 0, 0);
  var obstructions = map.createStaticLayer('obstructions', tileset, 0, 0);

  obstructions.setCollisionByProperty({ collide: true });

  createAnimations(this)

  let playerProjectiles = new Projectiles(this);

  player = new Soldier({
    scene: this,
    key: 'soldier',
    x: 100, y: 300,
    projectiles: playerProjectiles
  })

  let enemyProjectiles = new Projectiles(this)

  imp = new Enemy({
    scene: this,
    key: 'imp',
    x: 200, y: 200,
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

  this.physics.add.collider(player, obstructions);
  this.physics.add.collider(imp, obstructions);
  this.physics.add.collider(player, imp);

  this.physics.add.collider(playerProjectiles, obstructions, function(projectile, tile) {
    projectile.destroy()
  });

  this.physics.add.collider(playerProjectiles, imp, function(projectile, imp) {
    imp.takeDamage(projectile.damage)
    projectile.destroy()
  })

  this.physics.add.collider(enemyProjectiles, obstructions, function(projectile, tile) {
    projectile.destroy()
  })

  this.physics.add.collider(enemyProjectiles, player, function(projectile, tile) {
    projectile.destroy()
  })

  var foreground = map.createStaticLayer('foreground', tileset, 0, 0);

  cursors = this.input.keyboard.createCursorKeys();
}

function update(time) {
  player.update(cursors)
  imp.update(time, player)
}
