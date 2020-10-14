<template>
  <table
    class="scheduler"
    :class="{
      'scheduler-disabled': disabled
    }"
  >
    <thead>
      <tr>
        <th
          :rowspan="2"
          class="slash"
        >
          <div class="scheduler-time-title">
            {{ i18n('TIME_TITLE') }}
          </div>
          <div class="scheduler-week-title">
            {{ i18n('WEEK_TITLE') }}
          </div>
        </th>
        <template v-if="isFullHours">
          <th
            class="scheduler-half-toggle"
            :colspan="halfDaySpan"
            @click="handleClickAM()"
          >
            {{ i18n('AM') }}
          </th>
          <th
            class="scheduler-half-toggle"
            :colspan="halfDaySpan"
            @click="handleClickPM()"
          >
            {{ i18n('PM') }}
          </th>
        </template>
        <th
          v-else
          class="scheduler-half-toggle"
          :colspan="cellColAmout"
          @click="handleClickWeek()"
        ></th>
      </tr>
      <tr>
        <td
          v-for="(hour, hourIndex) in hourSerial"
          :key="hourIndex"
          class="scheduler-hour"
          :colspan="accuracy"
          @click="handleClickHour(hourIndex)"
        >
          {{ i18n('HOURS', '')[hour] || (hour) }}
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(day, dayIndex) in daySerial"
        :key="day"
      >
        <td
          class="scheduler-day-toggle"
          @click="handleClickDay(dayIndex)"
        >
          {{ i18n('WEEK_DAYS')[day] }}
        </td>

        <td
          v-for="hourIndex in cellColAmout"
          :key="hourIndex"
          class="scheduler-hour"
          :class="{
            'scheduler-active': isCellSelected(day, hourIndex - 1)
          }"
          @mousedown="handleMouseDown(dayIndex, hourIndex - 1)"
          @mousemove="handleMouseMove(dayIndex, hourIndex - 1)"
          @touchstart="handleMouseDown(dayIndex, hourIndex - 1)"
          @touchmove="handleMouseMove(dayIndex, hourIndex - 1)"
        />
      </tr>
    </tbody>
    <tfoot v-if="footer">
      <tr>
        <td :colspan="cellColAmout + 1">
          <span class="scheduler-tips">{{ i18n('DRAG_TIP') }}</span>
          <a
            class="scheduler-reset"
            @click="reset"
          >{{ i18n('RESET') }}</a>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import SelectMode from '@/constants/SelectMode'
import i18n from '@/utils/i18n'
import { makeMatrix, makeDaySerial, mergeArray, rejectArray, sortCoord } from '@/utils/helper'

