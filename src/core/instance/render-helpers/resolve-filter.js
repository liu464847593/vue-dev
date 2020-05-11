/* @flow */

import { identity, resolveAsset } from 'core/util/index'

/**
 * Runtime helper for resolving filters
 * 从this.$options.filters中找出注册的过滤器并返回  就是_f函数
 */
export function resolveFilter (id: string): Function {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}
