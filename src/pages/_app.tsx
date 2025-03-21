import { ApolloProvider } from '@apollo/client'
import AppSuspense from 'src/components/app.suspense'
import getConfig from 'next/config'
import { ConfigProvider, message, App as AntdApp } from 'antd'
import { AppInitialProps, AppType } from 'next/dist/shared/lib/utils'
import Head from 'next/head'
import React from 'react'
import { wrapper } from 'src/store'
import '../css/globals.scss'
import getApolloClient from '../graphql/client'
import { Provider as ReduxProvider } from 'react-redux'
import { NextConfigType } from '../../next.config.type'

const config = getConfig() as NextConfigType

const App: AppType = ({ Component, ...pageProps }) => {
  const { store, props } = wrapper.useWrappedStore(pageProps)

  return (
    <ReduxProvider store={store}>
      <ApolloProvider client={getApolloClient(config)}>
        <AntdApp>
        <Head>
          <title>Immo Michi</title>
          <meta
            name={'viewport'}
            content={'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'}
            key={'viewport'}
          />
          <link key={'favicon'} rel={'shortcut icon'} href={'/favicon.png'} type={'image/png'} />
        </Head>
        <AppSuspense>
          {/* Workaround for https://github.com/vercel/next.js/issues/8592 */}
          <Component {...pageProps} err={(props as any).err} />
        </AppSuspense>
        </AntdApp>
      </ApolloProvider>
    </ReduxProvider>
  )
}

export default App
