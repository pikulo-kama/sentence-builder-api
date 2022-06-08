import {sentenceApi} from "./sentence-api";
import {LoginForm, LoginResponse} from "../types/auth";
import {Response} from "../types/response";


export const authApiSlice = sentenceApi.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<Response<LoginResponse>, LoginForm>({
            query: body => ({
                url:  '/auth/login',
                method: 'POST',
                body
            })
        })
    })
})

export const {
    useLoginMutation
} = authApiSlice