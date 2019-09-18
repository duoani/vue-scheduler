import Scheduler from '@/components/Scheduler'
import { setLocale } from './utils/i18n'

const Plugin = {
  install(Vue, options = {}) {
    const { locale, encoder, decoder } = options
    if (typeof locale === 'object') {
      setLocale(locale)
    }

    Vue.component('Scheduler', Scheduler)

    Vue.prototype.$SCHEDULER = { encoder, decoder }
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  Plugin.install(window.Vue)
}

export default Plugin
