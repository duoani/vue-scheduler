import Scheduler from '@/components/Scheduler'
import { setLocale } from './utils/i18n'

Scheduler.install = function(Vue, options = {}) {
  options = Object.assign({
    componentName: 'Scheduler' // you can customize the component tag name
  }, options)
  const { locale, encoder, decoder } = options
  if (typeof locale === 'object') {
    setLocale(locale)
  }

  Vue.component(options.componentName, Scheduler)

  Vue.prototype.$SCHEDULER = { encoder, decoder }
}

if (typeof window !== 'undefined' && window.Vue) {
  Scheduler.install(window.Vue)
}

export default Scheduler
