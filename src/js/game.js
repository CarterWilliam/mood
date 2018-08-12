import BootScene from 'scenes/boot'
import HudScene from 'scenes/hud'
import LoadingScene from 'scenes/loading'
import MenuScene from 'scenes/menu'

let levelConfig = require('recipes/levels/portal-test.json')

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
  scene: [ BootScene, MenuScene, new LoadingScene(levelConfig), HudScene ]
};

var game = new Phaser.Game(config)
