import locale from '../../locale/en'

let _locale = locale

export function setLocale (locale) {
  _locale = locale
}

export default function i18n (key) {
  return _locale[key] || key
}
