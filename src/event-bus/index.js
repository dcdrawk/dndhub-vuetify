import Vue from 'vue'

export default class EventBus {

  static install () {
    const bus = new Vue()

    Object.defineProperty(Vue.prototype, '$bus', {
      get () {
        return bus
      }
    })
  }
}
