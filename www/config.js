import os from 'os'

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development'
const env = process.env.NODE_ENV
const numCpus = os.cpus().length || 1
const port = process.env.PORT || 9003

const configs = {
  development: {
    env: 'development',
    workCount: 1,
    scLogLevel: 3,
    port,
  },
  test: {
    env: 'test',
    workCount: 1,
    scLogLevel: 2,
    port,
  },
  production: {
    env: 'production',
    workCount: numCpus,
    scLogLevel: 1,
    port,
  },
}

export default configs[env]