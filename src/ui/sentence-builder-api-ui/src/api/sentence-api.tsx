import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {REACT_APP_BACKEND_URL} from "../constants"


export const sentenceApi = createApi({
    reducerPath: 'sentenceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: REACT_APP_BACKEND_URL,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            // @ts-ignore
            const token = getState().auth.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: ['Words', 'Schemas', 'Word Types'],
    endpoints: builder => ({})
})