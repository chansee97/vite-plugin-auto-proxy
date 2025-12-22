<div align="center">
    <h1>vite-plugin-auto-proxy</h1>
</div>

<div align='center'>

  [![NPM version](https://img.shields.io/npm/v/vite-plugin-auto-proxy?color=a1b858&label=)](https://www.npmjs.com/package/vite-plugin-auto-proxy)
  [![NPM downloads](https://img.shields.io/npm/dm/vite-plugin-auto-proxy?color=50a36f&label=)](https://www.npmjs.com/package/vite-plugin-auto-proxy)
</div>

一个用于根据环境变量自动生成代理配置的 Vite 插件。

## 功能特性

- 🚀 根据不同环境自动创建代理配置
- 🔄 支持多后台地址配置（可配置多个服务地址）
- 🔧 支持 WebSocket 连接
- 📝 自动生成类型定义文件 (.d.ts)
- 🌍 将代理映射注入变量供应用使用
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
          api2: 'http://localhost:3001',
          websocket: 'ws://localhost:3002'
        },
        production: {
          api: 'https://api.example.com',
          api2: 'https://api2.example.com',
          websocket: 'wss://ws.example.com'
        }
      }
    })
  ]
})
```

### 在代码中使用

```ts
console.log(__URL_MAP__.api.path)
console.log(__URL_MAP__.api.rawPath)
```

**说明：**
- `path` - 跟随 `enableProxy` 自动变换的服务地址。当启用代理时为代理路径（如 `/proxy-api`），禁用时为原始地址
- `rawPath` - 始终为配置中的原始服务地址，不随代理设置变化

### 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `serviceConfig` | `FullServiceConfig` | 必填 | 服务配置对象 |
| `proxyPrefix` | `string` | `'proxy-'` | 代理路径前缀 |
| `enableProxy` | `boolean` | `true` | 是否启用代理配置 |
| `mountVariable` | `string` | `'__URL_MAP__'` | 挂载到全局的变量名 |
| `dts` | `string` | `undefined` | d.ts 类型文件生成路径 |

### serviceConfig 详细说明

`serviceConfig` 是插件的核心配置，用于定义不同环境下的后台服务地址。配置结构如下：

```ts
interface ServiceConfig {
  [mode: string]: {
    [serviceName: string]: string
  }
}
```

**参数说明：**

- **mode（环境模式）**：对应 Vite 的 `mode` 参数，表示当前运行环境，参考：[Vite mode 配置](https://cn.vite.dev/config/shared-options#mode)
  - `development` - 开发环境（默认）
  - `production` - 生产环境
  - 可以自定义其他环境，如 `staging`、`testing` 等

- **serviceName（服务名称）**：定义多个后台服务地址
  - `api` - API 服务地址
  - `api2` - API2 服务地址

**配置示例：**

```ts
serviceConfig: {
  development: {
    api: 'http://localhost:3000',
    api2: 'http://localhost:3001'
  },
  production: {
    api: 'https://api.example.com',
    api2: 'https://api2.example.com'
  }
}
```

## 许可证

[MIT](./LICENSE) License © 2023-Present