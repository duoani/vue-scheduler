# Vue Scheduler

A Vue.js component for time selection within one week

## Take a glance

<a href="https://duoani.github.io/vue-scheduler/index.html" target="_blank">Online Demo</a>


## Installation

```bash
npm i -S @duoa/vue-scheduler
```

## Usage

Register the component

```js
import Vue from 'vue'
import VueScheduler from '@duoa/vue-scheduler'
// Because this components has its styles, you must also import the css file.
import '@duoa/vue-scheduler/dist/vue-scheduler.css'
import locale from '@duoa/vue-scheduler/locale/zh-cn'

Vue.use(VueScheduler, { locale })
```

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

- **accuracy** {Number}  
`accuracy` indicates how many cells (parts) that consist of an hour. The default value is `1`.

- **footer** {Boolean}  
`footer` indicates whether there is a footer row in the table. The default value is `true`.

- **multiple** {Boolean}  
Like the html `<select>`, `multiple` indicates whether user can select multiple ranges of time. The default value is `false`.

- **disabled** {Boolean}  
If `disabled` is `true`, the value can not be change by user interation.

## Events

- **change**  
Emit when the value is changed.
  

