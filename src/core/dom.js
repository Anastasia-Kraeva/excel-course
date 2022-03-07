// утилита упрощающая взаимодействие с DOM-деревом
class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  append(node) {
    //  node - may be of instans of Dom -> has atribute $el containing native node (part of file html -> Element)
    if (node instanceof Dom) {
      node = node.$el
    }
    // its cool that he dont create if inside if (like in my idea)
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      // устаревшая версия
      this.$el.appendChild(node)
    }

    return this
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
