import { createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper'
import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { auth, AuthState } from './auth'

export interface State {
  // TODO add State interfaces
  auth: AuthState
}

export type GetState = () => State

const root = (state: State, action: AnyAction): State => {
  const combined = combineReducers({
    auth,
  })

  switch (action.type) {
    case HYDRATE:
      delete action.payload.auth

      return combined({ ...state, ...action.payload } as State, action)
  }

  return combined(state, action)
}

export const makeStore: MakeStore<State> = () => {
  return createStore(root, undefined, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}

export const wrapper = createWrapper<State>(makeStore, { debug: false })
