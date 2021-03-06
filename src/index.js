import Vue from 'vue'
import Router from 'vue-router'
import fastclick from 'fastclick'
// import Validator from 'vue-validator'
import Validator from 'utils/validator'

import App from 'app'
import { routes, alias } from 'routes'
import store from 'vx/store'
import { auth, progress } from 'vx/getters'

if (module.hot) {
  module.hot.accept()
}

fastclick.attach(document.body)

// global mixins
Vue.mixin({
  vuex: {
    getters: {
      auth,
      progress
    }
  }
})

Vue.config.debug = process.env.NODE_ENV === 'development'

Vue.use(Router)
Vue.use(Validator)

const router = new Router({
  history: false,
  saveScrollPosition: true,
  linkActiveClass: 'link-active'
})

// register routes
router.map(routes)
router.alias(alias)

router.beforeEach(transition => {
  if (transition.to.auth && !auth(store.state)) {
    transition.abort()
  } else {
    transition.next()
  }
})

router.afterEach(transition => {
  window.scrollTo(0, 0)
})

router.start(App, 'app')
