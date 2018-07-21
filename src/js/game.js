import BootScene from 'scenes/boot'
import HudScene from 'scenes/hud'
import LoadingScene from 'scenes/loading'
import MenuScene from 'scenes/menu'

let level1Config = require('recipes/levels/level1.json')

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
  scene: [ BootScene, MenuScene, new LoadingScene(level1Config), HudScene ]
};

var game = new Phaser.Game(config)
