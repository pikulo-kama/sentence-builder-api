import {useDeleteSchemaMutation, useGetAllSchemasQuery} from "../../api/schema-api-slice"
import {SchemaResponse} from "../../types/schema"
import {GridColDef, GridRowsProp} from "@mui/x-data-grid"
import ApplicationTableWrapper from "../shared/table/ApplicationTableWrapper"
import SchemaForm from "./SchemaForm"
import {WordTypeProps} from "../word-type/types"
import {I18n, Translate, translate} from "react-i18nify";


const formatInputSchemas = (data?: SchemaResponse): GridRowsProp => {
    return data!.map(singleSchema => ({
        id: singleSchema.sentenceSchemaId,
        content: singleSchema.words.map(word => word.wordTypeName).join(' ')
    }))
}

interface SchemaContainerProps extends WordTypeProps {
}

const SchemaContainer = ({wordTypes}: SchemaContainerProps) => {

    const {data: schemas, isLoading} = useGetAllSchemasQuery()
    const [deleteSchema] = useDeleteSchemaMutation()

    const removeRecordsCallback = (records: { id: number, content: string }[]) => {
        records.forEach(record => deleteSchema(record.id))
    }

    const columns: GridColDef[] = [
        {
            field: 'content',
            // @ts-ignore
            headerName: <Translate value='schema.col_one_name' />,
            width: 400
        }
    ]

    return (
        // @ts-ignore
        <I18n render={() => <section>
            {
                <ApplicationTableWrapper
                    columns={columns}
                    rows={schemas!}
                    rowsFormatter={formatInputSchemas}
                    tableName={translate('schema.table_header')}
                    addBtnLabel={translate('schema.open_form_button')}
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
        } />
    )
}

export default SchemaContainer