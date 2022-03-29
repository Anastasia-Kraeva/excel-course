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

const toCell = (row) => {
  return (content, col) => {
    return (`
    <div class="cell" 
        contenteditable 
        data-col="${col}"
        data-type="cell"
        data-id="${row}:${col}"
    >
      ${content}
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

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols))

  for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(rowIndex))
        .join('')

    rows.push(createRow(rowIndex + 1, cells))
  }

  return rows.join('')
}
