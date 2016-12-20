import path from 'path'
import webpack from 'webpack'
import opn from 'opn'
import proxyMiddleware from 'http-proxy-middleware'
import express from 'express'
import config from '../config'
const webpackConfig = config.env === 'development'
  ? require('../../build/webpack.dev.conf')
  : require('../../build/webpack.prod.conf')

const compiler = webpack(webpackConfig)

export function init(app) {
  // serve pure static assets
  app.use('/static', express.static('./static'))

  const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  })

  const hotMiddleware = require('webpack-hot-middleware')(compiler)
  // force page reload when html-webpack-plugin template changes
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
      hotMiddleware.publish({ action: 'reload' })
      cb()
    })
  })
  // handle fallback for HTML5 history API
  app.use(require('connect-history-api-fallback')())

  // serve webpack bundle output
  app.use(devMiddleware)

  // enable hot-reload and state-preserving
  // compilation error display
  app.use(hotMiddleware)

  const uri = `http://localhost:${config.port}`
  console.log('Hot Server Listening At: ', uri)
  opn(uri)
}
