import Scheduler from '@/components/Scheduler'
import { setLocale } from './utils/i18n'

const setL = function (locale) {
  if (typeof locale === 'object') {
    setLocale(locale)
  }
}

Scheduler.install = function(Vue, options = {}) {
  options = Object.assign({
    componentName: 'Scheduler' // you can customize the component tag name
  }, options)
  const { locale, encoder, decoder } = options
  setL(locale)

  Vue.component(options.componentName, Scheduler)

  Vue.prototype.$SCHEDULER = { encoder, decoder }
}
Scheduler.setLocale = setL

if (typeof window !== 'undefined' && window.Vue) {
  Scheduler.install(window.Vue)
}

export default Scheduler
