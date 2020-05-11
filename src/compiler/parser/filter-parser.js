/* @flow */

const validDivisionCharRE = /[\w).+\-_$\]]/

export function parseFilters (exp: string): string { // 解析过滤器
  let inSingle = false // 当前字符是否在 ' 单引号中的标识
  let inDouble = false // 当前字符是否在 " 双引号中的标识
  let inTemplateString = false // 当前字符是否在 ` es6 模板的标识
  let inRegex = false // 当前字符是否在 ` es6 模板的标识
  let curly = 0 // 匹配到 { +1 匹配到 } -1
  let square = 0 // 匹配到 [ +1 匹配到 ] -1
  let paren = 0 // 匹配到 ( +1 匹配到 ) -1
  let lastFilterIndex = 0
  let c, prev, i, expression, filters

  for (i = 0; i < exp.length; i++) {
    prev = c
    // 调用 charCodeAt 方法返回 Unicode 编码，课通过 String.fromCharCode() 反转
    c = exp.charCodeAt(i)
    if (inSingle) {
      // 当前 c 是 ' ，并且 prev 不是 \ ，单引号部分结束
      if (c === 0x27 && prev !== 0x5C) inSingle = false
    } else if (inDouble) {
      // 当前 c 是 " ，并且 prev 不是 \ ，双引号部分结束
      if (c === 0x22 && prev !== 0x5C) inDouble = false
    } else if (inTemplateString) {
      // 当前 c 是 ` ，并且 prev 不是 \ ，es6 模板部分结束
      if (c === 0x60 && prev !== 0x5C) inTemplateString = false
    } else if (inRegex) {
      // 当前 c 是 / ，并且 prev 不是 \ ，正则部分结束
      if (c === 0x2f && prev !== 0x5C) inRegex = false
    } else if (
      c === 0x7C && // pipe | 为管道符
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C && // 前后都不为管道符，排除 ||
      !curly && !square && !paren // {} [] () 都没有结束
    ) {
      if (expression === undefined) {
        // first filter, end of expression 第一次解析 filter，提取 | 前面部分 expression
        lastFilterIndex = i + 1
        expression = exp.slice(0, i).trim()
      } else {
        pushFilter()
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        let j = i - 1
        let p
        // find first non-whitespace prev char 找到第一个不是空字符串的 p，中断循环
        for (; j >= 0; j--) {
          p = exp.charAt(j)
          if (p !== ' ') break
        }
        if (!p || !validDivisionCharRE.test(p)) { // p 不为空，并且不是字母 数组 + - _ $ ] 之一，说明是正则
          inRegex = true
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim()
  } else if (lastFilterIndex !== 0) {
    pushFilter()
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim())
    lastFilterIndex = i + 1
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i])
    }
  }

  return expression
}

function wrapFilter (exp: string, filter: string): string { // 拼接字符串
  const i = filter.indexOf('(')
  if (i < 0) {
    // _f: resolveFilter
    return `_f("${filter}")(${exp})`
  } else {
    const name = filter.slice(0, i)
    const args = filter.slice(i + 1)
    return `_f("${name}")(${exp}${args !== ')' ? ',' + args : args}`
  }
}
