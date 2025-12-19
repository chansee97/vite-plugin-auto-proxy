/** Service configuration interface */
export interface ServiceConfig {
  [key: string]: string
}

/** Service environment type */
export type ServiceEnvType = string

/** Full service configuration type */
export interface FullServiceConfig {
  [key: ServiceEnvType]: ServiceConfig
}

/** Proxy item interface */
export interface ProxyItem {
  /** Proxy path */
  path: string
  /** Raw path */
  rawPath: string
}

/** Proxy address mapping interface */
export interface ProxyMapping {
  [serviceName: string]: ProxyItem
}

/** Plugin options interface */
export interface ServiceProxyPluginOptions {
  /** Service configuration object (required) */
  serviceConfig: FullServiceConfig
  /** Proxy path prefix (optional, defaults to 'proxy-') */
  proxyPrefix?: string
  /** Whether to enable proxy configuration */
  enableProxy?: boolean
  /** Variable name mounted to global scope (optional, defaults to '__URL_MAP__') */
  mountVariable?: string
  /** Path to generate d.ts type definition file (optional, if provided, a d.ts file will be generated at this path) */
  dts?: string
}