import type { UserConfig } from 'vite'
import { generateProxyFromServiceConfig } from './generator'
import { generateDtsFile } from './dts'
import type { ServiceProxyPluginOptions, ProxyMapping } from './types'

export default function createServiceProxyPlugin(options: ServiceProxyPluginOptions) {
  const {
    serviceConfig,
    proxyPrefix = 'proxy-',
    enableProxy = true,
    mountVariable = '__URL_MAP__',
    dts,
  } = options

  return {
    name: 'vite-auto-proxy',
    config(config: UserConfig, { mode, command }: { mode: string, command: 'build' | 'serve' }) {
      // Only generate proxy configuration in development environment (serve command)
      const isDev = command === 'serve'

      // Inject empty proxy mapping in non-development environments to avoid runtime errors
      if (!config.define) {
        config.define = {}
      }

      if (!enableProxy || !isDev) {
        const rawMapping: ProxyMapping = {}
        const envConfig = serviceConfig[mode]

        if (envConfig) {
          Object.entries(envConfig).forEach(([serviceName, serviceUrl]) => {
            rawMapping[serviceName] = {
              path: serviceUrl,
              rawPath: serviceUrl,
            }
          })
          console.warn(`[auto-proxy] Loaded ${Object.keys(envConfig).length} service addresses`)
        }
        else {
          console.warn(`[auto-proxy] No configuration found for environment "${mode}"`)
        }

        config.define[mountVariable] = JSON.stringify(rawMapping)

        // Generate d.ts type definition file (if path is specified)
        if (dts) {
          generateDtsFile(rawMapping, dts, mountVariable)
        }
        return
      }

      const currentConfig = serviceConfig[mode] || serviceConfig.development || {}
      console.warn(`[auto-proxy] Loaded ${Object.keys(currentConfig).length} service addresses for ${mode} mode`)

      const { proxyConfig, proxyMapping } = generateProxyFromServiceConfig(serviceConfig, mode, proxyPrefix)

      Object.entries(proxyMapping).forEach(([serviceName, proxyItem]) => {
        console.warn(`[auto-proxy] Service: ${serviceName} | Proxy Path: ${proxyItem.path} | Raw Path: ${proxyItem.rawPath}`)
      })

      if (proxyConfig && Object.keys(proxyConfig).length > 0) {
        // Ensure server object exists
        if (!config.server) {
          config.server = {}
        }

        // Merge proxy configuration
        config.server.proxy = {
          ...config.server.proxy,
          ...proxyConfig,
        }
        config.define[mountVariable] = JSON.stringify(proxyMapping)
        console.warn(`[auto-proxy] Proxy mapping mounted to ${mountVariable}`)

        // Generate d.ts type definition file (if path is specified)
        if (dts) {
          generateDtsFile(proxyMapping, dts, mountVariable)
        }
      }
      else {
        console.warn(`[auto-proxy] No proxy configuration generated`)
        config.define[mountVariable] = JSON.stringify({})
        
        // Generate empty d.ts type definition file (if path is specified)
        if (dts) {
          generateDtsFile({}, dts, mountVariable)
        }
      }
    },
  }
}

export type { ServiceProxyPluginOptions } from './types'

// Named export for better compatibility
export { createServiceProxyPlugin }