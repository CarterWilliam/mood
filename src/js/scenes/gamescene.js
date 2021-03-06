import { Depth } from 'configuration/constants'
import Player from 'sprites/player'
import Enemies from 'sprites/enemies'
import Items from 'sprites/items'
import Projectiles from 'sprites/projectiles/projectiles'
import createAnimations from 'animations/create'

const TILE_SIZE = 24
const SCALE = 1

const KeyCodes = Phaser.Input.Keyboard.KeyCodes

export default class GameScene extends Phaser.Scene {

  constructor(config) {
    super({ key: config.key })

    this.config = config

    this.cursors = null
    this.player = null
    this.enemies = null
  }

  create() {
    let map = this.make.tilemap({ key: this.config.map.tilemap });
    let tileset = map.addTilesetImage(this.config.map.tilemapName, this.config.map.image)

    let floor = map.createStaticLayer('floor', tileset, 0, 0);
    floor.setCollisionByProperty({ collide: true });
    floor.setScale(SCALE, SCALE)

    let lowObstacles = map.createStaticLayer('obstacle-low', tileset, 0, 0);
    lowObstacles.setCollisionByProperty({ collide: true });
    lowObstacles.setScale(SCALE, SCALE)

    let highObstacles = map.createStaticLayer('obstacle-high', tileset, 0, 0);
    highObstacles.setCollisionByProperty({ collide: true });
    highObstacles.setScale(SCALE, SCALE)

    let foreground = map.createStaticLayer('foreground', tileset, 0, 0);
    foreground.setScale(SCALE, SCALE)
    foreground.setDepth(Depth.FOREGROUND)


    let objectLayer = map.getObjectLayer('portals')
    
    let portals = objectLayer.objects.map(portalConfig => {
      let portal = this.add.zone(
        portalConfig.x, portalConfig.y,
        portalConfig.width, portalConfig.height)
      portal.destination = portalConfig.properties.goto
      this.physics.world.enable(portal, Phaser.Physics.Arcade.STATIC_BODY)
      return portal
    })

    let portalGroup = this.add.group(portals, {
      classType: Phaser.GameObjects.Zone
    })

    this.physics.world.setBounds(0, 0, 64*TILE_SIZE*SCALE, 32*TILE_SIZE*SCALE)

    createAnimations(this)

    let playerProjectiles = new Projectiles(this);

    let player = new Player({
      scene: this,
      key: 'player',
      x: TILE_SIZE*this.config.player.start.x,
      y: TILE_SIZE*this.config.player.start.y,
      projectiles: playerProjectiles
    })

    this.cameras.main.startFollow(player, true)

    let items = new Items(this)
    this.config.items.forEach(itemConfig => {
      items.add(
        itemConfig.key,
        {
          x: TILE_SIZE*itemConfig.location.x,
          y: TILE_SIZE*itemConfig.location.y
        }
      )
    })

    let enemyProjectiles = new Projectiles(this)
    let enemies = new Enemies(this, enemyProjectiles, items)
    this.config.enemies.forEach(enemyConfig => {
      enemies.add(
        enemyConfig.key,
        {
          x: TILE_SIZE*enemyConfig.location.x,
          y: TILE_SIZE*enemyConfig.location.y
        }
      )
    })

    this.physics.add.collider(player, floor);
    this.physics.add.collider(player, lowObstacles);
    this.physics.add.collider(player, highObstacles);
    this.physics.add.collider(enemies, floor);
    this.physics.add.collider(enemies, lowObstacles);
    this.physics.add.collider(enemies, highObstacles);
    this.physics.add.collider(player, enemies);

    this.physics.add.collider(playerProjectiles, floor, function(projectile, tile) {
      projectile.impact()
    })
    this.physics.add.collider(playerProjectiles, highObstacles, function(projectile, tile) {
      projectile.impact()
    })

    this.physics.add.collider(playerProjectiles, enemies, function(projectile, imp) {
      imp.takeDamage(projectile.damage)
      projectile.impact()
    })

    this.physics.add.collider(enemyProjectiles, floor, function(projectile, tile) {
      projectile.impact()
    })
    this.physics.add.collider(enemyProjectiles, highObstacles, function(projectile, tile) {
      projectile.impact()
    })

    this.physics.add.collider(enemyProjectiles, player, function(projectile, tile) {
      player.takeDamage(projectile.damage)
      projectile.impact()
    })

    this.physics.add.collider(items, player, function(item, tile) {
      item.onPickup(player)
    })

    let sceneManager = this.scene
    this.physics.add.collider(portalGroup, player, function(portal, plyr) {
      let currentScene = sceneManager.key
      let nextScene = portal.destination
      sceneManager.pause(currentScene)
      if (sceneManager.isSleeping(nextScene)) {
        sceneManager.resume(nextScene)
      } else {
        sceneManager.start(nextScene)
      }
    })

    let hud = this.scene.get('hud')
    hud.startWatching(this)
    this.scene.moveAbove(this.config.key, 'hud')
    this.scene.launch('hud')

    this.player = player
    this.enemies = enemies
    this.cursors = this.input.keyboard.addKeys({
      up: KeyCodes.UP,
      down: KeyCodes.DOWN,
      left: KeyCodes.LEFT,
      right: KeyCodes.RIGHT,
      space: KeyCodes.SPACE,
      shift: KeyCodes.SHIFT,

      pistol: KeyCodes.TWO,
      shotgun: KeyCodes.THREE,
      chaingun: KeyCodes.FOUR,
      rocketLauncher: KeyCodes.FIVE,
      plasmaRifle: KeyCodes.SIX,
      bfg9000: KeyCodes.SEVEN
    })
  }

  update(time) {
    this.player.update(this.cursors, time)
    this.enemies.getChildren().forEach(enemy => {
      enemy.update(time, this.player)
    })
  }
}
