// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import App from './App'
import router from './router'
import store from './store'
import FirebaseSetup from './firebase'
import EventBus from './event-bus'

Vue.use(Vuetify)
Vue.use(VeeValidate, { errorBagName: 'veeErrors' })
Vue.use(FirebaseSetup)
Vue.use(EventBus)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
