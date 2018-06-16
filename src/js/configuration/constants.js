export const Depth = Object.freeze({
  MENU_BACKGROUND: 0,
  MENU_TEXT: 1,

  FLOOR: 0,
  OBSTACLES: 1,
  /* Pick your body up and drop it */ ONTHEFLOOR: 2,
  SPRITE: 3,
  FOREGROUND: 4
})

export const TwoPi = Math.PI * 2
export const PiOver8 = Math.PI / 8

export const Direction = Object.freeze({
  EAST: 0,
  SOUTHEAST: Math.PI / 4,
  SOUTH: Math.PI / 2,
  SOUTHWEST: Math.PI * 3/ 4,
  WEST: Math.PI,
  NORTHWEST: -Math.PI * 3/4,
  NORTH: -Math.PI / 2,
  NORTHEAST: - Math.PI / 4
})

export function directionKey(direction) {
  switch(direction) {
    case Direction.EAST:
      return 'east'
    case Direction.SOUTHEAST:
      return 'south-east'
    case Direction.SOUTH:
      return 'south'
    case Direction.SOUTHWEST:
      return 'south-west'
    case Direction.WEST:
      return 'west'
    case Direction.NORTHWEST:
      return 'north-west'
    case Direction.NORTH:
      return 'north'
    case Direction.NORTHEAST:
      return 'north-east'
  }
}
