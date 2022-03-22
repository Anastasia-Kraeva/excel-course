export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
  }

  select(...elements) {
    elements.forEach($el => {
      console.log($el.$el)
      /*
      * если выбираем 6 эл-ов с 0:0 по 2:1 то
      * нам нужны 0:0 1:0 2:0
      * а также   0:1 1:1 2:1
      * можно выбрать двойной цикл
      * */

      this.clear()
      this.group.push($el)
      $el.addClass(TableSelection.className)
    })
  }
  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className))
    this.group = []
  }

  selectGrup() {
  }
}