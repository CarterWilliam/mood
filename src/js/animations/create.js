module.exports = function(goLoader) {

  // Soldier
  createConsecutiveAnimation('soldier', 'soldier-move-south', 0, 3)
  createAnimation('soldier', 'soldier-shoot-south', [ 4, 5, 4 ])
  createConsecutiveAnimation('soldier', 'soldier-hit-south', 6, 6)
  createConsecutiveAnimation('soldier', 'soldier-move-south-west', 7, 10)
  createAnimation('soldier', 'soldier-shoot-south-west', [ 11, 12, 11])
  createConsecutiveAnimation('soldier', 'soldier-hit-south-west', 13, 13)
  createConsecutiveAnimation('soldier', 'soldier-move-west', 14, 17)
  createAnimation('soldier', 'soldier-shoot-west', [ 18, 19, 18 ])
  createConsecutiveAnimation('soldier', 'soldier-hit-west', 20, 20)
  createConsecutiveAnimation('soldier', 'soldier-move-north-west', 21, 24)
  createAnimation('soldier', 'soldier-shoot-north-west', [ 25, 26, 25 ])
  createConsecutiveAnimation('soldier', 'soldier-hit-north-west', 27, 27)
  createConsecutiveAnimation('soldier', 'soldier-move-north', 28, 31)
  createAnimation('soldier', 'soldier-shoot-north', [32, 33, 32])
  createConsecutiveAnimation('soldier', 'soldier-hit-north', 34, 34)
  createConsecutiveAnimation('soldier', 'soldier-move-north-east', 35, 38)
  createAnimation('soldier', 'soldier-shoot-north-east', [ 39, 40, 39 ])
  createConsecutiveAnimation('soldier', 'soldier-hit-north-east', 41, 41)
  createConsecutiveAnimation('soldier', 'soldier-move-east', 42, 45)
  createAnimation('soldier', 'soldier-shoot-east', [ 46, 47, 46 ])
  createConsecutiveAnimation('soldier', 'soldier-hit-east', 48, 48)
  createConsecutiveAnimation('soldier', 'soldier-move-south-east', 49, 52)
  createAnimation('soldier', 'soldier-shoot-south-east', [ 53, 54, 53 ])
  createConsecutiveAnimation('soldier', 'soldier-hit-south-east', 55, 55)

  // Imp
  createAnimation('imp', 'imp-hang', [0, 2], 2)
  createConsecutiveAnimation('imp', 'imp-move-south', 0, 3)

  function createConsecutiveAnimation(spriteSheetId, id, fromIndex, toIndex) {
    goLoader.anims.create({
      key: id,
      frames: goLoader.anims.generateFrameNumbers(spriteSheetId, { start: fromIndex, end: toIndex }),
      frameRate: 10,
      repeat: -1
    });
  }

  function createAnimation(spriteSheetId, id, frames, framerate) {
    framerate = framerate || 10
    goLoader.anims.create({
      key: id,
      frames: goLoader.anims.generateFrameNumbers(spriteSheetId, { frames: frames }),
      frameRate: framerate,
      repeat: -1
    });
  }

}
