import socketCluster from 'socketcluster-client'

function initSocket() {
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

  return new Proxy(socket, {
    get(target, key) {
      if (ready) {
        return target[key].bind(target)
      }
      return (...argus) => {
        handers.unshift([key, argus])
      }
    },
    set(target, key, value) {
      target[key] = value  // eslint-disable-line no-param-reassign
    },
  })
}

export default {
  install(Vue) {
    Vue.prototype.$socket = initSocket()  // eslint-disable-line no-param-reassign
  },
}

