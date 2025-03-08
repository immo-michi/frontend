import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'

export interface AuthState {
  authenticated?: boolean
  id?: string
  email?: string
  roles: string[]
}

export const authSlice = createSlice({
  initialState: {
    authenticated: undefined,
    email: undefined,
    roles: [],
  } as AuthState,
  name: 'auth',
  reducers: {
    init: () => {
      if (!localStorage.getItem('refresh')) {
        return {
          authenticated: false,
          roles: [],
        }
      }

      try {
        const jwt = jwtDecode<any>(localStorage.getItem('access'))

        const roles: string[] = jwt.roles || []
        const id = jwt.sub
        const email: string = jwt.email

        return {
          authenticated: true,
          roles,
          id,
          email,
        }
      } catch (e) {
        console.error('failed to decode token', e)
        return {
          authenticated: false,
          roles: [],
        }
      }
    },
    setToken: (state, action: PayloadAction<{ access: string; refresh: string }>) => {
      if (!process.browser) {
        console.error('DANGER!!! called setToken in SSR')
        return
      }

      localStorage.setItem('refresh', action.payload.refresh)
      localStorage.setItem('access', action.payload.access)

      const jwt = jwtDecode<any>(action.payload.access)

      const roles = jwt.roles || []
      const id = jwt.sub
      const email = jwt.email

      if (state.authenticated) {
        return state
      }

      return {
        authenticated: true,
        roles,
        id,
        email,
      }
    },
    setRoles: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        roles: action.payload,
      }
    },
    removeToken: (state, action: PayloadAction<string[]>) => {
      if (!process.browser) {
        console.error('DANGER!!! called removeToken in SSR')

        return
      }

      localStorage.removeItem('refresh')
      localStorage.removeItem('access')

      return {
        authSlice: false,
        roles: [],
      }
    },
  },
})

export const { setToken, init, setRoles, removeToken } = authSlice.actions
