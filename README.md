## 目录结构
```
|-- .circleci              # 部署工具的配置文件
|-- .github                # 项目相关说明文档
|-- benchmarks             # 性能测试文件
|-- dist                   # 构建后不同的vue版本文件
|-- examples               # 项目案例
|-- flow                   # FLow 的类型声明
|   ├── compiler.js        # 编译相关  
|   ├── component.js       # 组件数据结构  
|   ├── global-api.js      # Global API 结构  
|   ├── modules.js         # 第三方库定义  
|   ├── options.js         # 选项相关  
|   ├── ssr.js             # 服务端渲染相关  
|   ├── vnode.js           # 虚拟 node 相关  
|-- packages               # 包含服务端渲染和模板编译器两种不同的NPM包，是提供给不同使用场景使用的
|-- scripts                # 与构建相关的脚本和配置文件
|-- src                    # 源代码
|   |-- compiler           # 编译相关  
|   |-- core               # 核心代码  
|   |   |-- observer       # 实现变化侦测的代码
|   |   |-- vdom           # 实现虚拟DOM的代码
|   |   |-- instance       # Vue.js实例的构造函数和原型方法
|   |   |-- global-api     # 全局API的代码
|   |   |-- components     # 通用的抽象组件
|   |-- platforms          # 不同平台的支持 
|   |-- server             # 服务端渲染 
|   |-- sfc                # .vue 文件解析 
|   |-- shared             # 整个项目的公用工具代码  
|-- test                   # 测试用例
|-- types                  # 使用TypeScript定义的类型声明，并且包含了测试文件
```
