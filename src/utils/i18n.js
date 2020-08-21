import locale from '../../locale/en'

let _locale = locale

export function setLocale (locale) {
  _locale = locale
}

export default function i18n (key, defaults) {
  return _locale[key] || (defaults !== void 0 ? defaults : key)
}
