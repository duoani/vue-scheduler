// 选择模式
export default {
  JOIN: 1, // 合并模式，添加到选区
  MINUS: 2, // 减去模式，从之前的选区中减去
  REPLACE: 3, // 替换模式，弃用之前的选区，直接使用给定的选区作为最终值（该模式用于单选情况 multiple = false）
  NONE: 0
}
