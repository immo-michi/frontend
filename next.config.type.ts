export interface NextConfigType {
  publicRuntimeConfig: {
    sentryDsn?: string
    sentryRelease?: string
    sentryEnvironment?: string
    endpoint: string
    environment: string
    authUri?: string
    authClientId?: string
    facebookAppId?: string
    googleClientId?: string
    googleMapsKey?: string
    stripePublishableKey?: string
  }
}
