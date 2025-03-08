import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import 'isomorphic-fetch'
import { NextConfigType } from '../../next.config.type'
import DebounceLink from './link/debounce.link'

let client: ApolloClient<any>

const getClient = (config: NextConfigType): ApolloClient<any> => {
  if (!client) {
    const { publicRuntimeConfig } = config

    client = new ApolloClient({
      cache: new InMemoryCache(),
      link: from([
        new TokenRefreshLink({
          accessTokenField: 'token',
          isTokenValidOrUndefined: async () => {
            return true

            // TODO process authentication
          },
          fetchAccessToken: async (params) => {
            return fetch(publicRuntimeConfig.endpoint + '?auth', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                token: localStorage.getItem('refresh') || '',
                type: 'tucan',
              }),
            })
          },
          handleResponse: () => async (response) => {
            return await response.json()
          },
          handleFetch: (next: any) => {
            localStorage.setItem('refresh', next.refresh)
            localStorage.setItem('access', next.access)
          },
          handleError: (errors) => {
            console.error('failed to refresh token', errors)

            localStorage.removeItem('refresh')
            localStorage.removeItem('access')

            // TODO trigger this in a nicer way
            window.location.reload()
          },
        }),
        setContext(async (request, context) => {
          const headers: any = {}

          const access = localStorage.getItem('access')

          if (access) {
            headers.authorization = `Bearer ${access}`
          }

          if (context.recaptcha) {
            headers.recaptcha = context.recaptcha
          }

          return {
            headers,
          }
        }),
        new DebounceLink(300),
        new HttpLink({
          uri: publicRuntimeConfig.endpoint,
        }),
      ]),
    })
  }

  return client
}

export default getClient
