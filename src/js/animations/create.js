module.exports = function(goLoader) {

  // Player
  createConsecutiveAnimation('player', 'player-move-south', 0, 3)
  createConsecutiveAnimation('player', 'player-move-south-west', 4, 7)
  createConsecutiveAnimation('player', 'player-move-west', 8, 11)
  createConsecutiveAnimation('player', 'player-move-north-west', 12, 15)
  createConsecutiveAnimation('player', 'player-move-north', 16, 19)
  createConsecutiveAnimation('player', 'player-move-north-east', 20, 23)
  createConsecutiveAnimation('player', 'player-move-east', 24, 27)
  createConsecutiveAnimation('player', 'player-move-south-east', 28, 31)
  createAnimation('player', 'player-shoot-south', [ 32, 33, 32 ])
  createAnimation('player', 'player-shoot-south-west', [ 34, 35, 34 ])
  createAnimation('player', 'player-shoot-west', [ 36, 37, 36 ])
  createAnimation('player', 'player-shoot-north-west', [ 38, 39, 38 ])
  createAnimation('player', 'player-shoot-north', [ 40, 41, 40 ])
  createAnimation('player', 'player-shoot-north-east', [ 42, 43, 42 ])
  createAnimation('player', 'player-shoot-east', [ 44, 45, 44 ])
  createAnimation('player', 'player-shoot-south-east', [ 46, 47, 46 ])
  createAnimation('player', 'player-die', [ 48, 56, 57, 58, 59, 60, 61, 62 ], 10, 0)

  // Soldier
  createAnimation('soldier', 'soldier-passive', [ 0, 2 ], 2)
  createConsecutiveAnimation('soldier', 'soldier-move-south', 0, 3)
  createAnimation('soldier', 'soldier-shoot-south', [ 4, 5, 4 ], 8, 0)
  createConsecutiveAnimation('soldier', 'soldier-hit-south', 6, 6)
  createConsecutiveAnimation('soldier', 'soldier-move-south-west', 7, 10)
  createAnimation('soldier', 'soldier-shoot-south-west', [ 11, 12, 11], 8, 0)
  createConsecutiveAnimation('soldier', 'soldier-hit-south-west', 13, 13)
  createConsecutiveAnimation('soldier', 'soldier-move-west', 14, 17)
  createAnimation('soldier', 'soldier-shoot-west', [ 18, 19, 18 ], 8, 0)
  createConsecutiveAnimation('soldier', 'soldier-hit-west', 20, 20)
  createConsecutiveAnimation('soldier', 'soldier-move-north-west', 21, 24)
  createAnimation('soldier', 'soldier-shoot-north-west', [ 25, 26, 25 ], 8, 0)
  createConsecutiveAnimation('soldier', 'soldier-hit-north-west', 27, 27)
  createConsecutiveAnimation('soldier', 'soldier-move-north', 28, 31)
  createAnimation('soldier', 'soldier-shoot-north', [32, 33, 32], 8, 0)
  createConsecutiveAnimation('soldier', 'soldier-hit-north', 34, 34)
  createConsecutiveAnimation('soldier', 'soldier-move-north-east', 35, 38)
  createAnimation('soldier', 'soldier-shoot-north-east', [ 39, 40, 39 ], 8, 0)
  createConsecutiveAnimation('soldier', 'soldier-hit-north-east', 41, 41)
  createConsecutiveAnimation('soldier', 'soldier-move-east', 42, 45)
  createAnimation('soldier', 'soldier-shoot-east', [ 46, 47, 46 ], 8, 0)
  createConsecutiveAnimation('soldier', 'soldier-hit-east', 48, 48)
  createConsecutiveAnimation('soldier', 'soldier-move-south-east', 49, 52)
  createAnimation('soldier', 'soldier-shoot-south-east', [ 53, 54, 53 ], 8, 0)
  createConsecutiveAnimation('soldier', 'soldier-hit-south-east', 55, 55)
  createAnimation('soldier', 'soldier-die', [56, 57, 58, 59, 60], 10, 0)

  // Imp
  createAnimation('imp', 'imp-passive', [0, 2], 2)
  createConsecutiveAnimation('imp', 'imp-move-south', 0, 3)
  createAnimation('imp', 'imp-shoot-south', [ 4, 5, 6 ], 8, 0)
  createConsecutiveAnimation('imp', 'imp-hit-south', 7, 7)
  createConsecutiveAnimation('imp', 'imp-move-south-west', 8, 11)
  createAnimation('imp', 'imp-shoot-south-west', [ 12, 13, 14 ], 8, 0)
  createConsecutiveAnimation('imp', 'imp-hit-south-west', 15, 15)
  createConsecutiveAnimation('imp', 'imp-move-west', 16, 19)
  createAnimation('imp', 'imp-shoot-west', [ 20, 21, 22 ], 8, 0)
  createConsecutiveAnimation('imp', 'imp-hit-west', 23, 23)
  createConsecutiveAnimation('imp', 'imp-move-north-west', 24, 27)
  createAnimation('imp', 'imp-shoot-north-west', [ 28, 29, 30 ], 8, 0)
  createConsecutiveAnimation('imp', 'imp-hit-north-west', 31, 31)
  createConsecutiveAnimation('imp', 'imp-move-north', 32, 35)
  createAnimation('imp', 'imp-shoot-north', [36, 37, 38], 8, 0)
  createConsecutiveAnimation('imp', 'imp-hit-north', 39, 39)
  createConsecutiveAnimation('imp', 'imp-move-south-east', 40, 43)
  createAnimation('imp', 'imp-shoot-south-east', [ 44, 45, 46 ], 8, 0)
  createConsecutiveAnimation('imp', 'imp-hit-south-east', 47, 47)
  createConsecutiveAnimation('imp', 'imp-move-east', 48, 51)
  createAnimation('imp', 'imp-shoot-east', [ 52, 53, 54 ], 8, 0)
  createConsecutiveAnimation('imp', 'imp-hit-east', 55, 55)
  createConsecutiveAnimation('imp', 'imp-move-north-east', 56, 57)
  createAnimation('imp', 'imp-shoot-north-east', [ 58, 59, 60 ], 8, 0)
  createConsecutiveAnimation('imp', 'imp-hit-north-east', 61, 61)
  createConsecutiveAnimation('imp', 'imp-die', 65, 68, 0)
  createAnimation('fireball', 'fireball-impact', [ 2, 3, 4 ], 8, 0)


  function createConsecutiveAnimation(spriteSheetId, id, fromIndex, toIndex, repeat) {
    let frames = goLoader.anims.generateFrameNumbers(spriteSheetId, { start: fromIndex, end: toIndex })
    goLoader.anims.create({
      key: id,
      frames: frames,
      frameRate: 10,
      repeat: repeat
    });
  }

  function createAnimation(spriteSheetId, id, frames, framerate, repeat) {
    framerate = framerate || 10
    if (repeat === undefined) { repeat = -1 }
    goLoader.anims.create({
      key: id,
      frames: goLoader.anims.generateFrameNumbers(spriteSheetId, { frames: frames }),
      frameRate: framerate,
      repeat: repeat
    });
  }

}
