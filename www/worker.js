import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import apiRoutes from './api/routes'
import config from './config'


export function run(worker) {
  console.log('   >> Worker PID:', process.pid)
  
  const app = express()
  const scServer = worker.scServer
  const httpServer = worker.httpServer
  httpServer.on('request', app)

  app.use(compression())
  app.use(bodyParser.json())
  app.set('view engine', 'pug')

  if (config.env === 'development') {
    require('./hot-dev/hot-server').init(app)
  }
  
  app.use(express.static('static'))
  app.use(express.static('build'))
  app.use('/api', apiRoutes)
}

