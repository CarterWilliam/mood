import BootScene from 'scenes/boot'
import LoadingScene from 'scenes/loading'
import MenuScene from 'scenes/menu'
import HudScene from 'scenes/hud'

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
  scene: [ BootScene, MenuScene, LoadingScene, HudScene ]
};

var game = new Phaser.Game(config)
