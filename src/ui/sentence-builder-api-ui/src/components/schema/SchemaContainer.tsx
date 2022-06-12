import {useDeleteSchemaMutation, useGetAllSchemasQuery} from "../../api/schema-api-slice"
import {SchemaResponse} from "../../types/schema"
import {GridColDef, GridRowsProp} from "@mui/x-data-grid"
import ApplicationTableWrapper from "../shared/table/ApplicationTableWrapper"
import SchemaForm from "./SchemaForm"
import {WordTypeProps} from "../word-type/types"


const formatInputSchemas = (data?: SchemaResponse): GridRowsProp => {
    return data!.map(singleSchema => ({
        id: singleSchema.sentenceSchemaId,
        content: singleSchema.words.map(word => word.wordTypeName).join(' ')
    }))
}

const columns: GridColDef[] = [
    {
        field: 'content',
        headerName: 'Схема побудови',
        width: 400
    }
]

interface SchemaContainerProps extends WordTypeProps {
}

const SchemaContainer = ({ wordTypes }: SchemaContainerProps) => {

    const {data: schemas, isLoading} = useGetAllSchemasQuery()
    const [deleteSchema] = useDeleteSchemaMutation()

    const removeRecordsCallback = (records: {id: number, content: string}[]) => {
        records.forEach(record => deleteSchema(record.id))
    }

    return (
        <section>
            {
                <ApplicationTableWrapper
                    columns={columns}
                    rows={schemas!}
                    rowsFormatter={formatInputSchemas}
                    tableName='Schemas'
                    addBtnLabel='Create Schema'
                    uniqueFieldName='id'
                    isLoading={isLoading}
                    form={SchemaForm}
                    removeRecordsCallback={removeRecordsCallback}
                    formProps={{
                        wordTypes: wordTypes
                    }}
                />
            }
        </section>
    )
}

export default SchemaContainer