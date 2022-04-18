function toButton(button) {
  const meta = `
    data-type="button"
  `
  return `
    <div class="button"
         ${meta}>
      <i class="material-icons"
         ${meta}>
        ${button.icon}
      </i>
    </div>
  `
}

export function createHeader(title) {
  const buttons = [
    {
      icon: 'delete'
    },
    {
      icon: 'exit_to_app'
    }
  ]

  return `
      <input type="text" 
             class="input" 
             value="${title}"
             oninput=""
      />

      <div>
        ${buttons.map(toButton).join('')}
      </div>
    `
}
