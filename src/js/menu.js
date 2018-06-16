import { Depth } from 'configuration/constants'

const menuTextStyle = {
  color: '#BB0000', align: 'left', font: '28pt Doom',
  stroke: '#000000',
  strokeThickness: 4
}

const CursorOffset = 20
const RowHeight = 40

export class Menu {

  constructor(position, scene, options) {
    this.position = position
    this.scene = scene

    this.stack = []
    this.options = options || []
    this.cursorIndex = 0

    this.cursor = this.scene.add.sprite(
      this.position.x - 30,
      this.position.y + 20,
      'menu-skull')
  }

  back() {
    let lastMenuOptions = this.stack.pop()
    if (lastMenuOptions) {
      this.options = lastMenuOptions
      this.cursorIndex = 0
    }
  }

  push(options) {
    let _this = this

    this.options.forEach(option => option.destroy())
    if (this.options.length > 0) {
      this.stack.push(this.options)
    }

    this.options = options
    this.options.forEach((option, index) => {
      let sprite = _this.scene.add.text(
        _this.position.x,
        _this.position.y + index * 40,
        option.text,
        menuTextStyle)
      option.setSprite(sprite)
      sprite.setDepth(Depth.MENU_TEXT)
    })
    this.cursorIndex = 0
  }

  up() {
    this.cursorIndex = (this.options.length + this.cursorIndex - 1) % this.options.length
    this.moveCursor()
    if (this.activeOption().hidden) { this.up() }
  }

  down() {
    this.cursorIndex = (this.cursorIndex + 1) % this.options.length
    this.moveCursor()
    if (this.activeOption().hidden) { this.down() }
  }

  moveCursor() {
    this.cursor.y = this.position.y + CursorOffset + this.cursorIndex * RowHeight
  }

  select() {
    this.activeOption().onSelect()
  }

  hide(option) {
    option.hide()
  }

  activeOption() {
    return this.options[this.cursorIndex]
  }
}

export class MenuItem {
  constructor(text, onSelect) {
    this.text = text
    this.onSelect = onSelect
    this.hidden = false

    this.sprite = null
  }

  setSprite(sprite) {
    this.sprite = sprite
  }

  destroy() {
    this.sprite.destroy()
    this.sprite = null
  }

  hide() {
    this.hidden = true
    this.sprite.setVisible(false)
  }
}
