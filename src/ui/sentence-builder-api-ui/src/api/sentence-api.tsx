import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"


export const sentenceApi = createApi({
    reducerPath: 'sentenceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:9019/api/v2',
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