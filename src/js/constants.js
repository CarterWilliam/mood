export const Depth = Object.freeze({
  FLOOR: 0,
  OBSTACLES: 1,
  /* Pick your body up and drop it */ ONTHEFLOOR: 2,
  SPRITE: 3,
  FOREGROUND: 4
})

export const Direction = Object.freeze({
  WEST: Math.PI,
  NORTHWEST: Math.PI * 5/4,
  NORTH: Math.PI * 3/2,
  NORTHEAST: Math.PI * 7/4,
  EAST: 0,
  SOUTHEAST: Math.PI / 4,
  SOUTH: Math.PI / 2,
  SOUTHWEST: Math.PI * 3/ 4
})
