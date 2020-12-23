const endpoint = process.env.ENDPOINT || '/graphql'
const environment = process.env.ENVIRONMENT || 'dev'
const facebookAppId = process.env.FACEBOOK_APP_ID || ''
const version = 'dev'
const googleMapsKey = process.env.GOOGLE_MAPS_KEY || ''

module.exports = {
  poweredByHeader: false,
  publicRuntimeConfig: {
    endpoint,
    environment,
    facebookAppId,
    googleMapsKey,
  },
  generateBuildId: async () => {
    return version
  },
}
