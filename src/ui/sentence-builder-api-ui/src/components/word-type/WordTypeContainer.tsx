import ApplicationTableWrapper from "../shared/table/ApplicationTableWrapper"
import WordTypeForm from "./WordTypeForm"
import {WordTypeProps} from "./types"
import {useDeleteWordTypeMutation} from "../../api/word-type-api-slice"
import {WordTypeResponse} from "../../types/word-type"
import {GridColDef} from "@mui/x-data-grid";
import {translate, Translate, I18n} from "react-i18nify";


interface WordTypeContainerProps extends WordTypeProps {}


const WordTypeContainer = ({ wordTypes, isLoading }: WordTypeContainerProps) => {

    const [deleteWordType] = useDeleteWordTypeMutation()

    const removeRecordsCallback = (records: WordTypeResponse) => {
        records.forEach(record => deleteWordType(record.wordTypeId))
    }

    const columns: GridColDef[] = [
        {
            field: 'wordTypeName',
            // @ts-ignore
            headerName: <Translate value='word_type.col_one_name' />,
            width: 150
        }
    ]

    return (
        // @ts-ignore
        <I18n render={() =>
            <section>
                <ApplicationTableWrapper
                    columns={columns}
                    rows={wordTypes}
                    pageSize={3}
                    getRowId={(row: any) => row.wordTypeId}
                    tableName={translate('word_type.table_header')}
                    addBtnLabel={translate('word_type.open_form_button')}
                    uniqueFieldName='wordTypeId'
                    isLoading={isLoading}
                    removeRecordsCallback={removeRecordsCallback}
                    form={WordTypeForm}
                />
            </section>
        } />
    )
}

export default WordTypeContainer