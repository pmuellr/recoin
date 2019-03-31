recoin runtime - core profiling library for node.js
================================================================================

<img src="https://raw.githubusercontent.com/pmuellr/recoin/master/docs/images/recoin.png" width="64" align="right">

[![NPM version](https://img.shields.io/npm/v/@recoin/runtime.svg)](https://www.npmjs.com/package/@recoin/runtime)

Part of the [recoin mono-repo](https://github.com/pmuellr/recoin).


install
================================================================================

    npm install @recoin/runtime


quick start
================================================================================

```js
const { startProfiling } = require('@recoin/runtime')

...

async function someFunction () {
  const stopProfiling = await startProfiling()

  // run some code to be profiled

  const profile = await stopProfiling()

  // the profile variable now contains JSON-able profile data
}

```


usage
================================================================================

The package exports the following properties and functions:


### `version`

The value of this property is the version of this npm package installed.


### `async startProfiling([options])`

This function will start the CPU profiler.  It resolves to an async function
which is used to stop the CPU profile and return the profile result.

The "stop" async function resolved by this function takes no arguments.
It stops the profile and returns the profile data as a JSON-able object.

The optional `options` argument is an object which can contain the following
properties:

- `scripts`

  If set to a truthy value, the source code of the modules that were profiled
  will be returned with the result.
  Default: `false`

- `metaData`

  If set to a truthy value, some meta-data about the process
  will be returned with the result.
  Default: `true`

- `metrics`

  If set to a truthy value, some metrics gathered during the profile
  will be returned with the result.
  Default: `true`

- `samplingInterval`

  Set to the CPU profiler sampling interval, in microseconds
  (1000 microseconds = 1 millisecond; 1000 milliseconds = 1 second).
  Default: `10`

- `writeProfile`

  The value should be a string or function.  If a string, the profile
  will be written to the specified file.  If a function, the function
  will be invoked as an async function, and passed the profile object
  to be written.


changelog
================================================================================

See the file [CHANGELOG.md](CHANGELOG.md).


license / contributing / etc
================================================================================

See the root of the [recoin mono-repo](https://github.com/pmuellr/recoin).