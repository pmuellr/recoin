'use strict'

module.exports = removeableOn

// A function which can be used to add an event listener, and the result
// is a function to remove the event listener.

function removeableOn (emitter, name, fn) {
  emitter.on(name, fn)

  return function off () {
    emitter.off(name, fn)
  }
}

if (require.main === module) main()

function main () {
  const EventEmitter = require('events')

  const eventEmitter = new EventEmitter()

  const removeListener = removeableOn(eventEmitter, 'event', (arg) => {
    console.log(`an event occurred! arg: ${arg}`)
  })

  eventEmitter.emit('event', 420) // will be printed
  removeListener()
  eventEmitter.emit('event', 666) // won't be printed
}
