export class Emitter {
  constructor() {
    this.listeners = {}
  }

  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }

    this.listeners[event].forEach(listener => {
      listener(...args)
    })

    return true
  }

  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)

    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fn)
    }
  }
}

// пример
// const emitter = new Emitter()
// const usub = emitter.subscribe('my-event', data => {
//   console.log('Sub: ', data)
// })
//
// emitter.emit('my-event', 42)
//
// setTimeout(()=>{
//   emitter.emit('my-event', '2000')
// }, 2000)
//
// setTimeout(()=>{
//   usub()
// }, 3000)
//
// setTimeout(()=>{
//   emitter.emit('my-event', '4000')
// }, 4000)
