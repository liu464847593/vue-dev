## 目录结构
```
|-- script                 # 与构建相关的脚本和配置文件
|-- dist                   # 构建后的文件
|-- flow                   # FLow 的类型声明
|   ├── compiler.js        # 编译相关  
|   ├── component.js       # 组件数据结构  
|   ├── global-api.js      # Global API 结构  
|   ├── modules.js         # 第三方库定义  
|   ├── options.js         # 选项相关  
|   ├── ssr.js             # 服务端渲染相关  
|   ├── vnode.js           # 虚拟 node 相关  
|-- packages               # vue-server-rendar 和vue-template-compiler,它们作为单独的NPM包发布   
|-- test                   # 所有的测试代码   
|-- src                    # 源代码
|   ├── compiler           # 编译相关  
|   ├── core               # 核心代码  
|   ├── platforms          # 不同平台的支持 
|   ├── server             # 服务端渲染 
|   ├── sfc                # .vue 文件解析 
|   ├── shared             # 整个项目的公用工具代码   
|-- .flowconfig flow配置文件
```
