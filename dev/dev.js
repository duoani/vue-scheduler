import Vue from 'vue'
import Dev from './Dev.vue'
// import VueSchedule from '../src/index'

// Vue.use(VueSchedule)

Vue.config.productionTip = false

new Vue({
  render: h => h(Dev)
}).$mount('#app')
