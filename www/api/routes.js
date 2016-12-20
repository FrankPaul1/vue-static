import express from 'express'

const router = express.Router()

let html = '<h1 id="main">Hello {{name}}!<temp title="123"></temp></h1>'
let script = `
  Vue.component('temp', {
    // The todo-item component now accepts a
    // "prop", which is like a custom attribute.
    // This prop is called todo.
    props: ['title'],
    template: '<h3>{{ title }}</h3>'
  })

  var app = new Vue({
    el: '#main',
    data: {
      name: 'Hello Vue!'
    },
    component: ['temp'],
  })
`

router.get('/frame', async (req, res) => {
  res.render('frame-templ', { title: 'xsl', html, script })
})

router.post('/draft', async (req, res) => {
  html = req.body.html
  script = req.body.script
  res.json({})
})

export default router
