import {DomListener} from '@core/DomListener'

export class Selector extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name
  }

  select(el) {
    this.$selectedEl = el
    this.$selectedEl.addClasses('selected')
  }

  multySelect() {}

  unSelect(el) {
    el.removeClasses('selected')
  }
}