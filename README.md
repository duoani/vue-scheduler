
# Vue Img Preview

A simple & easy use component for image preview.

## Take a glance

<a href="https://duoani.github.io/vue-img-preview/index.html" target="_blank">Online Demo</a>

## Installation

```bash
npm i -S @duoa/vue-img-preview
```
## Usage

Register the component

```js
import Vue from 'vue'
import VueImgPreview from '@duoa/vue-img-preview'
// Because this components has its styles, you must also import the css file.
import '@duoa/vue-img-preview/dist/vue-img-preview.css'

// Register
Vue.use(VueImgPreview)

// You can also set the default z-index
Vue.use(VueImgPreview, {
  zIndex: 9999
})
```

You may now use the `v-preview` directive in your markup.

```html
<template>
  <button v-preview="img">Preview</button>
</template>
<script>
export default {
  data () {
    return {
      img: 'http://your.img.url'
    }
  }
}
</script>
```

That's all you need to do!

If you want to specify the `z-index` property of the preview popup, use the `v-preview:z-index` directive.

If you want to display a title, use the `v-preview:title` directive.

```html
<template>
  <button
    v-preview="img"
    v-preview:z-index="zIndex"
    v-preview:title="title">Preview</button>
</template>
<script>
export default {
  data () {
    return {
      img: 'http://your.img.url'
      zIndex: 999,
      title: 'A title'
    }
  }
}
</script>
```

### API invocation

You can also use the `this.$imgPreview(options)` method instead of the `v-preview` directive.

```html
<template>
  <button @click="handleClick">Preview</button>
</template>
<script>
export default {
  methods: {
    handleClick () {
      this.$imgPreview({
        img: 'http://your.img.url',
        title: 'Put a title here if needed',
        zIndex: 99
      })
    }
  }
}
</script>
```