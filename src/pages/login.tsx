import { NextPage } from 'next'
import getConfig from 'next/config'
import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { NextConfigType } from '../../next.config.type'
import { useLoginFacebookMutation } from '../graphql/mutation/login.facebook.mutation'
import { useAppDispatch } from '../store'
import { setToken } from '../store/auth'

const { publicRuntimeConfig } = getConfig() as NextConfigType

const Page: NextPage = () => {
  const [facebookLoginMutation] = useLoginFacebookMutation()
  const dispatch = useAppDispatch()

  return <div>Login!
    <FacebookLogin
      appId={publicRuntimeConfig.facebookAppId}
      callback={async (response) => {
        const result = await facebookLoginMutation({
          variables: {
            token: response.accessToken,
          },
        })

        dispatch(setToken(result.data.token))
      }}
      render={(renderProps) => <a onClick={renderProps.onClick}>Login</a>}
    />
  </div>
}

export default Page
