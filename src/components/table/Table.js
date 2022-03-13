import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {shouldResize} from '@/components/table/table.functions'
import {resizeHandler} from '@/components/table/table.resize'
import {tableSelect} from '@/components/table/table.select'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
    this.lastSelectedEl = null
  }

  toHTML() {
    return createTable()
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else {
      tableSelect.call(this)
    }
  }
}
