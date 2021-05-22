/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) { // 判断是否被注册，如果注册过则终止
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1) // 除第一个参数外，剩余所有参数将得到的列表赋值到args中
    args.unshift(this) // 把vue添加到最前面，包装install方法第一个参数是vue
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