export default {

  name: 'Scheduler',

  props: {
    value: {},
    /**
     * 将用户自定义的值解码为 VueScheduler 的标准值。
     * @param {Object} selected 已选值
     * @param {Number} accuracy 精度
     */
    decoder: Function,
    /**
     * 将 VueScheduler 的标准值编码为用户自定义的值。
     * @param {Object} selected 已选值
     * @param {Number} accuracy 精度
     */
    encoder: Function,
    hourRange: {
      type: Array,
      default: () => [0, 23],
      validator (val) {
        const [start, end] = val
        if (start < 0 || end > 23 || start > end) {
          throw new Error('Invalid prop: custom validator check failed for prop "hourRange". It must be a number array with 2 items. such as [0, 23].')
        }
        return true
      }
    },
    // the first day of a week
    startOfWeek: {
      type: Number,
      default: 1,
      validator (val) {
        return val >= 0 && val <= 6
      }
    },
    // whether Sat & Sun is invisible
    ignoreWeekend: Boolean,
    // how many cells of an hour
    accuracy: {
      type: Number,
      default: 1
    },
    // footer exist?
    footer: {
      type: Boolean,
      default: true
    },
    locale: Object,
    multiple: Boolean,
    disabled: Boolean
  },

  data () {
    return {
      selectMode: SelectMode.NONE,
      startCoord: null,
      endCoord: null,
      selected: {},
      tempSelected: null,
      moving: false
    }
  },

  computed: {
    startOfWeekFixed () {
      if (this.ignoreWeekend) {
        if (this.startOfWeek === 0 || this.startOfWeek === 6) {
          return 1
        }
      }
      return this.startOfWeek
    },
    hourSerial () {
      const serial = []
      for (let i = this.hourRange[0]; i <= this.hourRange[1]; i++) {
        serial.push(i)
      }
      return serial
    },
    daySerial () {
      const serial = makeDaySerial(this.startOfWeekFixed, this.ignoreWeekend ? 5 : 7, this.ignoreWeekend)
      return serial
    },
    hours () {
      return this.hourSerial.length
    },
    isFullHours () {
      return this.hours === 24
    },
    halfDaySpan () {
      return this.accuracy * 12
    },
    cellColAmout () {
      return this.accuracy * this.hours
    }
  },

  watch: {
    value: {
      handler (val) {
        this.decodeVal(val, this.accuracy)
      },
      immediate: true
    }
    // accuracy (val) {
    //   this.decodeVal(this.value, val)
    // }
  },

  methods: {
    decodeVal (val, accuracy) {
      if (this.decoder) {
        val = this.decoder(val, accuracy)
      } else if (this.$SCHEDULER && this.$SCHEDULER.decoder) {
        val = this.$SCHEDULER.decoder(val, accuracy)
      }
      this.selected = val
      this.tempSelected = val
    },
    i18n (key, defaults) {
      if (this.locale) {
        const value = this.locale[key]
        if (value !== void 0) {
          return value
        }
      }
      return i18n(key, defaults)
    },
    isCellSelected (day, hourIndex) {
      const { tempSelected = {}} = this
      const selectedHours = tempSelected[day]
      if (selectedHours && ~selectedHours.indexOf(hourIndex)) {
        return 'scheduler-active'
      } else {
        return ''
      }
    },
    handleClickAM () {
      if (this.disabled) {
        return
      }
      this.toggleHalfDay(1)
    },
    handleClickPM () {
      if (this.disabled) {
        return
      }
      this.toggleHalfDay(2)
    },
    /**
     * @param {Number} index 1: AM, 2: PM
     */
    toggleHalfDay (index) {
      const fromIndex = (index - 1) * 12 * this.accuracy
      const toIndex = fromIndex + 12 * this.accuracy - 1
      const startCoord = [this.ignoreWeekend ? 1 : 0, fromIndex] // [row, col] row start form 1
      const endCoord = [this.ignoreWeekend ? 5 : 6, toIndex]
      const selectMode = this.getRangeSelectMode(startCoord, endCoord)
      this.updateToggle(startCoord, endCoord, selectMode)
    },
    handleClickWeek () {
      if (this.disabled) {
        return
      }
      const startCoord = [this.ignoreWeekend ? 1 : 0, 0] // [row, col] row start form 1
      const endCoord = [this.ignoreWeekend ? 5 : 6, this.hours * this.accuracy - 1]
      const selectMode = this.getRangeSelectMode(startCoord, endCoord)
      this.updateToggle(startCoord, endCoord, selectMode)
    },
    /**
     * toggle hour
     * @param {Number} hour 0 - 23
     */
    handleClickHour (hour) {
      if (this.disabled) {
        return
      }
      const fromColIndex = hour * this.accuracy
      const toColIndex = fromColIndex + this.accuracy - 1
      const startCoord = [this.ignoreWeekend ? 1 : 0, fromColIndex] // [row, col] row start form 1
      const endCoord = [this.ignoreWeekend ? 5 : 6, toColIndex]
      const selectMode = this.getRangeSelectMode(startCoord, endCoord)
      this.updateToggle(startCoord, endCoord, selectMode)
    },
    handleClickDay (dayIndex) {
      if (this.disabled) { return }
      const startCoord = [dayIndex, 0] // [row, col] row start form 1
      const endCoord = [dayIndex, this.hours * this.accuracy - 1]
      const selectMode = this.getRangeSelectMode(startCoord, endCoord)
      this.updateToggle(startCoord, endCoord, selectMode)
    },
    handleMouseDown (row, col) {
      if (this.disabled) {
        return
      }
      this.moving = true
      this.startCoord = [row, col]
      this.endCoord = this.startCoord.slice(0)
      this.selectMode = this.getCellSelectMode(this.startCoord)
      this.updateRange(this.startCoord, this.endCoord, this.selectMode)
      // FIXED: 当 mouseup 发生在 td 以外的地方时，会导致选择导演，以所 mouseup 必须
      // 监听于 document 之上
      const upFn = (e) => {
        document.removeEventListener('mouseup', upFn)
        if (!this.moving) {
          return false
        }
        this.end()
      }

      document.addEventListener('mouseup', upFn)
    },
    handleMouseMove (row, col) {
      if (!this.moving) {
        return false
      }
      if (!this.selectMode || !this.startCoord || (this.endCoord &&
                                                  this.endCoord[0] === row &&
                                                  this.endCoord[1] === col)
      ) {
        return false
      }
      this.endCoord = [row, col]
      this.updateRange(this.startCoord, this.endCoord, this.selectMode)
    },
    /**
     * 根据当前选中的范围内时间格式的空闲情况，决定是全选还是全不选
     * 全空闲：总时间格目 === 空闲时间格数目
     * 部分空闲：总时间格目 !== 空闲时间格数目
     * 无空闲：空闲时间格数目 === 0
     * 状态切换：
     * 当前范围全空闲 > 采用合并模式，全选当前范围
     * 部分空闲 > 采用合并模式，全选当前范围
     * 无空闲 > 采用合并模式，全不选当前范围
     *
     * @param {Array} startCoord 起始坐标 [row, col]
     * @param {Array} endCoord 终结坐标 [row, col]
     * @return {SelectMode}
     */
    getRangeSelectMode (startCoord, endCoord) {
      if (!this.multiple) {
        return SelectMode.REPLACE
      }
      var rowRange = sortCoord(startCoord[0], endCoord[0])
      var colRange = sortCoord(startCoord[1], endCoord[1])
      var startRow = rowRange[0]
      var endRow = rowRange[1]
      var startCol = colRange[0]
      var endCol = colRange[1]
      var rows = endRow - startRow + 1
      var cols = endCol - startCol + 1
      var total = rows * cols

      // 计算已使用的时间格子
      // TODO 未过滤 disabled 的格子
      var used = 0
      for (var i = 0; i < rows; i++) {
        var day = this.toDay(startRow + i)
        var data = this.selected[day]
        if (!data) {
          continue
        }
        for (var j = startCol; j <= endCol; j++) {
          if (data.indexOf(j) >= 0) {
            used++
          }
        }
      }
      return total === used ? SelectMode.MINUS : SelectMode.JOIN
    },
    toDay (dayIndex) {
      return (this.startOfWeek + dayIndex) % 7
    },
    /**
     * 根据当前选中的时间格式的空闲情况，决定是全选还是全不选
     * 状态切换：
     * 当前为单选模式(multiple=false)，-> 替换模式
     * 当前选中时间段为空闲 -> 全选不
     * 当前选中时间段为无空闲 - > 全不选
     *
     * @param {Array} startCoord 起始坐标 [row, col]
     * @return {SelectMode}
     */
    getCellSelectMode (coord) {
      if (!this.multiple) {
        return SelectMode.REPLACE
      }
      // TODO 未过滤 disabled 的格子
      var day = this.selected[this.toDay(coord[0])]
      return day && ~day.indexOf(coord[1]) ? SelectMode.MINUS : SelectMode.JOIN
    },

    /**
     * 根据当前的选中坐标系更新视图，并更新选中数据
     * @param {Array} startCoord 起始坐标 [row, col]
     * @param {Array} endCoord 终结坐标 [row, col]
     * @param {SelectMode} selectMode 选择模式
     */
    updateToggle (startCoord, endCoord, selectMode) {
      this.updateRange(startCoord, endCoord, selectMode)
      this.end()
    },

    /**
   * 根据当前的选中坐标系更新视图
   * @param {Array} startCoord 起始坐标 [row, col]
   * @param {Array} endCoord 终结坐标 [row, col]
   * @param {SelectMode} selectMode 选择模式
   */
    updateRange (startCoord, endCoord, selectMode) {
      var currentSelectRange = makeMatrix(startCoord, endCoord, this.startOfWeekFixed, this.ignoreWeekend)
      this.tempSelected = this.merge(this.selected, currentSelectRange, selectMode)
    },

    /**
     * 根据选择模式合并合个集合
     * @param {Object} origin 上一次选中的数据
     * @param {Object} current 当前选中的数据
     * @param {Number} selectMode 选择模式 {0: none, 1: 选择（合并）模式, 2: 排除模式（从选区中减去）}
     */
    merge (origin, current, selectMode) {
      var res = {}
      // 替换模式下，弃用之前的选区，直接使用当前选区
      let i
      if (selectMode === SelectMode.REPLACE) {
        for (i = 0; i < 7; i++) {
          if (current[i] && current[i].length) {
            res[i] = current[i].slice(0)
          }
        }
        return res
      }
      for (i = 0; i < 7; i++) {
        if (!current[i]) {
          if (origin[i] && origin[i].length) {
            res[i] = origin[i].slice(0)
          }
          continue
        }
        if (origin[i] && origin[i].length) {
          var m = selectMode === SelectMode.JOIN
            ? mergeArray(origin[i], current[i])
            : rejectArray(origin[i], current[i])
          m.length && (res[i] = m)
        } else if (selectMode === SelectMode.JOIN) {
          res[i] = current[i].slice(0)
        }
      }
      return res
    },

    // 并更新选中数据
    end () {
      this.moving = false
      this.startCoord = null
      this.endCoord = null
      this.selectMode = SelectMode.NONE
      this.emitChange(this.tempSelected)
    },

    reset () {
      if (this.disabled) {
        return
      }
      this.emitChange({})
    },

    emitChange (val) {
      if (this.encoder) {
        val = this.encoder(val, this.accuracy)
      } else if (this.$SCHEDULER && this.$SCHEDULER.encoder) {
        val = this.$SCHEDULER.encoder(val, this.accuracy)
      }
      this.$emit('input', val)
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="scss">
 @import '../scss/index.scss';
</style>
