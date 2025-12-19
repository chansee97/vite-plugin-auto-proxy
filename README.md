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

## API 说明

### 插件选项

#### `serviceConfig`
- 类型: `FullServiceConfig`
- 是否必需: `true`

服务配置对象，包含不同环境下的服务地址配置。

```ts
interface FullServiceConfig {
  [environment: string]: {
    [serviceName: string]: string
  }
}
```

#### `proxyPrefix`
- 类型: `string`
- 默认值: `'proxy-'`

代理路径前缀，用于生成代理路由。

#### `enableProxy`
- 类型: `boolean`
- 默认值: `true`

是否启用代理配置。在生产环境中通常设置为 `false`。

#### `mountVariable`
- 类型: `string`
- 默认值: `'__URL_MAP__'`

挂载到全局的变量名。

#### `dts`
- 类型: `string`
- 默认值: `undefined`

生成的 TypeScript 类型定义文件路径。

### 生成的全局变量

插件会在全局环境中注入一个变量（默认名为 `__URL_MAP__`），包含所有服务的代理映射信息：

```ts
const __URL_MAP__: {
  [serviceName: string]: {
    path: string      // 代理路径
    rawPath: string   // 原始服务地址
  }
}
```

## 开发

### 安装依赖

```bash
npm install
```

### 构建

```bash
npm run build
```

### 测试

```bash
npm test
```

### 实时构建

```bash
npm run dev
```

## 许可证

[MIT](./LICENSE) License © 2023-Present