export interface NextConfigType {
  publicRuntimeConfig: {
    endpoint: string
    environment: string
    facebookAppId?: string
    googleMapsKey?: string
  }
}
