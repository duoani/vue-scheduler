import Scheduler from '@/components/Scheduler'
import { setLocale } from './utils/i18n'

const Plugin = {
  install(Vue, options = {}) {
    const { locale, encode, decode } = options
    if (typeof locale === 'object') {
      setLocale(locale)
    }

    Vue.component('Scheduler', Scheduler)

    Vue.prototype.$SCHEDULER = { encode, decode }
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  Plugin.install(window.Vue)
}

export default Plugin
