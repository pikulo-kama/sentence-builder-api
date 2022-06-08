import {configureStore} from "@reduxjs/toolkit"
import {sentenceApi} from "./api/sentence-api"
import {setupListeners} from "@reduxjs/toolkit/query"
import authReducer from './features/auth/auth-slice'


export const store = configureStore({
    reducer: {
        [sentenceApi.reducerPath]: sentenceApi.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(sentenceApi.middleware),
})

setupListeners(store.dispatch)