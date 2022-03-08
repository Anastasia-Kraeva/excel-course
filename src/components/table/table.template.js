const CODES = {
  A: 65,
  Z: 90,
}

const toChar = (_, i) => {
  return String.fromCharCode(CODES.A + i)
}

const toColumn = (col, i) => {
  return (`
    <div class="column" data-type="resizable" data-col="${i + 1}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `)
}

const toCell = (content, i) => {
  return (`
    <div class="cell" contenteditable data-col="${i + 1}">${content}</div>
  `)
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

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn)
    .join('')

  rows.push(createRow(null, cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('')

    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}
