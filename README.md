## 目录结构
```
|---flow  
  ├── compiler.js        # 编译相关  
  ├── component.js       # 组件数据结构  
  ├── global-api.js      # Global API 结构  
  ├── modules.js         # 第三方库定义  
  ├── options.js         # 选项相关  
  ├── ssr.js             # 服务端渲染相关  
  ├── vnode.js           # 虚拟 node 相关  
|--- src
  ├── compiler        # 编译相关  
  ├── core            # 核心代码  
  ├── platforms       # 不同平台的支持 
  ├── server          # 服务端渲染 
  ├── sfc             # .vue 文件解析 
  ├── shared          # 共享代码   
|--- .flowconfig flow配置文件
```
