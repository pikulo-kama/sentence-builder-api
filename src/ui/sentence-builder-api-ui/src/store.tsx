import {configureStore} from "@reduxjs/toolkit"
import {sentenceApi} from "./api/sentence-api"
import {setupListeners} from "@reduxjs/toolkit/query"
import authReducer from './features/auth/auth-slice'
import {unauthorizedMiddleware} from "./features/auth/unauthorizedMiddleware"


export const store = configureStore({
    reducer: {
        [sentenceApi.reducerPath]: sentenceApi.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(unauthorizedMiddleware)
            .concat(sentenceApi.middleware),
})

setupListeners(store.dispatch)