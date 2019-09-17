<template>
  <div>
    <scheduler
      v-model="selected"
      :multiple="multiple"
      :footer="footer"
      :disabled="disabled"
      :accuracy="accuracy"
    />
    <div style="margin: 10px;">
      <div>
        <label for="">Accuracy: </label>
        <input v-model="acc" type="number">
      </div>
      <div>
        <label>Disabled: <input v-model="disabled" type="checkbox"></label>
      </div>
      <div>
        <label>Multiple: <input v-model="multiple" type="checkbox"></label>
      </div>
      <div>
        <label>Footer: <input v-model="footer" type="checkbox"></label>
      </div>
    </div>
    <div style="padding: 10px; background-color: #ececec;">
      <pre>{{ value }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      disabled: false,
      footer: true,
      accuracy: 1,
      multiple: false,
      selected: {
        1: [1, 2, 3, 4]
      }
    }
  },
  computed: {
    acc: {
      get () {
        return this.accuracy
      },
      set (val) {
        this.accuracy = parseInt(val, 10)
      }
    },
    value () {
      return JSON.stringify(this.selected, '', 2)
    }
  }
}
</script>

<style>

</style>
