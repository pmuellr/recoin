recoin - REverse COnnecting INspector
================================================================================

<img src="docs/images/recoin.png" width="64" align="right">

recoin provides an Chrome Dev Tools (CDT) inspector interface that connects to
a debugger, instead of the typical flow of a debugger connecting to a
CDT interface.

This makes it easier to debug in some environments, like servers.


This repository is a mono-repo, with the following embedded packages:

- [runtime](packages/runtime/README.md)

  This package is the core runtime function to provide the debugger
  connection from the code you want to debug.

- [express-middleware](packages/express-middleware/README.md)

  This package provides express-compatible middleware to allow requests
  to be debugged.

- [ui](packages/ui/README.md)

  This package provides a user interface to connect a debugger to a 
  running process.


development
================================================================================

## organization

This repository contains a number of independent packages rooted in the
`packages` directory - like a [lerna repo](https://lernajs.io/), but currently
not actually a lerna repo.  These packages are referred to below as
"embedded packages".

The root directory contains a `package.json` which largely just includes
`devDependencies` used by the embedded packages.  Generally, the embedded
packages do not contain **any** `devDependencies`.

The downside of this approach is that `devDependencies` executables are not
directly available, when running in an embedded package's root directory.

To counter this down-side, there are some command-line tools available in the
`tools` directory, intended to be run from the root directory of the repository,
to perform actions on the embedded packages.

For more info, see the [`tools/README.md`](tools/README.md) file.

## work flow

Running `npm install` on the root directory will do an `npm install` in each
embedded package, via an npm `postinstall` script.

Typical development flow when updating a single embedded package:

- `tools/watch-one.js <embedded package>` - run the watch command for an
  embedded project, which watches for changes, runs tests, etc.

- when you're done, `npm run test` to run tests for all embedded packages

On occaison, run `npm run ncu` and `tools/version-info.js` to keep an eye on
dependencies.

license
================================================================================

This package is licensed under the MIT license.  See the [LICENSE.md][] file
for more information.


contributing
================================================================================

Awesome!  We're happy that you want to contribute.

Please read the [CONTRIBUTING.md][] file for more information.


[LICENSE.md]: LICENSE.md
[CONTRIBUTING.md]: CONTRIBUTING.md
[CHANGELOG.md]: CHANGELOG.md