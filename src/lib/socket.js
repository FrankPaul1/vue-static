import socketCluster from 'socketcluster-client'

const socket = socketCluster.connect()
let ready = false
const handers = []

function handle() {
  while (handers.length > 0) {
    const [key, argus] = handers.pop()
    socket[key](...argus)
  }
}

socket.on('connect', () => {
  ready = true
  // console.log('Connect Ready')
  handle()
})

socket.on('disconnect', () => {
  ready = false
})

export default function initSocket() {
  global.$socket = {};

  ['emit', 'on', 'off', 'publish', 'subscribe', 'unsubscribe', 'watch', 'unwatch'].forEach((key) => {
    Object.defineProperty(global.$socket, key, {
      enumerable: true,
      configurable: true,
      get() {
        if (ready) {
          return socket[key].bind(socket)
        }
        return (...argus) => {
          handers.unshift([key, argus])
        }
      },
      set() {
        // can not set, do nothing
      },
    })
  })

  return global.$socket
}

