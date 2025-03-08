import { NextConfig } from 'next/dist/server/config-shared'

const endpoint = process.env.ENDPOINT || '/graphql'
const environment = process.env.ENVIRONMENT || 'dev'
const facebookAppId = process.env.FACEBOOK_APP_ID || ''
const version = 'dev'
const googleMapsKey = process.env.GOOGLE_MAPS_KEY || ''

export default {
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
  transpilePackages: [
    '@ant-design',
    '@rc-component',
    'antd',
    'classnames',
    'rc-cascader',
    'rc-checkbox',
    'rc-collapse',
    'rc-dialog',
    'rc-drawer',
    'rc-dropdown',
    'rc-field-form',
    'rc-image',
    'rc-input',
    'rc-input-number',
    'rc-mentions',
    'rc-menu',
    'rc-motion',
    'rc-notification',
    'rc-pagination',
    'rc-picker',
    'rc-progress',
    'rc-rate',
    'rc-resize-observer',
    'rc-segmented',
    'rc-select',
    'rc-slider',
    'rc-steps',
    'rc-switch',
    'rc-table',
    'rc-tabs',
    'rc-textarea',
    'rc-tooltip',
    'rc-tree',
    'rc-tree-select',
    'rc-upload',
    'rc-util',
  ],
} as NextConfig
