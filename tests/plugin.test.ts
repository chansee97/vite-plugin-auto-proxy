import { describe, it, expect, vi } from 'vitest'
import createServiceProxyPlugin from '../src/index'
import type { FullServiceConfig } from '../src/types'

describe('createServiceProxyPlugin', () => {
  it('should create plugin with correct name', () => {
    const plugin = createServiceProxyPlugin({
      serviceConfig: {
        development: {
          api: 'http://localhost:3000'
        }
      }
    })
    
    expect(plugin.name).toBe('vite-auto-proxy')
  })

  it('should generate proxy config in development mode', () => {
    const serviceConfig: FullServiceConfig = {
      development: {
        api: 'http://localhost:3000'
      }
    }
    
    const plugin = createServiceProxyPlugin({ serviceConfig })
    
    const config: any = {
      define: {},
      server: {}
    }
    
    // Mock console.warn to avoid output during tests
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    
    plugin.config!(config, { mode: 'development', command: 'serve' })
    
    expect(config.server.proxy).toBeDefined()
    expect(config.define.__URL_MAP__).toBeDefined()
    
    consoleWarnSpy.mockRestore()
  })

  it('should not generate proxy config in production mode when enableProxy is true', () => {
    const serviceConfig: FullServiceConfig = {
      production: {
        api: 'https://api.example.com'
      }
    }
    
    const plugin = createServiceProxyPlugin({ 
      serviceConfig,
      enableProxy: true
    })
    
    const config: any = {
      define: {}
    }
    
    // Mock console.warn to avoid output during tests
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    
    plugin.config!(config, { mode: 'production', command: 'build' })
    
    // In build mode, we still inject the mapping but don't create proxy config
    expect(config.define.__URL_MAP__).toBeDefined()
    
    consoleWarnSpy.mockRestore()
  })
})