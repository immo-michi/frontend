import jwtDecode from 'jwt-decode'
import redux, { Dispatch, Reducer } from 'redux'
import { GetState } from '../index'

export interface AuthState {
  authenticated?: boolean
  id?: string
  email?: string
  roles: string[]
}

type ActionTypes = 'AUTH_LOGIN' | 'AUTH_LOGOUT' | 'AUTH_SET_ROLES'
type Action = redux.Action<ActionTypes> & redux.AnyAction

export const actionTypes: { [key: string]: ActionTypes } = {
  LOGIN: 'AUTH_LOGIN',
  LOGOUT: 'AUTH_LOGOUT',
  SET_ROLES: 'AUTH_SET_ROLES',
}

const initialState = (): AuthState => {
  if (process.browser) {
    if (!localStorage.getItem('refresh')) {
      return {
        authenticated: false,
        roles: [],
      }
    }

    const jwt: any = jwtDecode<any>(localStorage.getItem('access'))

    return {
      authenticated: true,
      roles: jwt.roles || [],
      id: jwt.sub,
      email: jwt.email,
    }
  }

  return {
    authenticated: false,
    roles: [],
  }
}

export type setTokenType = (token: { access: string; refresh: string }) => any
export const setToken = (token: { access: string; refresh: string }) => (
  dispatch: Dispatch<Action>,
  getState: GetState
): void => {
  if (!process.browser) {
    console.error('DANGER!!! called setToken in SSR')
    return
  }

  const { auth } = getState()

  localStorage.setItem('refresh', token.refresh)
  localStorage.setItem('access', token.access)

  const jwt: any = jwtDecode<any>(token.access)

  const roles = jwt.roles || []
  const id = jwt.sub
  const email = jwt.email

  if (!auth.authenticated) {
    dispatch({
      type: actionTypes.LOGIN,
      roles,
      id,
      email,
    })
  }
}

export type setRolesType = (roles: string[]) => any
export const setRoles = (roles: string[]) => (dispatch: Dispatch<Action>): void => {
  dispatch({
    type: actionTypes.SET_ROLES,
    roles,
  })
}

export type removeTokenType = () => any
export const removeToken = () => (dispatch: Dispatch<Action>): void => {
  if (!process.browser) {
    console.error('DANGER!!! called removeToken in SSR')

    return
  }

  localStorage.removeItem('refresh')
  localStorage.removeItem('access')

  dispatch({
    type: actionTypes.LOGOUT,
  })
}

export const auth: Reducer<AuthState, Action> = (state = initialState(), action): AuthState => {
  switch (action.type) {
    case actionTypes.SET_ROLES:
      return {
        ...state,
        roles: action.roles || [],
      }

    case actionTypes.LOGIN:
      return {
        authenticated: true,
        id: action.id,
        email: action.email,
        roles: action.roles || [],
      }

    case actionTypes.LOGOUT:
      return {
        authenticated: false,
        roles: [],
      }
  }

  return state
}
