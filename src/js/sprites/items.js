import Item from 'sprites/item'

const ClipBaseConfig = require('recipes/items/ammo/clip.json')

const ShotgunBaseConfig = require('recipes/items/guns/shotgun.json')


export default class Items extends Phaser.GameObjects.Group {

  constructor(scene) {
    super(scene)
  }
  
  add(key, position) {
    let config = baseConfig(key)
    config.scene = this.scene
    config.x = position.x
    config.y = position.y
    super.add(new Item(config), true)
  }
}

function baseConfig(key) {
  switch(key) {
    case 'clip': return ClipBaseConfig
    case 'shotgun': return ShotgunBaseConfig
  }
}
