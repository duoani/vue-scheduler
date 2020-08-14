<template>
  <div>
    <scheduler
      v-model="selected"
      :locale="locale"
      :multiple="multiple"
      :footer="footer"
      :disabled="disabled"
      :accuracy="accuracy"
      :encoder="encoder"
      :decoder="decoder"
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
var serialize = function (data, accuracy) {
  accuracy = accuracy > 0 ? accuracy : 1
  var chunkSize = 24 * accuracy
  var res = []
  var i = 0
  for (i = 0; i < chunkSize * 7; i++) {
    res[i] = 0
  }
  for (i = 0; i < 7; i++) {
    var row = data[i + 1]
    if (!row) {
      continue
    }
    for (var j = 0, rowLen = row.length; j < rowLen; j++) {
      res[i * chunkSize + row[j]] = 1
    }
  }
  return res.join('')
}
var parse = function (strSequence, accuracy) {
  accuracy = accuracy > 0 ? accuracy : 1
  var chunkSize = 24 * accuracy
  var res = {}
  for (var i = 0, row = 1, len = strSequence.length; i < len; i++) {
    var col = i % chunkSize
    if (strSequence[i] === '1') {
      !res[row] && (res[row] = [])
      res[row].push(col)
    }
    if ((i + 1) % chunkSize === 0) {
      row++
    }
  }
  return res
}

export default {
  data () {
    return {
      disabled: false,
      footer: true,
      accuracy: 1,
      multiple: false,
      decoder: parse,
      encoder: serialize,
      selected: {
        1: [1, 2, 3, 4]
      },
      locale: {
        AM: '上午1',
        PM: '下午1',
        TIME_TITLE: '时间1',
        WEEK_TITLE: '星期1',
        WEEK_DAYS: ['星期一1', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
        DRAG_TIP: '可拖动鼠标选择时间段1',
        RESET: '清空选择1'
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
