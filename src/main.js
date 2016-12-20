import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import Rx from 'rxjs/Rx'
import VueRx from 'vue-rx'

import 'element-ui/lib/theme-default/index.css'

import initSocket from './lib/socket'
import App from './App'
import Editor from './components/Editor'

initSocket()
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueRx, Rx)
Vue.use(VueResource)

const router = new VueRouter({
  routes: [{
    path: '/',
    component: App,
    children: [
      { path: '/', component: Editor },
    ],
  }],
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
})
