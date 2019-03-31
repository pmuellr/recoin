'use strict'

const inspector = require('inspector')

module.exports = {
  waitForConnection,
  isConnected,
  closeConnection
}

const debug = require('./lib/debug')(__filename)

let IsConnected = false

async function waitForConnection (options) {
  debug('waitForConnection()')
  if (!isConnected()) return

  options = Object.assign({ port: 9229 }, options)
  inspector.open(options.port, 'localhost', true)
  IsConnected = true
  debug('waitForConnection(): connected')
}

function isConnected () {
  return IsConnected
}

async function closeConnection () {
  debug('closeConnection()')
  if (!isConnected()) return

  inspector.close() // blocks till no connections
  IsConnected = false
  debug('closeConnection(): closed')
}
