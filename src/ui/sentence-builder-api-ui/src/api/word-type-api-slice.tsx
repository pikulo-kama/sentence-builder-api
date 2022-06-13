import {sentenceApi} from "./sentence-api"
import {NewWordTypeForm, WordType, WordTypeResponse} from "../types/word-type"
import {Response} from "../types/response"
import {wordTag} from "./word-api-slice"
import {schemaTag} from "./schema-api-slice"

export const wordTypeTag = 'Word Types'

export const wordTypeApiSlice = sentenceApi.injectEndpoints({
    endpoints: builder => ({
        getAllWordTypes: builder.query<WordTypeResponse, void>({
            query: () => '/words/types',
            providesTags: [wordTypeTag]
        }),
        createWordType: builder.mutation<WordType, NewWordTypeForm>({
            query: body => ({
                url: '/words/types/create',
                method: 'POST',
                body
            }),
            invalidatesTags: [wordTypeTag]
        }),
        deleteWordType: builder.mutation<Response<void>, number>({
            query: id => ({
                url: `/words/types/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [wordTypeTag, wordTag, schemaTag]
        })
    })
})

export const {
    useGetAllWordTypesQuery,
    useCreateWordTypeMutation,
    useDeleteWordTypeMutation
} = wordTypeApiSlice