import Killable from './killable'
import Sprite from './sprite'

export default class Imp extends Killable(Sprite) {

  constructor(config) {
    super(config);
  }
}
