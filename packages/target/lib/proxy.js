'use strict'

const path = require('path')
const childProcess = require('child_process')

const debug = require('../debug')(__filename)
const remOn = require('../lib/removeable-on')
const rPromise = require('./r-promise')

module.exports = {
  startProxy,
  isStarted,
  stopProxy
}

let ProxyProcess
let ProxyOffClose = () => {}
let ProxyOffError = () => {}

async function startProxy (options = {}) {
  debug('startProxy()')
  if (isStarted()) return

  options = Object.assign({ port: 9229 }, options)

  const startModule = path.join(__dirname, 'proxy', 'main.js')
  ProxyProcess = childProcess.fork(startModule, [], {
    env: {
      LOCAL_PORT: options.port,
      REMOTE_URL: options.remoteURL
    }
  })
}

function isStarted () {
  return ProxyProcess != null
}

async function stopProxy () {
  debug('stopProxy()')
  if (!isStarted()) return

  const proxyDone = rPromise()

  ProxyOffClose = remOn(ProxyProcess, 'close', (code, signal) => {
    proxyDone.resolve({ code, signal })
    cleanUp()
  })

  ProxyOffError = remOn(ProxyProcess, 'error', err => {
    proxyDone.reject(err)
    cleanUp()
  })

  ProxyProcess.kill()

  function cleanUp () {
    ProxyOffClose()
    ProxyOffClose()
  }
}
