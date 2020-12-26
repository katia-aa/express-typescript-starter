import http from 'http'

import app from './src'

const debug = require('debug')('myapp:server')

/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT ?? '4000'
app.set('port', port)

/**
 * Create HTTP server.
 */

const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)

server.on('error', onError)
server.on('listening', onListening)

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const address = server.address()
  let bind = null

  if (address && typeof address === 'string') {
    bind = `pipe ${address}`
  }

  if (address && typeof address === 'object') {
    bind = `port ${address.port}`
  }

  debug(`Listening on ${bind}`)
}
