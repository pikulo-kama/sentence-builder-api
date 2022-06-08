import {sentenceApi} from "./sentence-api";
import {SchemaForm, SchemaResponse} from "../types/schema";
import {Response} from "../types/response";


export const schemaTag = 'Schemas'

export const schemaApiSlice = sentenceApi.injectEndpoints({
    endpoints: builder => ({
        getAllSchemas: builder.query<SchemaResponse, void>({
            query: () => '/schemas',
            providesTags: [schemaTag]
        }),
        createSchema: builder.mutation<Response<void>, SchemaForm>({
            query: body => ({
                url: '/schemas/create',
                method: 'POST',
                body
            }),
            invalidatesTags: [schemaTag]
        }),
        deleteSchema: builder.mutation<Response<void>, number>({
            query: id => ({
                url: `/schemas/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [schemaTag]
        })
    })
})

export const {
    useGetAllSchemasQuery,
    useCreateSchemaMutation,
    useDeleteSchemaMutation
} = schemaApiSlice