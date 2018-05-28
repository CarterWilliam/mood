module.exports = function(goLoader) {

  // Soldier
  createConsecutiveAnimation('soldier', 'move-south', 0, 3)
  createAnimation('soldier', 'shoot-south', [ 4, 5, 4 ])
  createConsecutiveAnimation('soldier', 'hit-south', 6, 6)
  createConsecutiveAnimation('soldier', 'move-south-west', 7, 10)
  createAnimation('soldier', 'shoot-south-west', [ 11, 12, 11])
  createConsecutiveAnimation('soldier', 'hit-south-west', 13, 13)
  createConsecutiveAnimation('soldier', 'move-west', 14, 17)
  createAnimation('soldier', 'shoot-west', [ 18, 19, 18 ])
  createConsecutiveAnimation('soldier', 'hit-west', 20, 20)
  createConsecutiveAnimation('soldier', 'move-north-west', 21, 24)
  createAnimation('soldier', 'shoot-north-west', [ 25, 26, 25 ])
  createConsecutiveAnimation('soldier', 'hit-north-west', 27, 27)
  createConsecutiveAnimation('soldier', 'move-north', 28, 31)
  createAnimation('soldier', 'shoot-north', [32, 33, 32])
  createConsecutiveAnimation('soldier', 'hit-north', 34, 34)
  createConsecutiveAnimation('soldier', 'move-north-east', 35, 38)
  createAnimation('soldier', 'shoot-north-east', [ 39, 40, 39 ])
  createConsecutiveAnimation('soldier', 'hit-north-east', 41, 41)
  createConsecutiveAnimation('soldier', 'move-east', 42, 45)
  createAnimation('soldier', 'shoot-east', [ 46, 47, 46 ])
  createConsecutiveAnimation('soldier', 'hit-east', 48, 48)
  createConsecutiveAnimation('soldier', 'move-south-east', 49, 52)
  createAnimation('soldier', 'shoot-south-east', [ 53, 54, 53 ])
  createConsecutiveAnimation('soldier', 'hit-south-east', 55, 55)

  function createConsecutiveAnimation(spriteSheetId, id, fromIndex, toIndex) {
    goLoader.anims.create({
      key: id,
      frames: goLoader.anims.generateFrameNumbers(spriteSheetId, { start: fromIndex, end: toIndex }),
      frameRate: 10,
      repeat: -1
    });
  }

  function createAnimation(spriteSheetId, id, frames) {
    goLoader.anims.create({
      key: id,
      frames: goLoader.anims.generateFrameNumbers(spriteSheetId, { frames: frames }),
      frameRate: 10,
      repeat: -1
    });
  }

}
