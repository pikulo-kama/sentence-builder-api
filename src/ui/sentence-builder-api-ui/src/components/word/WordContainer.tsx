import {useDeleteWordMutation, useGetAllWordsQuery} from "../../api/word-api-slice"
import {GridColDef} from "@mui/x-data-grid"
import ApplicationTableWrapper from "../shared/table/ApplicationTableWrapper"
import WordForm from "./WordForm"
import {Word} from "../../types/word"
import {WordTypeProps} from "../word-type/types"
import {I18n, Translate, translate} from "react-i18nify";


interface WordContainerProps extends WordTypeProps {
}

const WordContainer = ({ wordTypes, isLoading }: WordContainerProps) => {

    const {data: words, isLoading: wordIsLoading} = useGetAllWordsQuery()
    const [deleteWord] = useDeleteWordMutation()

    const removeRecordsCallback = (records: Word[]) => {
        records.forEach(record => deleteWord({wordContent: record.content}))
    }

    const columns: GridColDef[] = [
        {
            field: 'content',
            editable: true,
            // @ts-ignore
            headerName: <Translate value='word.col_one_name' />,
        },
        {
            field: 'wordTypeName',
            // @ts-ignore
            headerName: <Translate value='word.col_two_name' />,
            minWidth: 140
        }
    ]

    return (
        // @ts-ignore
        <I18n render={() =>
            <section>
                {
                    <ApplicationTableWrapper
                        columns={columns}
                        rows={words?.responseData?.wordResponseList || []}
                        getRowId={(row: any) => row.content}
                        pageSize={10}
                        tableName={translate('word.table_header')}
                        addBtnLabel={translate('word.open_form_button')}
                        uniqueFieldName='content'
                        isLoading={wordIsLoading}
                        form={WordForm}
                        removeRecordsCallback={removeRecordsCallback}
                        formProps={{
                            wordTypes: wordTypes,
                            isLoading: isLoading
                        }}
                    />
                }
            </section>
        } />
    )
}

export default WordContainer