const CODES = {
  A: 65,
  Z: 90,
}

const DEFAULT_WIDTH = 120

function getWidth(state = {}, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

const toChar = (_, i) => {
  return String.fromCharCode(CODES.A + i)
}

const toColumn = ({col, i, width}) => {
  return (`
    <div 
    class="column" 
    data-type="resizable" 
    data-col="${i}"
    style="width: ${width}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `)
}

const toCell = (state, row) => {
  return (_, col) => {
    const width = getWidth(state.colState, col)
    return (`
    <div class="cell" 
        contenteditable 
        data-col="${col}"
        data-type="cell"
        data-id="${row}:${col}"
        style="width: ${width}">
</div>
  `)
  }
}

const createRow = (i, cells) => {
  const resize = i ? '<div class="row-resize" data-resize="row"></div>' : ''

  return (`
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${i ? i : ''}
        ${resize}
      </div>
      <div class="row-data">${cells}</div>
    </div>
  `)
}

function withWidthFrom(state) {
  return function (col, index) {
    return {col, i: index, width: getWidth(state.colState, index)}
  }
}

export function createTable(state = {}, rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state))
    .map(toColumn)
    .join('')

  rows.push(createRow(null, cols))

  for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell(state, rowIndex))
      .join('')

    rows.push(createRow(rowIndex + 1, cells))
  }

  return rows.join('')
}
