import type { ProxyOptions } from 'vite'
import type { FullServiceConfig, ServiceConfig, ProxyMapping } from './types'

export function generateProxyFromServiceConfig(
  serviceConfig: FullServiceConfig,
  mode: string,
  proxyPrefix: string,
): { proxyConfig: Record<string, ProxyOptions>, proxyMapping: ProxyMapping } {
  try {
    // Get current environment configuration
    const envConfig = serviceConfig[mode]
    if (!envConfig) {
      console.warn(`[auto-proxy] No configuration found for environment "${mode}", using development configuration`)
      const defaultConfig = serviceConfig.development
      if (!defaultConfig) {
        console.error(`[auto-proxy] No development configuration found either`)
        return { proxyConfig: {}, proxyMapping: {} }
      }
      return generateProxyFromConfig(defaultConfig, proxyPrefix)
    }

    return generateProxyFromConfig(envConfig, proxyPrefix)
  }
  catch (error) {
    console.error(`[auto-proxy] Failed to generate proxy configuration:`, (error as Error).message)
    return { proxyConfig: {}, proxyMapping: {} }
  }
}

export function generateProxyFromConfig(
  envConfig: ServiceConfig,
  proxyPrefix: string,
): { proxyConfig: Record<string, ProxyOptions>, proxyMapping: ProxyMapping } {
  const proxyConfig: Record<string, ProxyOptions> = {}
  const proxyMapping: ProxyMapping = {}

  Object.entries(envConfig).forEach(([serviceName, serviceUrl]) => {
    if (typeof serviceUrl === 'string' && serviceUrl.trim()) {
      const proxyPath = `/${proxyPrefix}${serviceName}`

      const isWs = serviceUrl.startsWith('ws://') || serviceUrl.startsWith('wss://')
      // Generate proxy configuration
      proxyConfig[proxyPath] = {
        target: serviceUrl,
        changeOrigin: true,
        ws: isWs,
        rewrite: (path: string): string => path.replace(new RegExp(`^/${proxyPrefix}${serviceName}`), ''),
      }

      // Generate proxy mapping
      proxyMapping[serviceName] = {
        path: proxyPath,
        rawPath: serviceUrl,
      }
    }
  })

  return { proxyConfig, proxyMapping }
}