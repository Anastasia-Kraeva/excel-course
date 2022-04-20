import {ExcelStateComponent} from '@core/ExcelStateComponent'
import {createHeader} from './header.template'
import {$} from '@core/dom';
import * as actions from '@/redux/actions';
import {defaultTitle} from '@/constants';

export class Header extends ExcelStateComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      subscribe: ['currentHeader'],
      ...options,
    })
  }

  get template() {
    return createHeader(this.store.getState().title || defaultTitle)
  }

  toHTML() {
    return this.template
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(actions.changeTitle($target.text()))
  }
}