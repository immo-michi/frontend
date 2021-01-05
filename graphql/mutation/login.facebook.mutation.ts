import { gql, MutationHookOptions, useMutation } from '@apollo/client'

interface Data {
  token: {
    refresh: string
    access: string
  }
}

interface Variables {
  token: string
}

const MUTATION = gql`
  mutation login($token: String!) {
    token: loginFacebook(accessToken: $token) {
      refresh
      access
    }
  }
`

export const useLoginFacebookMutation = (options?: MutationHookOptions<Data, Variables>) =>
  useMutation<Data, Variables>(MUTATION, options)
