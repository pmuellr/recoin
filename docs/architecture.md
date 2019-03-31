REverse COnnecting INspector (recoin) architecture
================================================================================

The recoin architecture allows a developer to connect to a node.js process
that can't accept debug connectings.  It reverses things, so the node.js
process connects to a bridge, and the bridge accepts debug connections and
proxies them to the node.js process.

By "node.js" process, we really mean "something that speaks the [Chrome DevTools
Protocol][]".

[Chrome DevTools Protocol]: https://chromedevtools.github.io/devtools-protocol/


terminology
--------------------------------------------------------------------------------

A **target** is the thing being debugged.  In this case, we're specifically
targeting node.js processes as the targets.

A **target-bridge** is a process launched from the **target** when a debug
connection is required.

A **cdtp-bridge** is a process running on a network visible to the
**target-bridge** and **debug-agent**.

A **debug-agent** is a tool that speaks the Chrome DevTools Protocol (CDTP),
like:

- [VS Code](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)
- [Chrome DevTools "Devices" page](chrome://inspect/#devices)
- [ndb](https://github.com/GoogleChromeLabs/ndb)


flow
--------------------------------------------------------------------------------

- the target determines that it wants to debug, so arranges to launch
  the target-bridge to set up a debug session

- the target-bridge connects to the cdtp-bridge, to indicate a debug session
  is available

- the cdtp-bridge opens a socket, waiting for a debug-agent to connect to it

- the debug-agent connects, starts sending messages to the cdtp-bridge

- the cdtp-bridge accepts the connection, starts sending messages to the
  target-bridge

- the target-bridge sends a message back to the target indicating it should
  open it's debug socket

- the target-bridge connects to that debug socket, and starts flowing the
  messages from the debug-agent to the debug socket in the target

- one side disconnects, or the target-bridge dies, or the target dies;
  everything needs to reset, to prepare for the next debug session


messaging transports / message formats
--------------------------------------------------------------------------------

- `child_process` IPC - target / target-bridge
- WebSocket - target-bridget / cdtp-bridge and cdtp-bridge / debug-agent


prototype
--------------------------------------------------------------------------------

For the prototype, we'll do the following things:

- The cdtp-bridge will be a node.js app, running on a developers machine,
  exposing it's server port publicly via [ngrok](https://ngrok.com/).

- Make the debug trigger via HTTP header in request to server, with
  a secret indicating "debug this"

- The server will be launched with an env var set to the "debug this" secret.

- The target-proxy will be launched from a target package that the user will
  need to npm install.  The header check could be implemented as
  express-compatible middleware.

- The target-proxy will drive the target code (via child_process IPC) to
  start / stop the debugger port connection via the `inspector` package.

- When the target-proxy determines it's time to start debugging, it tells
  the target to open a debug port.

- The target-proxy then connects to that port, and starts proxying CDTP
  messages from the proxies.

