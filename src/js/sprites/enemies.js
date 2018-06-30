import Enemy from 'sprites/enemy'

let SoldierBaseConfig = require('recipes/enemies/soldier.json')
let ImpBaseConfig = require('recipes/enemies/imp.json')

export default class Enemies extends Phaser.GameObjects.Group {

  constructor(scene, enemyProjectiles) {
    super(scene)
    this.projectiles = enemyProjectiles;
  }

  add(key, position) {
    let config = baseConfig(key)
    config.scene = this.scene
    config.projectiles = this.projectiles
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
