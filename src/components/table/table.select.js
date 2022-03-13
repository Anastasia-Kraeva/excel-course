import {Selector} from '@core/Selector'
import {$} from '@core/dom'

export function tableSelect() {
  const selector = new Selector(this.$root)
  selector.select($(event.target))

  document.onkeydown = e => {
    console.log(e)
    if (e.key === 'Escape') {
      selector.unSelect(this.lastSelectedEl)
    }
  }

  document.onclick = e => {
    if (e.target !== this.lastSelectedEl?.$el) {
      if (this.lastSelectedEl) {
        selector.unSelect(this.lastSelectedEl)
      }
      this.lastSelectedEl = selector.$selectedEl
    }
  }
}