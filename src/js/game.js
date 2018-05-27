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
  console.log("preload")
  this.load.image('tiles', 'src/assets/images/magecity.png');
  this.load.tilemapTiledJSON('map', 'src/assets/maps/corridor-town.json');
  this.load.spritesheet('soldier', 'src/assets/images/soldier.png', { frameWidth: 60, frameHeight: 60 });
}

function create() {
  console.log("create")
  map = this.make.tilemap({ key: 'map' });
  var tileset = map.addTilesetImage('magecity', 'tiles')
  var floor = map.createStaticLayer('floor', tileset, 0, 0);
  var onTheFloor = map.createStaticLayer('overfloor', tileset, 0, 0);
  var obstructions = map.createStaticLayer('obstructions', tileset, 0, 0);

  obstructions.setCollisionByProperty({ collide: true });

  player = this.physics.add.sprite(100, 450, 'soldier');
  player.body.setSize(30, 30);
  player.body.setOffset(15,30)
  player.setCollideWorldBounds(true);
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

var velocity = 160;
var diagonalVelocity = Math.floor(velocity / Math.SQRT2);

function update() {
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

  if (movingX == 0 && movingY == -1) {
    player.setVelocityX(0)
    player.setVelocityY(-velocity)
    player.anims.play('move-up', true)
  } else if (movingX == 1 && movingY == -1) {
    player.setVelocityX(diagonalVelocity)
    player.setVelocityY(-diagonalVelocity)
    player.anims.play('move-up-right', true)
  } else if (movingX == 1 && movingY == 0) {
    player.setVelocityX(velocity)
    player.setVelocityY(0)
    player.anims.play('move-right', true)
  } else if (movingX == 1 && movingY == 1) {
    player.setVelocityX(diagonalVelocity)
    player.setVelocityY(diagonalVelocity)
    player.anims.play('move-down-right', true)
  } else if (movingX == 0 && movingY == 1) {
    player.setVelocityX(0)
    player.setVelocityY(velocity)
    player.anims.play('move-down', true)
  } else if (movingX == -1 && movingY == 1) {
    player.setVelocityX(-diagonalVelocity)
    player.setVelocityY(diagonalVelocity)
    player.anims.play('move-down-left', true)
  } else if (movingX == -1 && movingY == 0) {
    player.setVelocityX(-velocity)
    player.setVelocityY(0)
    player.anims.play('move-left', true)
  } else if (movingX == -1 && movingY == -1) {
    player.setVelocityX(-diagonalVelocity)
    player.setVelocityY(-diagonalVelocity)
    player.anims.play('move-up-left', true)
  } else {
    player.anims.stop()
    player.setVelocityX(0)
    player.setVelocityY(0)
  }
}
