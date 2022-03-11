import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {$} from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable()
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coords = $parent.getCoords()

      document.onmousemove = e => {
        if ($resizer.data.resize === 'col') {
          const delta = e.pageX - coords.right
          const value = Math.floor(coords.width + delta)
          const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`)

          cells.forEach(element => element.style.width = value + 'px')
        } else {
          // coords.bottom - нижняя граница строчки а не отсчитывание координат от нижней границы экрана
          const delta = Math.floor(e.pageY - coords.bottom)
          const value = Math.floor(coords.height + delta)
          $parent.css({height: value + 'px'})
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }

  onMousemove(e) {
  }

  onMouseup(e) {
  }
}
