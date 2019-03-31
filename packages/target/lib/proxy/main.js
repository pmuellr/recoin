'use strict'

const createRPromise = require('../r-promise.js/index.js')
const debug = require('../debug')(__filename)

async function main () {
  debug('main()')

  while (true) {
    console.log('not doing much ...')
    await delay()
  }
}

function delay () {
  const done = createRPromise()
  setTimeout(done.resolve, 5000)
  return done
}

if (require.main === module) main()
