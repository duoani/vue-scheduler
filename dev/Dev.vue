<template>
  <div>
    <scheduler
      v-model="selected"
      :locale="locale"
      :multiple="multiple"
      :footer="footer"
      :disabled="disabled"
      :accuracy="accuracy"
      :hour-range="[0, 23]"
      :start-of-week="startOfWeek"
      :ignore-weekend="ignoreWeekend"
    />
    <div style="margin: 10px;">
      <div>
        <label for="">Accuracy: </label>
        <input v-model="acc" type="number">
      </div>
      <div>
        <label for="">Start of week: </label>
        <input v-model="sow" :min="0" :max="6" type="number">
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
      <div>
        <label>IgnoreWeekend: <input v-model="ignoreWeekend" type="checkbox"></label>
      </div>
    </div>
    <div style="padding: 10px; background-color: #ececec;">
      <pre>{{ value }}</pre>
    </div>
  </div>
</template>

<script>
import VueSchedule from '../src/index'

// var serialize = function (data, accuracy) {
//   accuracy = accuracy > 0 ? accuracy : 1
//   var chunkSize = 24 * accuracy
//   var res = []
//   var i = 0
//   for (i = 0; i < chunkSize * 7; i++) {
//     res[i] = 0
//   }
//   for (i = 0; i < 7; i++) {
//     var row = data[i + 1]
//     if (!row) {
//       continue
//     }
//     for (var j = 0, rowLen = row.length; j < rowLen; j++) {
//       res[i * chunkSize + row[j]] = 1
//     }
//   }
//   return res.join('')
// }
// var parse = function (strSequence, accuracy) {
//   accuracy = accuracy > 0 ? accuracy : 1
//   var chunkSize = 24 * accuracy
//   var res = {}
//   for (var i = 0, row = 1, len = strSequence.length; i < len; i++) {
//     var col = i % chunkSize
//     if (strSequence[i] === '1') {
//       !res[row] && (res[row] = [])
//       res[row].push(col)
//     }
//     if ((i + 1) % chunkSize === 0) {
//       row++
//     }
//   }
//   return res
// }

export default {
  components: {
    'scheduler': VueSchedule
  },
  data () {
    return {
      disabled: false,
      footer: true,
      accuracy: 1,
      ignoreWeekend: false,
      startOfWeek: 1,
      multiple: false,
      // decoder: parse,
      // encoder: serialize,
      selected: {
        1: [1, 2, 3, 4]
      },
      locale: {
        AM: '上午',
        PM: '下午',
        TIME_TITLE: '时间',
        WEEK_TITLE: '星期',
        WEEK_DAYS: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        HOURS: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
          '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
        DRAG_TIP: '可拖动鼠标选择时间段',
        RESET: '清空选择'
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
    sow: {
      get () {
        return this.startOfWeek
      },
      set (val) {
        this.startOfWeek = parseInt(val, 10)
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
