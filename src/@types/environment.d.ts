export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // App
      PORT: string

      // REDIS
      REDIS_HOST: string
      REDIS_PORT: string

      // MONGODB
      MONGODB_USERNAME: string
      MONGODB_PASSWORD: string
      MONGODB_DATABASE: string
      MONGODB_HOST: string
      MONGODB_PORT: string

      // ZAPI
      ZAPI_BASE_URL: string
      ZAPI_INSTANCE: string
      ZAPI_TOKEN: string
    }
  }
}
