# Vue Scheduler

A Vue.js component for time selection within one week

## Breaking Changes
There are <a href="./BREAKING_CHANGE_2.0.0.md" target="_blank">some breaking changes</a> that you need to be aware of to migrate your application to 2.0.0.

## Take a glance

<a href="https://duoani.github.io/vue-scheduler/index.html" target="_blank">Online Demo</a>


## Installation

```bash
npm i -S @duoa/vue-scheduler
```

## Global Registration

```js
import Vue from 'vue'
import VueScheduler from '@duoa/vue-scheduler'
// Because this components has its styles, you must also import the css file.
import '@duoa/vue-scheduler/dist/vue-scheduler.css'
import locale from '@duoa/vue-scheduler/locale/zh-cn'

Vue.use(VueScheduler, { locale })
```

## Local Registration

```js
import VueScheduler from '@duoa/vue-scheduler'
import '@duoa/vue-scheduler/dist/vue-scheduler.css'
import locale from '@duoa/vue-scheduler/locale/zh-cn'

// set locale globally
VueScheduler.setLocale(locale)

new Vue({
  el: '#app',
  components: {
    'scheduler': VueScheduler
  }
})
```

## Usage

You may now use the `<scheduler />` component.

```html
<template>
  <scheduler v-model="selected" />
</template>
<script>
export default {
  data () {
    return {
      selected: {}
    }
  }
}
</script>
```

That's all you need to do!

## Props

- **value / v-model** {Object}
binding value

- **accuracy** {Number}  
`accuracy` indicates how many cells (parts) that consist of an hour. The default value is `1`.

- **footer** {Boolean}  
`footer` indicates whether there is a footer row in the table. The default value is `true`.

- **multiple** {Boolean}  
Like the html `<select>`, `multiple` indicates whether user can select multiple ranges of time. The default value is `false`.

- **disabled** {Boolean}  
If `disabled` is `true`, the value can not be change by user interation.

- **locale** {Object}  
If `locale` is given, use this locale instead of the global one.

- **hourRange** {Array} *since v2.0.0*  
Specify a schedulable time range of a day. If you don't want to have 24 hour schedules, you can pass a number array with 2 number to this prop. For example, you just want a day from 8:00 to 22:00 to be schedulable, you can pass `[8, 22]` to it.  
The default value is `[0, 23]`.

- **startOfWeek** {Number} *since v2.0.0*  
The first day of a week. `0` is Sunday, `1` is Monday, ...   
The default value is `1`.

- **ignoreWeekend** {Boolean} *since v2.0.0*  
Whether Sat & Sun is invisible.  
The default value is `false`.

## Events

- **change**  
Emit when the value is changed.
  
## Locales

VueScheduler uses `en` as default locale, and we also provide a `zh-cn` in the package. We also provide some ways to change the locale if you want to customize it globally or locally. Here is what the locale object contains.

```js
const locale = {
  AM: 'AM',
  PM: 'PM',
  TIME_TITLE: 'TIME',
  WEEK_TITLE: 'DAY',
  WEEK_DAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  HOURS: [
    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
  ],
  DRAG_TIP: 'Drag to select hours',
  RESET: 'Reset Selected'
}
```

Change the locale globally:

```js
// set locale globally
VueScheduler.setLocale(locale)
```

Or change the locale locally:

```html
<scheduler :locale="locale" v-model="value" />
```
