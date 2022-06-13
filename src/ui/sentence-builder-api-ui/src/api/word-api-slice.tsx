import {sentenceApi} from "./sentence-api"
import {Response} from "../types/response"
import {WordDeleteForm, WordFormCollection, WordList} from "../types/word"


export const wordTag = 'Words'

export const wordApiSlice = sentenceApi.injectEndpoints({
    endpoints: builder => ({
        getAllWords: builder.query<Response<WordList>, void>({
            query: () => '/words',
            providesTags: [wordTag]
        }),
        createWord: builder.mutation<Response<void>, WordFormCollection>({
            query: body => ({
                url: '/words/create',
                method: 'POST',
                body
            }),
            invalidatesTags: [wordTag]
        }),
        deleteWord: builder.mutation<Response<void>, WordDeleteForm>({
            query: body => ({
                url: '/words/delete/',
                method: 'DELETE',
                body
            }),
            invalidatesTags: [wordTag]
        })
    })
})

export const {
    useGetAllWordsQuery,
    useCreateWordMutation,
    useDeleteWordMutation
} = wordApiSlice