import express from 'express'

export default (scServer) => {
  const router = express.Router()
  const drafts = {}

  function publishDrafts(draftId, { js, html }) {
    drafts[draftId] = { js, html }
  }

  router.get('/frame', async (req, res) => {
    try {
      const { draftId } = req.query
      const { html = '', js = '' } = drafts[draftId] || {}

      scServer.exchange
        .subscribe(`DRAFT:${draftId}`)
        .watch((msg) => publishDrafts(draftId, msg))
      res.render('frame-templ', { title: 'xsl', html, js })
    } catch (err) {
      console.error('error when render frame', err.stack)
    }
  })

  router.post('/draft', async (req, res) => {
    html = req.body.html
    script = req.body.script
    res.json({})
  })

  

  return router
}
