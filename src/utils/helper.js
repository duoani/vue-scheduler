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

  var res = []
  for (var i = from; i <= to; i++) {
    res.push(i)
  }
  return res
}

export function makeMatrix (startCoord, endCoord) {
  var matrix = {}
  var colArr = makeRange(startCoord[1], endCoord[1])
  var fromRow = startCoord[0] < endCoord[0] ? startCoord[0] : endCoord[0]
  var steps = Math.abs(startCoord[0] - endCoord[0]) + 1
  for (var i = 0; i < steps; i++) {
    matrix[fromRow + i] = colArr.slice(0)
  }
  return matrix
}

/**
 * Merge two arrays (origin selected & currently selected), return an new array.
 * @param {Array} origin
 * @param {Array} addition
 */
export function mergeArray (origin, addition) {
  var hash = {}
  var res = []

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
  var hash = {}
  var res = []

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
