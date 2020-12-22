const withSourceMaps = require('@zeit/next-source-maps')
const withLess = require('@zeit/next-less')
const withSass = require('@zeit/next-sass')
const path = require('path')

const endpoint = process.env.ENDPOINT || '/graphql'
const environment = process.env.ENVIRONMENT || 'dev'
const facebookAppId = process.env.FACEBOOK_APP_ID || ''
const version = 'dev'
const googleMapsKey = process.env.GOOGLE_MAPS_KEY || ''

module.exports = withSass(
  withSourceMaps({
    cssModules: true,
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
    sassOptions: {
      includePaths: [path.join(__dirname, 'css')],
    },
    ...withLess({
      lessLoaderOptions: {
        javascriptEnabled: true,
      },
    }),
  })
)
