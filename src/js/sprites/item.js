export default class Item extends Phaser.GameObjects.Sprite {

  constructor(config) {
    super(config.scene, config.x, config.y, config.key);

    this.key = config.key

    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
  }

  onPickup(player) {
    switch(this.key) {
      case 'clip':
        player.ammo += 4
        this.scene.events.emit('ammoChange', player.ammo)
        this.scene.sound.play('weapon-pickup')
        break
    }

    this.destroy()
  }
}
