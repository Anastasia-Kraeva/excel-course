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
      const type = $resizer.data.resize
      const sideProp = type === 'col' ? 'bottom' : 'right'
      let value = null

      $resizer.css({
        opacity: 1,
        [sideProp]: '-2000px'
      })

      document.onmousemove = e => {
        if (type === 'col') {
          const delta = e.pageX - coords.right
          value = Math.floor(coords.width + delta)
          $resizer.css({right: -delta + 'px'})
        } else {
          // coords.bottom - нижняя граница строчки а не отсчитывание координат от нижней границы экрана (указываемое число в sideProp это количество пикселей которое нужно отступить от границы родителя(нулевых значений), поэтому чтобы выйти за его пределы нужно назначить отрицательное значение)
          const delta = Math.floor(e.pageY - coords.bottom)
          value = Math.floor(coords.height + delta)
          $resizer.css({bottom: -delta + 'px'})
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null

        if (type === 'col') {
          this.$root.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(element => element.style.width = value + 'px')
        } else {
          $parent.css({height: value + 'px'})
        }

        $resizer.css({
          opacity: 0,
          bottom: 0,
          right: 0,
        })
      }
    }
  }
}
