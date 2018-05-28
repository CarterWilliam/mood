import Soldier from './sprites/soldier'

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
var player;

function preload() {
  this.load.image('tiles', 'assets/images/magecity.png');
  this.load.tilemapTiledJSON('map', 'assets/maps/corridor-town.json');
  this.load.spritesheet('soldier', 'assets/images/soldier.png', { frameWidth: 60, frameHeight: 60 });
}

function create() {
  map = this.make.tilemap({ key: 'map' });
  var tileset = map.addTilesetImage('magecity', 'tiles')
  var floor = map.createStaticLayer('floor', tileset, 0, 0);
  var onTheFloor = map.createStaticLayer('overfloor', tileset, 0, 0);
  var obstructions = map.createStaticLayer('obstructions', tileset, 0, 0);

  obstructions.setCollisionByProperty({ collide: true });

  player = new Soldier({
    scene: this,
    key: 'soldier',
    x: 100, y: 300
  })

  this.anims.create({
    key: 'move-down',
    frames: this.anims.generateFrameNumbers('soldier', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'move-down-left',
    frames: this.anims.generateFrameNumbers('soldier', { start: 7, end: 10 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'move-left',
    frames: this.anims.generateFrameNumbers('soldier', { start: 14, end: 17 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'move-up-left',
    frames: this.anims.generateFrameNumbers('soldier', { start: 21, end: 24 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'move-up',
    frames: this.anims.generateFrameNumbers('soldier', { start: 28, end: 31 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'move-up-right',
    frames: this.anims.generateFrameNumbers('soldier', { start: 35, end: 38 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'move-right',
    frames: this.anims.generateFrameNumbers('soldier', { start: 42, end: 45 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'move-down-right',
    frames: this.anims.generateFrameNumbers('soldier', { start: 49, end: 52 }),
    frameRate: 10,
    repeat: -1
  });

  this.physics.add.collider(player, obstructions);

  var foreground = map.createStaticLayer('foreground', tileset, 0, 0);

  cursors = this.input.keyboard.createCursorKeys();

}

function update() {
  player.update(cursors)
}
