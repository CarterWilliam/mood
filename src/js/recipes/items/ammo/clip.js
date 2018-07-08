{
  onPickUp: function(scene, player) {
    player.ammo += 4
    scene.events.emit('ammoChange', player.ammo)
    scene.sound.play('weapon-pickup')
  }
}
