import { SocketCluster } from 'socketcluster'
import path from 'path'
import config from './config'

export const options = {
  logLevel: config.scLogLevel,
  workers: config.workCount,
  brokers: 1,
  port: config.port,
  appName: 'StaticBuilder',
  pingInterval: 10000,
  environment: config.env === 'production' ? 'prod' : 'dev',
  allowClientPublish: true,
  initController: path.join(__dirname, '/init.js'),
  workerController: path.join(__dirname, '/worker.js'),
  brokerController: path.join(__dirname, '/broker.js'),
  socketChannelLimit: 1000,
  rebootWorkerOnCrash: true,
}

new SocketCluster(options) // eslint-disable-line no-new
