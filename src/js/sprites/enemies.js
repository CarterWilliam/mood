import Enemy from 'sprites/enemy'

const SoldierBaseConfig = require('recipes/enemies/soldier.json')
const ImpBaseConfig = require('recipes/enemies/imp.json')

export default class Enemies extends Phaser.GameObjects.Group {

  constructor(scene, enemyProjectiles, items) {
    super(scene)
    this.projectiles = enemyProjectiles
    this.items = items
  }

  add(key, position) {
    let config = baseConfig(key)
    config.scene = this.scene
    config.projectiles = this.projectiles
    config.items = this.items
    config.x = position.x
    config.y = position.y
    let enemy = new Enemy(config)
    super.add(enemy, true)
  }
}

function baseConfig(key) {
  switch(key) {
    case 'soldier': return SoldierBaseConfig
    case 'imp': return ImpBaseConfig
  }
}
