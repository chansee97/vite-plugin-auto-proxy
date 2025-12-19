import { describe, it, expect } from 'vitest'
import { generateProxyFromConfig } from '../src/generator'

describe('generateProxyFromConfig', () => {
  it('should generate proxy config for http services', () => {
    const config = {
      api: 'http://localhost:3000',
      auth: 'http://localhost:3001'
    }
    
    const { proxyConfig, proxyMapping } = generateProxyFromConfig(config, 'proxy-')
    
    expect(proxyConfig).toHaveProperty('/proxy-api')
    expect(proxyConfig).toHaveProperty('/proxy-auth')
    expect(proxyConfig['/proxy-api']).toEqual({
      target: 'http://localhost:3000',
      changeOrigin: true,
      ws: false,
      rewrite: expect.any(Function)
    })
    
    expect(proxyMapping).toEqual({
      api: {
        path: '/proxy-api',
        rawPath: 'http://localhost:3000'
      },
      auth: {
        path: '/proxy-auth',
        rawPath: 'http://localhost:3001'
      }
    })
  })

  it('should generate proxy config for websocket services', () => {
    const config = {
      ws: 'ws://localhost:3002'
    }
    
    const { proxyConfig } = generateProxyFromConfig(config, 'proxy-')
    
    expect(proxyConfig['/proxy-ws']).toEqual({
      target: 'ws://localhost:3002',
      changeOrigin: true,
      ws: true,
      rewrite: expect.any(Function)
    })
  })

  it('should handle wss protocol', () => {
    const config = {
      secureWs: 'wss://example.com'
    }
    
    const { proxyConfig } = generateProxyFromConfig(config, 'proxy-')
    
    expect(proxyConfig['/proxy-secureWs'].ws).toBe(true)
  })
})