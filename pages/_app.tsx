import { ApolloProvider } from '@apollo/client'
import AppSuspense from 'components/app.suspense'
import getConfig from 'next/config'
import { AppType } from 'next/dist/next-server/lib/utils'
import Head from 'next/head'
import React from 'react'
import { wrapper } from 'store'
import '../css/globals.scss'
import getApolloClient from '../graphql/client'
import { NextConfigType } from '../next.config.type'

const config = getConfig() as NextConfigType

const App: AppType = ({ Component, pageProps, ...other }) => {
  return (
    <ApolloProvider client={getApolloClient(config)}>
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
        <Component {...pageProps} err={(other as any).err} />
      </AppSuspense>
    </ApolloProvider>
  )
}

export default wrapper.withRedux(App)
