import Item from 'sprites/item'

const ClipBaseConfig = require('recipes/items/ammo/clip.json')

const ArmourBonusBaseConfig = require('recipes/items/bonuses/armour-bonus.json')

const ShotgunBaseConfig = require('recipes/items/guns/shotgun.json')
const ChaingunBaseConfig = require('recipes/items/guns/chaingun.json')


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

    case 'armour-bonus': return ArmourBonusBaseConfig

    case 'shotgun': return ShotgunBaseConfig
    case 'chaingun': return ChaingunBaseConfig
  }
}
