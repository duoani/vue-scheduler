/**
 * Return an interger array of ascending range form 'form' to 'to'.
 * @param {Number} form
 * @param {Number} to
 * @return {Array}
 */
export function makeRange (from, to) {
  // 保证 from <= to
  if (from > to) {
    from = from + to
    to = from - to
    from = from - to
  }

  const res = []
  for (let i = from; i <= to; i++) {
    res.push(i)
  }
  return res
}

export function makeDaySerial (startDay, days, ignoreWeekend) {
  const serial = []
  for (let i = 0; i < days; i++) {
    let day = startDay + i
    if (ignoreWeekend) {
      if (day > 5) {
        day -= 5
      }
    } else {
      day %= 7
    }
    serial.push(day)
  }
  return serial
}

export function makeMatrix (startCoord, endCoord, startOfWeek = 1, ignoreWeekend) {
  const matrix = {}
  const colArr = makeRange(startCoord[1], endCoord[1])
  const fromRow = startCoord[0] < endCoord[0] ? startCoord[0] : endCoord[0]
  const steps = Math.abs(startCoord[0] - endCoord[0]) + 1
  const daySerial = makeDaySerial(fromRow + startOfWeek, steps, ignoreWeekend)
  for (let i = 0; i < daySerial.length; i++) {
    matrix[daySerial[i]] = colArr.slice(0)
  }
  return matrix
}

/**
 * Merge two arrays (origin selected & currently selected), return an new array.
 * @param {Array} origin
 * @param {Array} addition
 */
export function mergeArray (origin, addition) {
  const hash = {}
  const res = []

  origin.forEach(function (item, i) {
    hash[item] = 1
    res[i] = item
  })

  addition.forEach(function (item) {
    if (!hash[item]) {
      res.push(item)
    }
  })

  return res.sort(function (num1, num2) {
    return num1 - num2
  })
}

/**
 * 在当前数组中去除指定集合，返回新数组
 * @param {Array} origin 原数组
 * @param {Array} reject 要去除的数组
 */
export function rejectArray (origin, reject) {
  const hash = {}
  const res = []

  reject.forEach(function (item, i) {
    hash[item] = i
  })

  origin.forEach(function (item) {
    if (!hash.hasOwnProperty(item)) {
      res.push(item)
    }
  })

  return res.sort(function (num1, num2) {
    return num1 - num2
  })
}

export function sortCoord (num1, num2) {
  if (num1 > num2) {
    return [num2, num1]
  }
  return [num1, num2]
}
