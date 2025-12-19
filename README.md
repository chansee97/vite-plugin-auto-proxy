# vite-plugin-auto-proxy

[![NPM version](https://img.shields.io/npm/v/vite-plugin-auto-proxy?color=a1b858&label=)](https://www.npmjs.com/package/vite-plugin-auto-proxy)
[![NPM downloads](https://img.shields.io/npm/dm/vite-plugin-auto-proxy?color=50a36f&label=)](https://www.npmjs.com/package/vite-plugin-auto-proxy)

一个用于根据环境变量自动生成代理配置的 Vite 插件。

## 功能特性

- 🚀 根据不同环境自动创建代理配置
- 🔧 支持 WebSocket 连接
- 📝 自动生成类型定义文件 (.d.ts)
- 🌍 将代理映射注入全局变量供应用使用
- ⚙️ 灵活的配置选项
- 🧪 完整的测试覆盖

## 安装

```bash
npm install vite-plugin-auto-proxy -D
# 或
yarn add vite-plugin-auto-proxy -D
# 或
pnpm add vite-plugin-auto-proxy -D
```

## 使用方法

### 基本用法

**默认导入（推荐）：**

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import autoProxy from 'vite-plugin-auto-proxy'

export default defineConfig({
  plugins: [
    autoProxy({
      serviceConfig: {
        development: {
          api: 'http://localhost:3000',
          auth: 'http://localhost:3001',
          websocket: 'ws://localhost:3002'
        },
        production: {
          api: 'https://api.example.com',
          auth: 'https://auth.example.com',
          websocket: 'wss://ws.example.com'
        }
      }
    })
  ]
})
```

**命名导入：**

```ts
import { defineConfig } from 'vite'
import { createServiceProxyPlugin } from 'vite-plugin-auto-proxy'

export default defineConfig({
  plugins: [
    createServiceProxyPlugin({
      // ... 配置项
    })
  ]
})
```

### 在代码中使用

```ts
// 在你的应用代码中使用
console.log(__URL_MAP__.api.path)    // /proxy-api
console.log(__URL_MAP__.api.rawPath) // http://localhost:3000
```

### 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `serviceConfig` | `FullServiceConfig` | 必填 | 服务配置对象 |
| `proxyPrefix` | `string` | `'proxy-'` | 代理路径前缀 |
| `enableProxy` | `boolean` | `true` | 是否启用代理配置 |
| `mountVariable` | `string` | `'__URL_MAP__'` | 挂载到全局的变量名 |
| `dts` | `string` | `undefined` | d.ts 类型文件生成路径 |

### 完整配置示例

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import autoProxy from 'vite-plugin-auto-proxy'

export default defineConfig({
  plugins: [
    autoProxy({
      serviceConfig: {
        development: {
          api: 'http://localhost:3000',
          auth: 'http://localhost:3001',
          websocket: 'ws://localhost:3002'
        },
        staging: {
          api: 'https://staging-api.example.com',
          auth: 'https://staging-auth.example.com',
          websocket: 'wss://staging-ws.example.com'
        },
        production: {
          api: 'https://api.example.com',
          auth: 'https://auth.example.com',
          websocket: 'wss://ws.example.com'
        }
      },
      proxyPrefix: 'proxy-',  // 可选
      enableProxy: true,      // 可选
      mountVariable: '__URL_MAP__', // 可选
      dts: './src/types/auto-proxy.d.ts' // 可选，生成类型定义文件
    })
  ]
})
```

## 许可证

[MIT](./LICENSE) License © 2023-Present