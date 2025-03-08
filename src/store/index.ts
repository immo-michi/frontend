import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { authSlice } from './auth'

const store = configureStore({
  devTools: true,
  reducer: {
    [authSlice.name]: authSlice.reducer,
    //...root,
  },
})

export const makeStore = () => store

export type AppStore = typeof store
export type State = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<State> = useSelector

export const wrapper = createWrapper<AppStore>(makeStore)
